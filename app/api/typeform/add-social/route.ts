import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
  try {
    const { surveyId, socialMedia } = await request.json();

    if (!surveyId || !socialMedia) {
      return NextResponse.json(
        { error: 'Survey ID and social media info are required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('welens');

    // Update the existing survey response with social media info
    const result = await db.collection('survey_responses').updateOne(
      { _id: new ObjectId(surveyId) },
      { 
        $set: { 
          socialMedia: socialMedia,
          updatedAt: new Date()
        } 
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Survey response not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Social media info added successfully' 
    });

  } catch (error) {
    console.error('Error adding social media info:', error);
    return NextResponse.json(
      { error: 'Failed to add social media info' },
      { status: 500 }
    );
  }
}