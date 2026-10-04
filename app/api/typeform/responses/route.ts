import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const database = client.db('welens');
    const collection = database.collection('survey_responses');

    // Obtener todas las respuestas ordenadas por fecha de envío
    const responses = await collection
      .find({})
      .sort({ submittedAt: -1 })
      .limit(50) // Limitar a las últimas 50 respuestas
      .toArray();

    return NextResponse.json(responses);
  } catch (error) {
    console.error('Error fetching responses:', error);
    return NextResponse.json(
      { error: 'Error fetching responses' },
      { status: 500 }
    );
  }
}