import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb/connection';
import User from '@/lib/models/User';
import jwt from 'jsonwebtoken';
import { validateEmail, checkRateLimit } from '@/lib/utils/validation';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { email, password } = body;

    // Rate limiting por IP para login
    const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    if (!checkRateLimit(`login:${clientIP}`, 10, 15 * 60 * 1000)) {
      return NextResponse.json(
        { error: 'Demasiados intentos de inicio de sesión. Intenta de nuevo en 15 minutos.' },
        { status: 429 }
      );
    }

    // Validar que los campos existan
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Por favor completa todos los campos' },
        { status: 400 }
      );
    }

    // Validar tipos de datos
    if (typeof email !== 'string' || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Formato de datos inválido' },
        { status: 400 }
      );
    }

    // Validar formato de email
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    const sanitizedEmail = email.toLowerCase().trim();

    // Rate limiting por email específico
    if (!checkRateLimit(`login-email:${sanitizedEmail}`, 5, 15 * 60 * 1000)) {
      return NextResponse.json(
        { error: 'Demasiados intentos para esta cuenta. Intenta de nuevo en 15 minutos.' },
        { status: 429 }
      );
    }

    // Buscar usuario
    const user = await User.findOne({ email: sanitizedEmail });
    if (!user) {
      // Tiempo de respuesta constante para prevenir enumeración de usuarios
      await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 100));
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // Verificar contraseña
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // Generar JWT con claims seguros
    const token = jwt.sign(
      { 
        userId: user._id.toString(), 
        email: user.email,
        iat: Math.floor(Date.now() / 1000),
      },
      JWT_SECRET,
      { 
        expiresIn: '7d',
        issuer: 'welens-app',
        audience: 'welens-users'
      }
    );

    const response = NextResponse.json(
      {
        message: 'Inicio de sesión exitoso',
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 200 }
    );

    // Configurar cookie HTTP-only segura
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
