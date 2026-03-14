# Final Setup Instructions - Taking Mime 003

## ✅ What's Complete:

- ✅ Redemption website with name + email form (NO code field)
- ✅ Code auto-detected from QR scan
- ✅ Three different pages:
  1. **VIP** - First redemption = FREE entry
  2. **Already Redeemed** - Shows who redeemed + $20 entry
  3. **Regular** - No code = $20 entry
- ✅ Google Maps embed with your Philadelphia venue
- ✅ All 36 promoter flyers (SVG + JPG)
- ✅ All 99 guest list passes

---

## 🔧 What You Need To Do:

### 1. Update Your Google Apps Script (CRITICAL!)

**Open your Google Apps Script** and **REPLACE ALL CODE** with this:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    const name = data.name || '';
    const email = data.email || '';
    const code = data.code || '';
    const pid = data.pid || '';
    const isValidCode = data.isValidGuestList || false;

    // Check if this code was already redeemed
    let alreadyRedeemed = false;
    let redeemedByName = '';

    if (isValidCode && code !== 'none') {
      const allData = sheet.getDataRange().getValues();

      // Check all rows (skip header)
      for (let i = 1; i < allData.length; i++) {
        const rowCode = allData[i][3]; // Column D (code)
        const rowName = allData[i][1]; // Column B (name)
        const rowIsValid = allData[i][5]; // Column F (isValidGuestList)

        if (rowCode === code && rowIsValid === 'true') {
          alreadyRedeemed = true;
          redeemedByName = rowName;
          break;
        }
      }
    }

    // Add the submission to the sheet
    sheet.appendRow([
      new Date(),
      name,
      email,
      code,
      pid,
      isValidCode ? 'true' : 'false'
    ]);

    // Return response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      alreadyRedeemed: alreadyRedeemed,
      redeemedByName: redeemedByName,
      isValidCode: isValidCode
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

**Then:**
1. Click **Save** (disk icon)
2. Click **Deploy → Manage deployments**
3. Click **pencil icon** (edit)
4. Click **"New version"**
5. Click **Deploy**

### 2. Create party-info.png

Create a **1080x1080** square image with event details and save as `party-info.png`

### 3. Push to GitHub

```bash
git add party-info.png
git commit -m "Add party info image"
git push
```

Wait 2-3 minutes for GitHub Pages to update.

---

## 🎯 How It Works:

### Guest List Pass (QR Code):
1. Guest scans QR → Opens `https://rflxtns.github.io/taking-mime003?cid=AMPPHDPbMwBw`
2. Code auto-detected (no visible field)
3. Guest enters **NAME** and **EMAIL**
4. Submits

**If FIRST to use that code:**
- ✅ **FREE VIP ENTRY**
- Shows: "WELCOME [NAME]! YOU'RE ON THE GUEST LIST"
- Green checkmark, party info

**If code ALREADY USED:**
- ⚠️ **$20 ENTRY**
- Shows: "Guest list already redeemed by [FIRST PERSON'S NAME]"
- Orange warning, party info, still gets in

### Promoter Flyer (QR Code):
1. Someone scans promoter QR → Opens with `?pid=LYB8_dVk`
2. No code detected
3. Enters name + email
4. **$20 ENTRY** (regular admission)
5. Google Sheet tracks which promoter sent them

### Direct Link (No QR):
1. Someone visits site directly
2. No code, no PID
3. **$20 ENTRY** (regular admission)

---

## 📊 Google Sheet Columns:

| A: Timestamp | B: Name | C: Email | D: Code | E: PID | F: Valid Guest List |
|--------------|---------|----------|---------|--------|---------------------|
| 3/13 6:00pm | John Doe | john@mail.com | AMPPHDPbMwBw | direct | true |
| 3/13 6:05pm | Jane Smith | jane@mail.com | AMPPHDPbMwBw | direct | true |
| 3/13 6:10pm | Bob Jones | bob@mail.com | none | LYB8_dVk | false |

**Reading the sheet:**
- **First row** (John) = FREE VIP (first to use code AMPP)
- **Second row** (Jane) = $20 (John already redeemed code AMPP)
- **Third row** (Bob) = $20 (came from promoter LYB8, no guest list)

---

## 🚪 At The Door:

**Door person checks Google Sheet:**

1. Guest arrives and says "I'm on the guest list"
2. Door person searches sheet for their **NAME**
3. Check column F (Valid Guest List):
   - **"true"** = They're in the sheet
   - Look at row position:
     - **First row** with that code = **FREE**
     - **Not first** row with that code = **$20** (someone else got the free spot)

**Example:**
- John Doe (first AMPP code) → **FREE**
- Jane Smith (second AMPP code) → **$20**
- Bob Jones (no code) → **$20**

---

## 🧪 Testing Checklist:

1. [ ] Google Apps Script updated and deployed
2. [ ] party-info.png added
3. [ ] Pushed to GitHub
4. [ ] GitHub Pages live at https://rflxtns.github.io/taking-mime003
5. [ ] Test guest list code: `?cid=AMPP` (enter name twice, second should show already redeemed)
6. [ ] Test promoter link: `?pid=LYB8_dVk`
7. [ ] Test direct visit (no parameters)
8. [ ] Check Google Sheet updates correctly

---

## ⚠️ Important Notes:

- **Each guest list code = ONE free entry** (first person wins)
- **Everyone else** who tries same code = $20 entry
- **Promoter QR codes** = $20 entry (used for tracking only)
- **No code field** in form (happens automatically)
- **Google Sheet = your door list** (sort by timestamp to see who was first)

---

## 🎉 You're Almost Done!

Just need to:
1. Update Google Apps Script (copy code above)
2. Create party-info.png
3. Push to GitHub

Then you're live! 🚀
