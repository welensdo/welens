import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb/connection';
import Order from '@/lib/models/Order';
import User from '@/lib/models/User';
import jwt from 'jsonwebtoken';

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

// Get all orders (admin)
export async function GET(request: NextRequest) {
  try {
    verifyAdminToken(request);

    await dbConnect();

    const orders = await Order.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error: any) {
    console.error('Get all orders error:', error);
    return NextResponse.json(
      { error: error.message || 'Error al obtener los pedidos' },
      { status: error.message === 'No autenticado' ? 401 : 500 }
    );
  }
}

// Update order status (admin)
export async function PATCH(request: NextRequest) {
  try {
    verifyAdminToken(request);

    await dbConnect();

    const { orderId, status, trackingNumber, note } = await request.json();

    if (!orderId || !status) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      );
    }

    const updateData: any = {
      status,
      $push: {
        statusHistory: {
          status,
          date: new Date(),
          note: note || `Estado actualizado a ${status}`,
        },
      },
    };

    if (trackingNumber) {
      updateData.trackingNumber = trackingNumber;
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      updateData,
      { new: true }
    ).populate('userId', 'name email');

    if (!order) {
      return NextResponse.json(
        { error: 'Pedido no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: 'Pedido actualizado exitosamente',
        order,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Update order error:', error);
    return NextResponse.json(
      { error: error.message || 'Error al actualizar el pedido' },
      { status: error.message === 'No autenticado' ? 401 : 500 }
    );
  }
}
