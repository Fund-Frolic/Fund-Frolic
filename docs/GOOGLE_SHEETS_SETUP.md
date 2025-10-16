# Google Sheets Integration Setup Guide

This guide walks you through setting up Google Sheets integration for the Grant Finder app. This will automatically sync all grant searches and contact submissions to a Google Sheet for easy client access.

## Overview

The integration uses two sync operations:
1. **First Sync**: When a user submits the grant finder form, a new row is created in Google Sheets with:
   - Search ID, timestamp, project details
   - All 3 grant recommendations (name, description, fit explanation, eligibility, link)
   - Empty contact fields (to be filled later if user requests help)

2. **Second Sync**: When/if the user submits the "Get Expert Help" form, the same row is updated with:
   - Name, email, business name (optional), phone (optional)
   - ContactSubmitted flag set to true

## Step-by-Step Setup

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter a project name (e.g., "Grant Finder")
4. Click "Create"

### 2. Enable Google Sheets API

1. In the Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Google Sheets API"
3. Click on it and press "Enable"

### 3. Create Service Account

1. Go to "IAM & Admin" → "Service Accounts"
2. Click "Create Service Account"
3. Enter a name (e.g., "grant-finder-sheets")
4. Click "Create and Continue"
5. Skip the optional steps and click "Done"

### 4. Create Service Account Key

1. Click on the service account you just created
2. Go to the "Keys" tab
3. Click "Add Key" → "Create new key"
4. Select "JSON" format
5. Click "Create"
6. The JSON key file will download automatically - **keep this file secure!**

### 5. Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new blank spreadsheet
3. Name it something like "Grant Finder Submissions"
4. Copy the spreadsheet ID from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit`
   - The spreadsheet ID is the long string between `/d/` and `/edit`

### 6. Share Sheet with Service Account

1. In your Google Sheet, click the "Share" button (top right)
2. Open the downloaded JSON key file
3. Find the `client_email` field (looks like: `grant-finder-sheets@project-id.iam.gserviceaccount.com`)
4. Paste this email into the "Add people and groups" field
5. Set permission to "Editor"
6. **IMPORTANT**: Uncheck "Notify people" (the service account doesn't need notifications)
7. Click "Share"

### 7. Initialize Sheet Headers (One-Time Setup)

You need to create the header row in your Google Sheet. You can do this in two ways:

#### Option A: Manual (Easier)
Copy and paste this row into cell A1 of your Google Sheet:

```
SearchID | Timestamp | ProjectDescription | RevenueStatus | OrganizationType | Grant1_Name | Grant1_Description | Grant1_WhyGoodFit | Grant1_Eligibility | Grant1_Link | Grant2_Name | Grant2_Description | Grant2_WhyGoodFit | Grant2_Eligibility | Grant2_Link | Grant3_Name | Grant3_Description | Grant3_WhyGoodFit | Grant3_Eligibility | Grant3_Link | ContactName | Email | OrganizationName | Phone | ContactSubmitted
```

#### Option B: Programmatic (Using Next.js API)
1. Temporarily create a simple API route to call `createHeaderRow()`:
   ```typescript
   // app/api/setup-sheets/route.ts
   import { createHeaderRow } from '@/lib/googleSheets';
   import { NextResponse } from 'next/server';

   export async function GET() {
     try {
       await createHeaderRow();
       return NextResponse.json({ success: true });
     } catch (error) {
       return NextResponse.json({ error: String(error) }, { status: 500 });
     }
   }
   ```
2. Visit `http://localhost:3000/api/setup-sheets` in your browser
3. Delete the API route file after setup

### 8. Configure Environment Variables

1. Open the downloaded JSON key file in a text editor
2. Copy the **entire JSON content** (should be one line or compress it to one line)
3. Open `.env.local` in your project
4. Replace the placeholders:

```env
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account","project_id":"your-project-123","private_key_id":"abc123...","private_key":"-----BEGIN PRIVATE KEY-----\n...","client_email":"grant-finder-sheets@your-project-123.iam.gserviceaccount.com",...}
GOOGLE_SHEETS_ID=1a2b3c4d5e6f7g8h9i0jklmnopqrstuvwxyz
```

**Important**: The `GOOGLE_SHEETS_CREDENTIALS` must be a single-line string containing the entire JSON object.

### 9. Test the Integration

1. Restart your Next.js development server:
   ```bash
   npm run dev
   ```

2. Go to your app and submit a grant search form

3. Check your Google Sheet - you should see a new row with:
   - Search ID
   - Timestamp
   - Project details
   - All 3 grant results
   - Empty contact fields

4. Click "Get Expert Help" and submit the contact form

5. Check the same row in Google Sheet - contact fields should now be filled

## Google Sheet Structure

Your sheet will have these columns:

| Column | Description |
|--------|-------------|
| SearchID | Unique identifier for each grant search |
| Timestamp | When the search was performed |
| ProjectDescription | User's project description |
| RevenueStatus | positive or not-positive |
| OrganizationType | for-profit or non-profit |
| Grant1_Name | Name of first grant recommendation |
| Grant1_Description | Description of first grant |
| Grant1_WhyGoodFit | Why it's a good fit |
| Grant1_Eligibility | Eligibility requirements (semicolon-separated) |
| Grant1_Link | Link to grant details |
| Grant2_* | Same fields for second grant |
| Grant3_* | Same fields for third grant |
| ContactName | User's name (filled when they request help) |
| Email | User's email |
| OrganizationName | User's business name (optional) |
| Phone | User's phone (optional) |
| ContactSubmitted | true/false flag |

## Troubleshooting

### "GOOGLE_SHEETS_CREDENTIALS environment variable is not set"
- Make sure you've added the credentials to `.env.local`
- Restart your dev server after adding environment variables

### "Invalid Google Sheets credentials"
- Verify the JSON is valid (no extra quotes or escaping issues)
- Make sure it's on a single line
- Try copying the JSON again from the downloaded file

### "The caller does not have permission"
- Make sure you've shared the Google Sheet with the service account email
- The service account needs "Editor" access, not just "Viewer"
- Double-check the email address matches the `client_email` in your JSON key

### Data not syncing to Google Sheets
- Check your Next.js console for error messages
- The sync operations are "fire and forget" - they won't fail the API call if sheets sync fails
- Look for error logs mentioning "Failed to sync grant search" or "Failed to update contact info"

### "Spreadsheet not found"
- Verify the spreadsheet ID in `.env.local` is correct
- Make sure there are no extra spaces or characters
- The ID should NOT include the full URL, just the ID portion

## Security Notes

- **Never commit** the service account JSON key to version control
- The `.env.local` file is already in `.gitignore`
- Keep your service account key secure
- Only share the Google Sheet with the service account email (not publicly)
- Consider rotating service account keys periodically for production use

## Client Access

Your client can access the data by:
1. Simply opening the Google Sheet (share it with their Google account)
2. Using Google Sheets features to filter, sort, and analyze submissions
3. Creating charts or pivot tables to visualize the data
4. Exporting to Excel or CSV if needed

No need for them to access Vercel, database admin panels, or any complex interfaces!
