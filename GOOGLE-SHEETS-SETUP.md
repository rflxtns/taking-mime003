# Google Sheets Setup Guide

## Step 1: Create Google Sheet

1. Go to https://sheets.google.com
2. Create new sheet called "Taking Mime 003 - Guest List"
3. Add headers in Row 1:
   - Column A: `Timestamp`
   - Column B: `Name`
   - Column C: `Email`
   - Column D: `Code`
   - Column E: `PID`
   - Column F: `Valid Guest List`

## Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions → Apps Script**
2. Delete any default code
3. Paste this script:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    // Add row with timestamp
    sheet.appendRow([
      new Date(),
      data.name || '',
      data.email || '',
      data.code || '',
      data.pid || '',
      data.isValidGuestList || 'false'
    ]);

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Save** (disk icon)
5. Click **Deploy → New deployment**
6. Click gear icon → **Web app**
7. Settings:
   - Description: "Taking Mime Guest List"
   - Execute as: **Me**
   - Who has access: **Anyone**
8. Click **Deploy**
9. **Copy the Web App URL** - you'll need this!

## Step 3: Update index.html

Replace this line (around line 619):

```javascript
const AIRTABLE_WEBHOOK_URL = 'YOUR_WEBHOOK_URL_HERE';
```

With your Google Apps Script Web App URL:

```javascript
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
```

## Step 4: Test

1. Open your redemption page
2. Enter name, email, and code
3. Click submit
4. Check your Google Sheet - new row should appear!

## Troubleshooting

**"Authorization required":**
- Re-deploy the script
- Make sure "Execute as: Me" and "Who has access: Anyone"

**No data appearing:**
- Check the script execution log (View → Executions)
- Make sure the URL in index.html is correct

**CORS errors:**
- Google Apps Script handles CORS automatically
- Make sure you're using `doPost` not `doGet`

## Example Sheet Data

| Timestamp | Name | Email | Code | PID | Valid Guest List |
|-----------|------|-------|------|-----|------------------|
| 3/13/26 18:00 | John Doe | john@example.com | AMPPHDPbMwBw | LYB8_dVk | true |
| 3/13/26 18:05 | Jane Smith | jane@example.com | | LYB8_dVk | false |
