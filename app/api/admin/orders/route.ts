import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb/connection';
// Importar User primero para asegurar que se registre
import User from '@/lib/models/User';
import Order from '@/lib/models/Order';
import { emailService } from '@/lib/emailService';
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

    // Asegurar que los modelos estén registrados
    if (!User || !Order) {
      throw new Error('Models not properly loaded');
    }

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

    const { orderId, status, trackingNumber, note, sendEmail } = await request.json();

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

    // Send status update email if requested
    if (sendEmail && order.userId) {
      try {
        // Populate user data if needed
        const populatedOrder = await Order.findById(orderId).populate('userId', 'email name');
        if (populatedOrder && populatedOrder.userId && typeof populatedOrder.userId === 'object' && 'email' in populatedOrder.userId) {
          await emailService.sendOrderStatusEmail({
            to: (populatedOrder.userId as any).email,
            name: (populatedOrder.userId as any).name || 'Cliente',
            orderNumber: order.orderNumber,
            status,
            trackingNumber: trackingNumber || order.trackingNumber,
            note,
          });
        }
      } catch (emailError) {
        console.error('Error enviando email de actualización:', emailError);
        // No fallar la actualización si el email no se puede enviar
      }
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
