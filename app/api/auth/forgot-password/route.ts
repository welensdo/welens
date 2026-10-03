import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import crypto from 'crypto';
import { emailService } from '@/lib/emailService';

const client = new MongoClient(process.env.MONGODB_URI!);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    await client.connect();
    const db = client.db('welens');
    const usersCollection = db.collection('users');
    const resetTokensCollection = db.collection('passwordResets');

    // Check if user exists
    const user = await usersCollection.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      // For security, we return success even if user doesn't exist
      return NextResponse.json({
        success: true,
        message: 'Si existe una cuenta con ese email, recibirás un enlace de restablecimiento.'
      });
    }

    // Generate secure reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    
    // Set expiration for 1 hour
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Save reset token to database
    await resetTokensCollection.insertOne({
      userId: user._id,
      email: user.email,
      hashedToken,
      expiresAt,
      used: false,
      createdAt: new Date(),
    });

    // Send password reset email
    await emailService.sendPasswordResetEmail(
      user.email,
      user.name,
      resetToken
    );

    return NextResponse.json({
      success: true,
      message: 'Si existe una cuenta con ese email, recibirás un enlace de restablecimiento.'
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}