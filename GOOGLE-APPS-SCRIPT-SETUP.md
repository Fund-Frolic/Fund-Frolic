# Google Apps Script Email Setup

This guide will help you set up automated emails for Fund Frolic using Google Apps Script.

## What This Does

The script automatically sends emails when users submit their contact information:

- **Type 1: Standalone Contact** (user just submitted contact info)
  - Sends "Thanks for contacting us" email to user
  - Sends lead notification to you

- **Type 2: Grant Results** (user found grants and submitted contact)
  - Sends email to user with their 3 grant matches
  - Sends lead notification to you with all grant details

## Installation Steps

### 1. Open Your Google Sheet

Go to your Google Sheet: https://docs.google.com/spreadsheets/d/1sNEwwMCQDvMTczKubsBfEwYIkZwXZKpJTr_TNatwnqM

### 2. Open Apps Script Editor

- Click **Extensions** > **Apps Script**
- This opens the script editor in a new tab

### 3. Paste the Script

- Delete any existing code in the editor
- Open the file `/google-apps-script.js` in this project
- Copy ALL the code
- Paste it into the Apps Script editor

### 4. Configure Your Settings

At the top of the script, update the `CONFIG` section:

```javascript
const CONFIG = {
  // YOUR email address (where you want lead notifications)
  CLIENT_EMAIL: 'your-email@example.com',  // ← CHANGE THIS

  // Your business name
  BUSINESS_NAME: 'Fund Frolic',

  // Reply-to email for customer emails
  REPLY_TO_EMAIL: 'your-email@example.com',  // ← CHANGE THIS

  // ... rest stays the same
};
```

### 5. Save the Script

- Click the **disk icon** (💾) or press `Cmd+S` / `Ctrl+S`
- Give your project a name (e.g., "Fund Frolic Email Automation")

### 6. Create the Trigger

This step makes the script run automatically:

1. In the Apps Script editor, find the function dropdown (says "Select function")
2. Select **`createTrigger`**
3. Click the **Run** button (▶️)
4. You'll be asked to grant permissions:
   - Click "Review Permissions"
   - Choose your Google account
   - Click "Advanced" > "Go to [Your Project Name] (unsafe)"
   - Click "Allow"

You should see "Execution log: Trigger created successfully!"

### 7. Test It!

To test the script:

1. Go back to your Google Sheet
2. Find a row that has contact info (columns U-Y filled)
3. Manually change column Y (ContactSubmitted) to `true`
4. Wait a few seconds - you should receive an email!

## Troubleshooting

### No emails being sent?

1. Check the Apps Script execution log:
   - In Apps Script editor, click **Executions** (left sidebar)
   - Look for errors

2. Make sure:
   - You updated `CLIENT_EMAIL` in the CONFIG
   - Column Y is set to exactly `true` (not "TRUE" or "True")
   - The row has valid email in column V

### Emails going to spam?

Gmail might mark emails as spam initially. Check your spam folder and mark as "Not Spam".

### Want to customize the emails?

Edit the HTML in these functions:
- `createStandaloneUserEmail()` - Email to user (standalone contact)
- `createGrantResultsUserEmail()` - Email to user (grant matches)
- `createStandaloneClientEmail()` - Lead notification to you (standalone)
- `createGrantResultsClientEmail()` - Lead notification to you (with grants)

## How It Works

1. User submits contact form on your website
2. Next.js API updates Google Sheet (sets column Y to "true")
3. Google Apps Script detects the change (onEdit trigger)
4. Script reads the row data
5. Script checks if SearchID (column A) is empty
6. Script sends appropriate emails based on scenario
7. Done! ✅

## Support

If you run into issues, check the Apps Script logs:
- **Executions**: See recent runs and errors
- **Logger.log()**: The script logs helpful debug info

All done! Your emails are now automated. 🎉
