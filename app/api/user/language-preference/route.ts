// API Route for updating user language preferences
import { NextRequest, NextResponse } from 'next/server';
import { SupportedLanguage } from '@/lib/email-i18n';
import { getLanguageFromRequest } from '@/lib/middleware/language-middleware';

export async function POST(request: NextRequest) {
  try {
    const { language } = await request.json();

    // Validate language
    if (language !== 'es' && language !== 'en') {
      return NextResponse.json(
        { error: 'Invalid language. Must be "es" or "en"' },
        { status: 400 }
      );
    }

    // TODO: Update user language preference in database
    // This would require authentication and user identification
    // For now, we'll just return success
    
    const response = NextResponse.json({ 
      success: true, 
      language,
      message: 'Language preference updated' 
    });

    // Set language cookie
    response.cookies.set('welens-language', language, {
      maxAge: 365 * 24 * 60 * 60, // 1 year
      path: '/',
      sameSite: 'lax'
    });

    return response;

  } catch (error) {
    console.error('Language preference API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Detect current language from request
    const detectedLanguage = getLanguageFromRequest(request);
    
    // TODO: Get user's saved language preference from database
    // For now, return detected language
    
    return NextResponse.json({
      language: detectedLanguage,
      detectionMethod: 'browser',
      available: ['es', 'en']
    });

  } catch (error) {
    console.error('Language detection API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}