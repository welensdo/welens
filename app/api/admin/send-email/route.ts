import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { emailService } from '@/lib/emailService';
import { EMAIL_ALIASES } from '@/lib/resend';

const JWT_SECRET = process.env.JWT_SECRET!;

function verifyAdminToken(request: NextRequest) {
  const token = request.cookies.get('adminToken')?.value;

  if (!token) {
    throw new Error('No autenticado');
  }

  const decoded = jwt.verify(token, JWT_SECRET) as { role: string };

  if (decoded.role !== 'admin') {
    throw new Error('No autorizado');
  }

  return decoded;
}

export async function POST(request: NextRequest) {
  try {
    verifyAdminToken(request);

    const { from, to, subject, message, senderName } = await request.json();

    // Validar campos requeridos
    if (!from || !to || !subject || !message) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Validar que el alias existe
    if (!Object.keys(EMAIL_ALIASES).includes(from)) {
      return NextResponse.json(
        { error: 'Alias de email no válido' },
        { status: 400 }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return NextResponse.json(
        { error: 'Formato de email no válido' },
        { status: 400 }
      );
    }

    // Enviar email
    await emailService.sendCustomEmail({
      from: from as keyof typeof EMAIL_ALIASES,
      to,
      subject,
      message,
      senderName: senderName || 'WeLens Team',
    });

    return NextResponse.json(
      { message: 'Email enviado exitosamente' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Send custom email error:', error);
    return NextResponse.json(
      { error: error.message || 'Error al enviar el email' },
      { status: error.message === 'No autenticado' ? 401 : 500 }
    );
  }
}