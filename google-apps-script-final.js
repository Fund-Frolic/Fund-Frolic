/**
 * Google Apps Script for Fund Frolic Grant Finder
 * FINAL VERSION - Case-insensitive trigger
 *
 * INSTALLATION:
 * 1. Paste this code into Apps Script editor
 * 2. Save
 * 3. Go to Triggers (left sidebar) > Add Trigger
 * 4. Function: onSheetEdit, Event: On edit
 * 5. Grant permissions
 */

// ========================================
// CONFIGURATION
// ========================================
const CONFIG = {
  CLIENT_EMAIL: 'bellconner@gmail.com',
  BUSINESS_NAME: 'Fund Frolic',
  REPLY_TO_EMAIL: 'bellconner@gmail.com',

  COLUMNS: {
    SEARCH_ID: 0, TIMESTAMP: 1, PROJECT_DESC: 2, REVENUE_STATUS: 3, ORG_TYPE: 4,
    GRANT1_NAME: 5, GRANT1_DESC: 6, GRANT1_FIT: 7, GRANT1_ELIG: 8, GRANT1_LINK: 9,
    GRANT2_NAME: 10, GRANT2_DESC: 11, GRANT2_FIT: 12, GRANT2_ELIG: 13, GRANT2_LINK: 14,
    GRANT3_NAME: 15, GRANT3_DESC: 16, GRANT3_FIT: 17, GRANT3_ELIG: 18, GRANT3_LINK: 19,
    CONTACT_NAME: 20, CONTACT_EMAIL: 21, ORG_NAME: 22, PHONE: 23, CONTACT_SUBMITTED: 24
  }
};

// ========================================
// MAIN TRIGGER
// ========================================
function onSheetEdit(e) {
  try {
    if (!e || !e.range) return;

    const range = e.range;
    const col = range.getColumn();
    const row = range.getRow();

    // Only column Y (25)
    if (col !== 25) return;

    // Check if value is "true" (case-insensitive) or boolean true
    const value = range.getValue();
    const valueStr = String(value).toLowerCase();
    if (valueStr !== 'true') {
      Logger.log('ContactSubmitted not true: ' + value);
      return;
    }

    Logger.log('✅ Processing row: ' + row);

    const rowData = range.getSheet().getRange(row, 1, 1, 25).getValues()[0];
    processContactSubmission(rowData, row);

  } catch (error) {
    Logger.log('❌ Error: ' + error.toString());
  }
}

// ========================================
// EMAIL PROCESSING
// ========================================
function processContactSubmission(rowData, rowNumber) {
  const searchId = rowData[CONFIG.COLUMNS.SEARCH_ID];
  const contactName = rowData[CONFIG.COLUMNS.CONTACT_NAME];
  const contactEmail = rowData[CONFIG.COLUMNS.CONTACT_EMAIL];
  const orgName = rowData[CONFIG.COLUMNS.ORG_NAME] || '';
  const phone = rowData[CONFIG.COLUMNS.PHONE] || '';

  if (!contactEmail || !contactName) {
    Logger.log('Missing contact info');
    return;
  }

  Logger.log('Processing: ' + contactName);

  if (!searchId || searchId === '') {
    Logger.log('📧 Standalone contact');
    sendStandaloneEmails(contactName, contactEmail, orgName, phone);
  } else {
    Logger.log('📧 Grant results contact');
    const grants = extractGrantsFromRow(rowData);
    const projectDesc = rowData[CONFIG.COLUMNS.PROJECT_DESC];
    const revenueStatus = rowData[CONFIG.COLUMNS.REVENUE_STATUS];
    const orgType = rowData[CONFIG.COLUMNS.ORG_TYPE];

    sendGrantResultsEmails(contactName, contactEmail, orgName, phone, grants, projectDesc, revenueStatus, orgType, searchId);
  }

  Logger.log('✅ Emails sent for row ' + rowNumber);
}

function extractGrantsFromRow(rowData) {
  const grants = [];

  [[5,6,7,8,9], [10,11,12,13,14], [15,16,17,18,19]].forEach(function(indices) {
    if (rowData[indices[0]]) {
      grants.push({
        name: rowData[indices[0]],
        description: rowData[indices[1]],
        whyGoodFit: rowData[indices[2]],
        eligibility: rowData[indices[3]],
        link: rowData[indices[4]]
      });
    }
  });

  Logger.log('Found ' + grants.length + ' grants');
  return grants;
}

// ========================================
// STANDALONE EMAILS
// ========================================
function sendStandaloneEmails(name, email, orgName, phone) {
  GmailApp.sendEmail(email, 'Thanks for reaching out to ' + CONFIG.BUSINESS_NAME + '!', '', {
    htmlBody: createStandaloneUserEmail(name),
    replyTo: CONFIG.REPLY_TO_EMAIL,
    name: CONFIG.BUSINESS_NAME
  });

  GmailApp.sendEmail(CONFIG.CLIENT_EMAIL, 'New Contact Lead: ' + name, '', {
    htmlBody: createStandaloneClientEmail(name, email, orgName, phone),
    name: CONFIG.BUSINESS_NAME
  });

  Logger.log('Standalone emails sent');
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
    <body style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>New Contact Lead</h2>
      <div style="background: #f9fafb; padding: 20px; border-radius: 8px;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${orgName ? '<p><strong>Organization:</strong> ' + orgName + '</p>' : ''}
        ${phone ? '<p><strong>Phone:</strong> ' + phone + '</p>' : ''}
      </div>
    </body>
    </html>
  `;
}

// ========================================
// GRANT RESULTS EMAILS
// ========================================
function sendGrantResultsEmails(name, email, orgName, phone, grants, projectDesc, revenueStatus, orgType, searchId) {
  GmailApp.sendEmail(email, 'Your Grant Matches from ' + CONFIG.BUSINESS_NAME, '', {
    htmlBody: createGrantResultsUserEmail(name, grants),
    replyTo: CONFIG.REPLY_TO_EMAIL,
    name: CONFIG.BUSINESS_NAME
  });

  GmailApp.sendEmail(CONFIG.CLIENT_EMAIL, 'New Grant Lead: ' + name, '', {
    htmlBody: createGrantResultsClientEmail(name, email, orgName, phone, grants, projectDesc, revenueStatus, orgType, searchId),
    name: CONFIG.BUSINESS_NAME
  });

  Logger.log('Grant emails sent');
}

function createGrantResultsUserEmail(name, grants) {
  var grantsHtml = '';
  grants.forEach(function(grant, index) {
    var eligibilityList = grant.eligibility ? grant.eligibility.split(';').map(function(e) { return '<li>' + e.trim() + '</li>'; }).join('') : '';

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
  var grantsHtml = grants.map(function(grant, index) {
    return `
      <div style="background: #f9fafb; padding: 15px; border-radius: 6px; margin: 10px 0;">
        <h4 style="color: #2563eb; margin: 0 0 5px 0;">Grant ${index + 1}: ${grant.name}</h4>
        <p style="margin: 5px 0; font-size: 14px;"><a href="${grant.link}" style="color: #2563eb;">${grant.link}</a></p>
      </div>
    `;
  }).join('');

  return `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>New Grant Lead: ${name}</h2>

      <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 15px 0;">
        <h3>Contact Information</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${orgName ? '<p><strong>Organization:</strong> ' + orgName + '</p>' : ''}
        ${phone ? '<p><strong>Phone:</strong> ' + phone + '</p>' : ''}
        <p><strong>Search ID:</strong> ${searchId}</p>
      </div>

      <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 15px 0;">
        <h3>Project Details</h3>
        <p><strong>Organization Type:</strong> ${orgType}</p>
        <p><strong>Revenue Status:</strong> ${revenueStatus}</p>
        <p><strong>Project Description:</strong></p>
        <p style="background: white; padding: 15px; border-radius: 4px;">${projectDesc}</p>
      </div>

      <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 15px 0;">
        <h3>Grant Matches (${grants.length})</h3>
        ${grantsHtml}
      </div>
    </body>
    </html>
  `;
}
