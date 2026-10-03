import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb/connection';
import Order from '@/lib/models/Order';
import User from '@/lib/models/User';
import { emailService } from '@/lib/emailService';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

// Create new order
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Debes iniciar sesión para hacer un pedido' },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    await dbConnect();

    const { items, totalPrice, shippingAddress } = await request.json();

    // Validate input
    if (!items || !totalPrice || !shippingAddress) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      );
    }

    // Generate order number
    const date = new Date();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const orderNumber = `WL${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${random}`;

    // Create order
    const order = await Order.create({
      userId: decoded.userId,
      orderNumber,
      items,
      totalPrice,
      shippingAddress,
      statusHistory: [
        {
          status: 'pending',
          date: new Date(),
          note: 'Pedido recibido',
        },
      ],
    });

    // Get user data for email
    const user = await User.findById(decoded.userId).select('name email');
    
    // Send order confirmation email
    if (user) {
      try {
        await emailService.sendOrderConfirmationEmail({
          to: user.email,
          name: user.name,
          orderNumber,
          items,
          totalPrice,
          shippingAddress,
        });
      } catch (emailError) {
        console.error('Error enviando email de confirmación:', emailError);
        // No fallar la creación de orden si el email no se puede enviar
      }
    }

    return NextResponse.json(
      {
        message: 'Pedido creado exitosamente',
        order: {
          id: order._id,
          orderNumber: order.orderNumber,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Error al crear el pedido' },
      { status: 500 }
    );
  }
}

// Get user's orders
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    await dbConnect();

    const orders = await Order.find({ userId: decoded.userId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error: any) {
    console.error('Get orders error:', error);
    return NextResponse.json(
      { error: 'Error al obtener los pedidos' },
      { status: 500 }
    );
  }
}
