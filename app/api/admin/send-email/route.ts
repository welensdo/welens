import { NextRequest, NextResponse } from 'next/server';
import { EMAIL_ALIASES } from '@/lib/resend';
import { sendCustomAdminEmail } from '@/lib/emailService';

export async function POST(request: NextRequest) {
  try {
    const { to, from, subject, message } = await request.json();

    // Validation
    if (!to || !from || !subject || !message) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' }, 
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return NextResponse.json(
        { error: 'Formato de email inválido' }, 
        { status: 400 }
      );
    }

    // Validate from alias
    const validAliases = Object.values(EMAIL_ALIASES);
    if (!validAliases.includes(from as any)) {
      return NextResponse.json(
        { error: 'Alias de envío no válido' }, 
        { status: 400 }
      );
    }

    // Send email using the custom admin service
    const data = await sendCustomAdminEmail({
      to,
      from,
      subject,
      message,
    });

    return NextResponse.json({ 
      success: true, 
      messageId: data?.id,
      message: 'Correo enviado exitosamente' 
    });

  } catch (error) {
    console.error('Custom admin email API error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' }, 
      { status: 500 }
    );
  }
}