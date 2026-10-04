import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    const client = await clientPromise;
    const db = client.db('welens');
    const collection = db.collection('survey_responses');
    
    // Parse request body
    const formData = await request.json();
    
    // Get client IP address (for analytics, anonymized)
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ipAddress = forwardedFor ? forwardedFor.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
    
    // Validate required fields
    if (formData.usesGlasses === null || formData.usesGlasses === undefined) {
      return NextResponse.json(
        { error: 'Missing required field: usesGlasses' },
        { status: 400 }
      );
    }
    
    // Create survey response document
    const surveyData = {
      // Core data
      age: formData.age,
      usesGlasses: formData.usesGlasses,
      glassesType: formData.glassesType || [],
      visionConditions: formData.visionConditions || [],
      prescriptionStrength: formData.prescriptionStrength,
      stoppedUsingGlasses: formData.stoppedUsingGlasses,
      reasonsForStopping: formData.reasonsForStopping || [],
      interestInRemovableGraduation: Array.isArray(formData.interestInRemovableGraduation) 
        ? formData.interestInRemovableGraduation 
        : formData.interestInRemovableGraduation 
          ? [formData.interestInRemovableGraduation] 
          : [],
      lifestyleFactors: formData.lifestyleFactors || [],
      purchaseInfluencers: formData.purchaseInfluencers || [],
      glassesUsageFrequency: formData.glassesUsageFrequency,
      firstName: formData.firstName,
      lastName: formData.lastName,
      
      // Metadata
      submittedAt: formData.submittedAt ? new Date(formData.submittedAt) : new Date(),
      userAgent: formData.userAgent || request.headers.get('user-agent'),
      ipAddress: ipAddress.length > 10 ? ipAddress.substring(0, 10) + '...' : ipAddress, // Anonymize IP
      responseId: `survey_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
    
    // Save to database
    const result = await collection.insertOne(surveyData);
    
    console.log('Survey response saved:', surveyData.responseId);
    
    return NextResponse.json(
      { 
        success: true, 
        id: result.insertedId.toString(),
        responseId: surveyData.responseId,
        message: 'Survey response saved successfully'
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Error saving survey response:', error);
    
    // Handle validation errors
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Invalid survey data provided' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Get survey statistics (basic endpoint)
export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('welens');
    const collection = db.collection('survey_responses');
    
    const url = new URL(request.url);
    const type = url.searchParams.get('type') || 'basic';
    
    if (type === 'basic') {
      // Basic statistics
      const totalResponses = await collection.countDocuments();
      const todayResponses = await collection.countDocuments({
        submittedAt: { 
          $gte: new Date(new Date().setHours(0, 0, 0, 0)) 
        }
      });
      
      const weekResponses = await collection.countDocuments({
        submittedAt: { 
          $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) 
        }
      });
      
      return NextResponse.json({
        totalResponses,
        todayResponses,
        weekResponses,
        generatedAt: new Date(),
      });
    }
    
    if (type === 'analytics') {
      // Redirect to analytics API
      return NextResponse.json({
        message: 'Use /api/typeform/analytics for full analytics'
      });
    }
    
    return NextResponse.json(
      { error: 'Invalid type parameter' },
      { status: 400 }
    );
    
  } catch (error) {
    console.error('Error fetching survey statistics:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}