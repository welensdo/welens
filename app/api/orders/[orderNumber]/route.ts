import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb/connection';
import Order from '@/lib/models/Order';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

// Get order by order number
export async function GET(
  request: NextRequest,
  { params }: { params: { orderNumber: string } }
) {
  try {
    const token = request.cookies.get('token')?.value;
    
    // Allow unauthenticated access for order lookup on thank-you page
    // but verify the order belongs to the user if they are logged in
    let userId = null;
    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        userId = decoded.userId;
      } catch (error) {
        // Token is invalid, but we'll still allow order lookup
      }
    }

    await dbConnect();

    const query: any = { orderNumber: params.orderNumber };
    if (userId) {
      query.userId = userId;
    }

    const order = await Order.findOne(query).lean();

    if (!order) {
      return NextResponse.json(
        { error: 'Pedido no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ order }, { status: 200 });
  } catch (error: any) {
    console.error('Get order error:', error);
    return NextResponse.json(
      { error: 'Error al obtener el pedido' },
      { status: 500 }
    );
  }
}