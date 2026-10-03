import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!);

export async function DELETE(request: NextRequest) {
  try {
    const { orderNumber, password } = await request.json();

    // Validate password
    if (password !== process.env.DELETE_ORDERS_PASSWORD) {
      return NextResponse.json(
        { error: 'Contraseña incorrecta' },
        { status: 401 }
      );
    }

    if (!orderNumber) {
      return NextResponse.json(
        { error: 'Número de orden requerido' },
        { status: 400 }
      );
    }

    await client.connect();
    const db = client.db('welens');
    const ordersCollection = db.collection('orders');

    // Check if order exists
    const existingOrder = await ordersCollection.findOne({ orderNumber });
    if (!existingOrder) {
      return NextResponse.json(
        { error: 'Orden no encontrada' },
        { status: 404 }
      );
    }

    // Delete the order
    const result = await ordersCollection.deleteOne({ orderNumber });

    if (result.deletedCount === 1) {
      return NextResponse.json({
        success: true,
        message: `Orden ${orderNumber} eliminada exitosamente`,
        deletedOrder: existingOrder
      });
    } else {
      return NextResponse.json(
        { error: 'Error eliminando la orden' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error deleting order:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}