/**
 * Google Sheets Client
 *
 * Handles all interactions with Google Sheets API for storing grant search data
 * and contact submissions.
 */

import { google } from 'googleapis';
import { GrantResult, SearchRequest, ContactSubmission } from '@/types/grants';

// Initialize Google Sheets client
const getGoogleSheetsClient = () => {
  if (!process.env.GOOGLE_SHEETS_CREDENTIALS) {
    throw new Error('GOOGLE_SHEETS_CREDENTIALS environment variable is not set');
  }

  if (!process.env.GOOGLE_SHEETS_ID) {
    throw new Error('GOOGLE_SHEETS_ID environment variable is not set');
  }

  try {
    const credentials = JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    return google.sheets({ version: 'v4', auth });
  } catch (error) {
    console.error('Failed to initialize Google Sheets client:', error);
    throw new Error('Invalid Google Sheets credentials');
  }
};

/**
 * Writes a new grant search to Google Sheets
 * Creates a new row with all search data and grant results
 * Contact fields are left empty for later update
 */
export async function writeGrantSearch(
  result: GrantResult,
  searchRequest: SearchRequest
): Promise<void> {
  try {
    const sheets = getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID!;

    // Prepare row data
    const rowData = [
      result.searchId,
      result.timestamp,
      searchRequest.projectDescription,
      searchRequest.revenueStatus,
      searchRequest.organizationType,

      // Grant 1
      result.grants[0]?.name || '',
      result.grants[0]?.description || '',
      result.grants[0]?.whyGoodFit || '',
      result.grants[0]?.eligibility.join('; ') || '',
      result.grants[0]?.link || '',

      // Grant 2
      result.grants[1]?.name || '',
      result.grants[1]?.description || '',
      result.grants[1]?.whyGoodFit || '',
      result.grants[1]?.eligibility.join('; ') || '',
      result.grants[1]?.link || '',

      // Grant 3
      result.grants[2]?.name || '',
      result.grants[2]?.description || '',
      result.grants[2]?.whyGoodFit || '',
      result.grants[2]?.eligibility.join('; ') || '',
      result.grants[2]?.link || '',

      // Contact fields (empty initially)
      '', // ContactName
      '', // Email
      '', // OrganizationName
      '', // Phone
      'false', // ContactSubmitted
    ];

    // Append row to sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:Y', // Adjust range as needed
      valueInputOption: 'RAW',
      requestBody: {
        values: [rowData],
      },
    });

    console.log('Grant search written to Google Sheets:', result.searchId);
  } catch (error) {
    console.error('Error writing grant search to Google Sheets:', error);
    // Don't throw - we don't want to fail the API call if sheets sync fails
    // Just log the error for monitoring
  }
}

/**
 * Updates contact information for an existing grant search
 * Finds the row by searchId and updates the contact columns
 */
export async function updateContactInfo(
  searchId: string,
  contactData: Omit<ContactSubmission, 'searchId'>
): Promise<void> {
  try {
    const sheets = getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID!;

    // First, find the row with matching searchId
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A:A', // Search in column A (SearchID)
    });

    const rows = response.data.values || [];
    let rowIndex = -1;

    // Find the row index (1-based, with header row)
    for (let i = 0; i < rows.length; i++) {
      if (rows[i][0] === searchId) {
        rowIndex = i + 1; // Convert to 1-based index
        break;
      }
    }

    if (rowIndex === -1) {
      throw new Error(`No grant search found with searchId: ${searchId}`);
    }

    // Update the contact columns (U, V, W, X, Y)
    const updateData = [
      contactData.name,
      contactData.email,
      contactData.organizationName || '',
      contactData.phone || '',
      'true', // ContactSubmitted
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `Sheet1!U${rowIndex}:Y${rowIndex}`, // Contact columns
      valueInputOption: 'RAW',
      requestBody: {
        values: [updateData],
      },
    });

    console.log('Contact info updated in Google Sheets for searchId:', searchId);
  } catch (error) {
    console.error('Error updating contact info in Google Sheets:', error);
    // Don't throw - we don't want to fail the API call if sheets sync fails
    // Just log the error for monitoring
  }
}

/**
 * Creates the header row in Google Sheets if it doesn't exist
 * Should be run once during initial setup
 */
export async function createHeaderRow(): Promise<void> {
  try {
    const sheets = getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID!;

    const headers = [
      'SearchID',
      'Timestamp',
      'ProjectDescription',
      'RevenueStatus',
      'OrganizationType',

      'Grant1_Name',
      'Grant1_Description',
      'Grant1_WhyGoodFit',
      'Grant1_Eligibility',
      'Grant1_Link',

      'Grant2_Name',
      'Grant2_Description',
      'Grant2_WhyGoodFit',
      'Grant2_Eligibility',
      'Grant2_Link',

      'Grant3_Name',
      'Grant3_Description',
      'Grant3_WhyGoodFit',
      'Grant3_Eligibility',
      'Grant3_Link',

      'ContactName',
      'Email',
      'OrganizationName',
      'Phone',
      'ContactSubmitted',
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Sheet1!A1:Y1',
      valueInputOption: 'RAW',
      requestBody: {
        values: [headers],
      },
    });

    console.log('Header row created in Google Sheets');
  } catch (error) {
    console.error('Error creating header row:', error);
    throw error;
  }
}
