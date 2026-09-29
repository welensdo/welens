import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb/connection';
import User from '@/lib/models/User';
import { validateEmail, sanitizeString, validatePassword, validateName, checkRateLimit } from '@/lib/utils/validation';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { email, password, name } = body;

    // Rate limiting por IP
    const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    if (!checkRateLimit(`register:${clientIP}`, 5, 15 * 60 * 1000)) {
      return NextResponse.json(
        { error: 'Demasiados intentos. Intenta de nuevo en 15 minutos.' },
        { status: 429 }
      );
    }

    // Validar que los campos existan
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Por favor completa todos los campos' },
        { status: 400 }
      );
    }

    // Validar tipos de datos
    if (typeof email !== 'string' || typeof password !== 'string' || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Formato de datos inválido' },
        { status: 400 }
      );
    }

    // Validar email
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Por favor ingresa un correo electrónico válido' },
        { status: 400 }
      );
    }

    // Validar contraseña
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { error: passwordValidation.error },
        { status: 400 }
      );
    }

    // Validar y sanitizar nombre
    const nameValidation = validateName(name);
    if (!nameValidation.valid) {
      return NextResponse.json(
        { error: nameValidation.error },
        { status: 400 }
      );
    }

    const sanitizedName = sanitizeString(name, 100);
    const sanitizedEmail = email.toLowerCase().trim();

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email: sanitizedEmail });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Este correo ya está registrado' },
        { status: 400 }
      );
    }

    // Crear nuevo usuario con datos sanitizados
    const user = await User.create({
      email: sanitizedEmail,
      password, // La contraseña se hashea automáticamente en el modelo
      name: sanitizedName,
    });

    return NextResponse.json(
      {
        message: 'Usuario creado exitosamente',
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Register error:', error);
    
    // No revelar información sensible en errores
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Este correo ya está registrado' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
