/**
 * Setup Sheets API Route
 *
 * One-time setup endpoint to create header row in Google Sheets.
 * Visit this endpoint once, then delete this file.
 */

import { createHeaderRow } from '@/lib/googleSheets';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await createHeaderRow();
    return NextResponse.json({
      success: true,
      message: 'Header row created successfully! You can now delete this API route file.'
    });
  } catch (error) {
    console.error('Error creating header row:', error);
    return NextResponse.json({
      success: false,
      error: String(error)
    }, { status: 500 });
  }
}
