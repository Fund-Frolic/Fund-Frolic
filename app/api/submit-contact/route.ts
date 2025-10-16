/**
 * Submit Contact API Route
 *
 * POST endpoint that accepts contact information from users requesting grant writing help.
 * Associates submission with searchId to track which grants they're interested in.
 */

import { NextRequest, NextResponse } from 'next/server';
import { ContactSubmission } from '@/types/grants';
import { updateContactInfo } from '@/lib/googleSheets';

export async function POST(request: NextRequest) {
  try {
    const body: ContactSubmission = await request.json();
    const { searchId, name, email, organizationName, phone } = body;

    // Validate input
    if (!searchId || !searchId.trim()) {
      return NextResponse.json(
        { error: 'Search ID is required' },
        { status: 400 }
      );
    }

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // organizationName and phone are optional - no validation needed

    // Log the submission
    console.log('Contact submission received:', {
      searchId,
      name,
      email,
      organizationName: organizationName || '',
      phone: phone || '',
      timestamp: new Date().toISOString()
    });

    // Update Google Sheets with contact info (don't await - fire and forget)
    updateContactInfo(searchId, {
      name,
      email,
      organizationName,
      phone,
    }).catch((error) => {
      console.error('Failed to update contact info in Google Sheets:', error);
    });

    // Return success
    return NextResponse.json({
      success: true,
      message: 'Contact information received successfully'
    });

  } catch (error: unknown) {
    console.error('Error in submit-contact API:', error);

    return NextResponse.json(
      { error: 'Failed to submit contact information. Please try again.' },
      { status: 500 }
    );
  }
}
