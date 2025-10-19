/**
 * Google Apps Script for Fund Frolic Grant Finder
 * SIMPLE TRIGGER VERSION - No special permissions needed!
 *
 * INSTALLATION INSTRUCTIONS:
 * 1. Open your Google Sheet
 * 2. Click Extensions > Apps Script
 * 3. Delete any existing code
 * 4. Paste this entire file
 * 5. Update the CONFIG section below with your emails
 * 6. Click Save (disk icon)
 * 7. Done! No need to run createTrigger - it works automatically!
 */

// ========================================
// CONFIGURATION - UPDATE THESE VALUES
// ========================================
const CONFIG = {
  // Your email address (where you want to receive lead notifications)
  CLIENT_EMAIL: 'your-email@example.com',

  // Your business name
  BUSINESS_NAME: 'Fund Frolic',

  // Reply-to email for customer emails
  REPLY_TO_EMAIL: 'your-email@example.com',

  // Column indices (0-based)
  COLUMNS: {
    SEARCH_ID: 0,           // A
    TIMESTAMP: 1,           // B
    PROJECT_DESC: 2,        // C
    REVENUE_STATUS: 3,      // D
    ORG_TYPE: 4,            // E

    // Grant 1 (F-J)
    GRANT1_NAME: 5,
    GRANT1_DESC: 6,
    GRANT1_FIT: 7,
    GRANT1_ELIG: 8,
    GRANT1_LINK: 9,

    // Grant 2 (K-O)
    GRANT2_NAME: 10,
    GRANT2_DESC: 11,
    GRANT2_FIT: 12,
    GRANT2_ELIG: 13,
    GRANT2_LINK: 14,

    // Grant 3 (P-T)
    GRANT3_NAME: 15,
    GRANT3_DESC: 16,
    GRANT3_FIT: 17,
    GRANT3_ELIG: 18,
    GRANT3_LINK: 19,

    // Contact Info (U-Y)
    CONTACT_NAME: 20,       // U
    CONTACT_EMAIL: 21,      // V
    ORG_NAME: 22,           // W
    PHONE: 23,              // X
    CONTACT_SUBMITTED: 24   // Y
  }
};

// ========================================
// MAIN TRIGGER FUNCTION (Simple Trigger)
// ========================================

/**
 * This function runs automatically when the sheet is edited
 * Simple trigger - no special permissions needed!
 */
function onEdit(e) {
  try {
    // Only proceed if we have edit event data
    if (!e || !e.range) {
      Logger.log('No edit event data');
      return;
    }

    const range = e.range;
    const sheet = range.getSheet();
    const col = range.getColumn();
    const row = range.getRow();

    // Only process edits to column Y (ContactSubmitted) - column 25
    if (col !== 25) {
      return;
    }

    // Check if the value is "true"
    const value = range.getValue();
    if (value !== 'true' && value !== true) {
      Logger.log('ContactSubmitted not true: ' + value);
      return;
    }

    Logger.log('Processing contact submission for row: ' + row);

    // Get all data from this row
    const rowData = sheet.getRange(row, 1, 1, 25).getValues()[0];

    // Process the contact submission
    processContactSubmission(rowData, row);

  } catch (error) {
    Logger.log('Error in onEdit: ' + error.toString());
    // Continue - don't throw error
  }
}

// ========================================
// EMAIL PROCESSING
// ========================================

/**
 * Process contact submission and send appropriate emails
 */
function processContactSubmission(rowData, rowNumber) {
  const searchId = rowData[CONFIG.COLUMNS.SEARCH_ID];
  const contactName = rowData[CONFIG.COLUMNS.CONTACT_NAME];
  const contactEmail = rowData[CONFIG.COLUMNS.CONTACT_EMAIL];
  const orgName = rowData[CONFIG.COLUMNS.ORG_NAME] || '';
  const phone = rowData[CONFIG.COLUMNS.PHONE] || '';

  // Validate email
  if (!contactEmail || !contactName) {
    Logger.log('Missing contact email or name');
    return;
  }

  Logger.log('Processing: ' + contactName + ' (' + contactEmail + ')');

  // Determine email type based on SearchID
  if (!searchId || searchId === '') {
    // Type 1: Standalone contact (no grant search)
    Logger.log('Sending standalone emails...');
    sendStandaloneEmails(contactName, contactEmail, orgName, phone);
  } else {
    // Type 2: Grant results contact
    Logger.log('Sending grant results emails...');
    const grants = extractGrantsFromRow(rowData);
    const projectDesc = rowData[CONFIG.COLUMNS.PROJECT_DESC];
    const revenueStatus = rowData[CONFIG.COLUMNS.REVENUE_STATUS];
    const orgType = rowData[CONFIG.COLUMNS.ORG_TYPE];

    sendGrantResultsEmails(
      contactName,
      contactEmail,
      orgName,
      phone,
      grants,
      projectDesc,
      revenueStatus,
      orgType,
      searchId
    );
  }

  Logger.log('Emails sent successfully for row ' + rowNumber);
}

/**
 * Extract grant data from row
 */
function extractGrantsFromRow(rowData) {
  const grants = [];

  // Grant 1
  if (rowData[CONFIG.COLUMNS.GRANT1_NAME]) {
    grants.push({
      name: rowData[CONFIG.COLUMNS.GRANT1_NAME],
      description: rowData[CONFIG.COLUMNS.GRANT1_DESC],
      whyGoodFit: rowData[CONFIG.COLUMNS.GRANT1_FIT],
      eligibility: rowData[CONFIG.COLUMNS.GRANT1_ELIG],
      link: rowData[CONFIG.COLUMNS.GRANT1_LINK]
    });
  }

  // Grant 2
  if (rowData[CONFIG.COLUMNS.GRANT2_NAME]) {
    grants.push({
      name: rowData[CONFIG.COLUMNS.GRANT2_NAME],
      description: rowData[CONFIG.COLUMNS.GRANT2_DESC],
      whyGoodFit: rowData[CONFIG.COLUMNS.GRANT2_FIT],
      eligibility: rowData[CONFIG.COLUMNS.GRANT2_ELIG],
      link: rowData[CONFIG.COLUMNS.GRANT2_LINK]
    });
  }

  // Grant 3
  if (rowData[CONFIG.COLUMNS.GRANT3_NAME]) {
    grants.push({
      name: rowData[CONFIG.COLUMNS.GRANT3_NAME],
      description: rowData[CONFIG.COLUMNS.GRANT3_DESC],
      whyGoodFit: rowData[CONFIG.COLUMNS.GRANT3_FIT],
      eligibility: rowData[CONFIG.COLUMNS.GRANT3_ELIG],
      link: rowData[CONFIG.COLUMNS.GRANT3_LINK]
    });
  }

  Logger.log('Extracted ' + grants.length + ' grants');
  return grants;
}

// ========================================
// TYPE 1: STANDALONE CONTACT EMAILS
// ========================================

function sendStandaloneEmails(name, email, orgName, phone) {
  // Email to user
  const userSubject = `Thanks for reaching out to ${CONFIG.BUSINESS_NAME}!`;
  const userBody = createStandaloneUserEmail(name);

  GmailApp.sendEmail(email, userSubject, '', {
    htmlBody: userBody,
    replyTo: CONFIG.REPLY_TO_EMAIL,
    name: CONFIG.BUSINESS_NAME
  });

  // Email to client
  const clientSubject = `New Contact Lead: ${name}`;
  const clientBody = createStandaloneClientEmail(name, email, orgName, phone);

  GmailApp.sendEmail(CONFIG.CLIENT_EMAIL, clientSubject, '', {
    htmlBody: clientBody,
    name: CONFIG.BUSINESS_NAME
  });

  Logger.log(`Standalone emails sent for: ${name}`);
}

function createStandaloneUserEmail(name) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thanks for Contacting Us!</h1>
        </div>
        <div class="content">
          <p>Hi ${name},</p>
          <p>Thanks for reaching out to ${CONFIG.BUSINESS_NAME}! We received your message and one of our grant specialists will be in touch with you shortly.</p>
          <p>We're excited to help you discover funding opportunities for your project.</p>
          <p>Best regards,<br>The ${CONFIG.BUSINESS_NAME} Team</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function createStandaloneClientEmail(name, email, orgName, phone) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .info { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 10px 0; }
        .label { font-weight: bold; color: #2563eb; }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>New Contact Lead</h2>
        <div class="info">
          <p><span class="label">Name:</span> ${name}</p>
          <p><span class="label">Email:</span> ${email}</p>
          ${orgName ? `<p><span class="label">Organization:</span> ${orgName}</p>` : ''}
          ${phone ? `<p><span class="label">Phone:</span> ${phone}</p>` : ''}
        </div>
      </div>
    </body>
    </html>
  `;
}

// ========================================
// TYPE 2: GRANT RESULTS EMAILS
// ========================================

function sendGrantResultsEmails(name, email, orgName, phone, grants, projectDesc, revenueStatus, orgType, searchId) {
  // Email to user with grant matches
  const userSubject = `Your Grant Matches from ${CONFIG.BUSINESS_NAME}`;
  const userBody = createGrantResultsUserEmail(name, grants);

  GmailApp.sendEmail(email, userSubject, '', {
    htmlBody: userBody,
    replyTo: CONFIG.REPLY_TO_EMAIL,
    name: CONFIG.BUSINESS_NAME
  });

  // Email to client with lead info
  const clientSubject = `New Grant Lead: ${name}`;
  const clientBody = createGrantResultsClientEmail(
    name,
    email,
    orgName,
    phone,
    grants,
    projectDesc,
    revenueStatus,
    orgType,
    searchId
  );

  GmailApp.sendEmail(CONFIG.CLIENT_EMAIL, clientSubject, '', {
    htmlBody: clientBody,
    name: CONFIG.BUSINESS_NAME
  });

  Logger.log(`Grant results emails sent for: ${name}`);
}

function createGrantResultsUserEmail(name, grants) {
  let grantsHtml = '';
  grants.forEach((grant, index) => {
    const eligibilityList = grant.eligibility ? grant.eligibility.split(';').map(e => `<li>${e.trim()}</li>`).join('') : '';

    grantsHtml += `
      <div style="background: white; border: 2px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0;">
        <div style="background: #2563eb; color: white; display: inline-block; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: bold; margin-bottom: 10px;">
          GRANT ${index + 1}
        </div>
        <h3 style="color: #1f2937; margin: 10px 0;">${grant.name}</h3>
        <p style="color: #6b7280; margin: 10px 0;">${grant.description}</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 6px; margin: 15px 0;">
          <h4 style="color: #2563eb; margin: 0 0 10px 0;">Why This Grant is a Good Fit:</h4>
          <p style="margin: 0; color: #1f2937;">${grant.whyGoodFit}</p>
        </div>

        ${eligibilityList ? `
          <div style="margin: 15px 0;">
            <h4 style="color: #1f2937; margin: 0 0 10px 0;">Key Eligibility Requirements:</h4>
            <ul style="color: #6b7280; margin: 0; padding-left: 20px;">
              ${eligibilityList}
            </ul>
          </div>
        ` : ''}

        <a href="${grant.link}" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 15px;">
          View Application →
        </a>
      </div>
    `;
  });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb; }
        .header { background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 We Found ${grants.length} Perfect Grant${grants.length > 1 ? 's' : ''} For You!</h1>
        </div>
        <div style="padding: 20px;">
          <p>Hi ${name},</p>
          <p>Great news! Our AI analyzed thousands of grants and found these top opportunities that align perfectly with your project.</p>

          ${grantsHtml}

          <div style="background: white; border-left: 4px solid #fbbf24; padding: 20px; margin: 30px 0; border-radius: 4px;">
            <h3 style="color: #1f2937; margin: 0 0 10px 0;">Need Help Applying?</h3>
            <p style="margin: 0; color: #6b7280;">Our team of grant specialists can help you craft winning applications. We'll be in touch soon to discuss how we can maximize your chances of success.</p>
          </div>

          <p>Best of luck with your applications!</p>
          <p>The ${CONFIG.BUSINESS_NAME} Team</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function createGrantResultsClientEmail(name, email, orgName, phone, grants, projectDesc, revenueStatus, orgType, searchId) {
  let grantsHtml = grants.map((grant, index) => `
    <div style="background: #f9fafb; padding: 15px; border-radius: 6px; margin: 10px 0;">
      <h4 style="color: #2563eb; margin: 0 0 5px 0;">Grant ${index + 1}: ${grant.name}</h4>
      <p style="margin: 5px 0; font-size: 14px;"><a href="${grant.link}" style="color: #2563eb;">${grant.link}</a></p>
    </div>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .section { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 15px 0; }
        .label { font-weight: bold; color: #2563eb; }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>New Grant Lead: ${name}</h2>

        <div class="section">
          <h3>Contact Information</h3>
          <p><span class="label">Name:</span> ${name}</p>
          <p><span class="label">Email:</span> ${email}</p>
          ${orgName ? `<p><span class="label">Organization:</span> ${orgName}</p>` : ''}
          ${phone ? `<p><span class="label">Phone:</span> ${phone}</p>` : ''}
          <p><span class="label">Search ID:</span> ${searchId}</p>
        </div>

        <div class="section">
          <h3>Project Details</h3>
          <p><span class="label">Organization Type:</span> ${orgType}</p>
          <p><span class="label">Revenue Status:</span> ${revenueStatus}</p>
          <p><span class="label">Project Description:</span></p>
          <p style="background: white; padding: 15px; border-radius: 4px;">${projectDesc}</p>
        </div>

        <div class="section">
          <h3>Grant Matches (${grants.length})</h3>
          ${grantsHtml}
        </div>
      </div>
    </body>
    </html>
  `;
}
