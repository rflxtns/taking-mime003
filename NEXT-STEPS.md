# Next Steps - Taking Mime 003 Redemption System

## What's Complete ✅

### Redemption Website (index.html)
- ✅ Name field added to form
- ✅ Email validation (checks if it's a real email)
- ✅ Code auto-fills from URL (`?cid=XXXX`)
- ✅ Submits to Google Sheets (easy setup!)
- ✅ Shows party-info.png on success
- ✅ Different views for VIP (valid code) vs regular attendees

### Promoter Flyers
- ✅ 36 flyers in SVG format (promoter-flyers-svg/)
- ✅ 36 flyers in JPG format (promoter-flyers-jpg/) - **1200x1800, print-ready!**
- ✅ Each flyer has unique QR code with PID for tracking
- ✅ Reference file with all PIDs and colors (promoter-flyers-reference.json)

### Guest List Passes
- ✅ 99 unique VIP pass codes
- ✅ All codes validated in website

## What You Need to Do 🔧

### 1. Create party-info.png Image
**Required:** A 1080x1080 square image with all event details

This image shows when someone successfully submits the form.

**Include:**
- Event address
- Date/time
- Parking info
- Age requirement
- Cover charge
- Any special instructions

### 2. Setup Google Sheets (5 minutes)
Follow the guide in **GOOGLE-SHEETS-SETUP.md**:

1. Create Google Sheet
2. Add Apps Script (copy/paste provided code)
3. Deploy as Web App
4. Copy URL to index.html (line 637)

**Why Google Sheets?** Way easier than Airtable! No webhooks, no API keys, just works.

### 3. Deploy to GitHub Pages
Once party-info.png is ready:

```bash
# Add your party info image
git add party-info.png

# Commit
git commit -m "Add party info image"

# Push to GitHub
git remote add origin https://github.com/rflxtns/taking-mime003.git
git push -u origin main
```

Then enable GitHub Pages:
- Go to: https://github.com/rflxtns/taking-mime003/settings/pages
- Source: "main" branch, "(root)" folder
- Save

**Live at:** https://rflxtns.github.io/taking-mime003

## How It Works 🔄

### Guest List Pass Flow:
1. Guest scans QR code on their pass
2. Opens: `https://rflxtns.github.io/taking-mime003?cid=AMPPHDPbMwBw`
3. **Code auto-fills** in yellow highlight
4. Guest enters **name** and **email**
5. Clicks submit
6. **Google Sheet updates** with their info
7. **party-info.png shows** with event details

### Promoter Flyer Flow:
1. Someone scans promoter QR code
2. Opens: `https://rflxtns.github.io/taking-mime003?pid=LYB8_dVk`
3. Guest enters name, email (no code needed)
4. Submits
5. Google Sheet tracks which promoter (`LYB8_dVk`) sent them
6. Shows party-info.png

### Google Sheet Data:
| Timestamp | Name | Email | Code | PID | Valid Guest List |
|-----------|------|-------|------|-----|------------------|
| 3/13 6:00pm | John Doe | john@mail.com | AMPPHDPbMwBw | direct | true |
| 3/13 6:05pm | Jane Smith | jane@mail.com | | LYB8_dVk | false |

## Files Ready for Distribution 📦

### Print These (JPG files):
- `promoter-flyers-jpg/` - 36 flyers (1200x1800) ✅
  - Give to promoters to distribute

### Digital Files (SVG):
- `promoter-flyers-svg/` - 36 flyers
  - Post on social media
  - Send via email/WhatsApp

### Guest List Passes:
Already created (99 passes in `guest-list-passes/` or similar)

## Testing Checklist ✓

Before going live:

1. [ ] party-info.png created and added
2. [ ] Google Sheet created
3. [ ] Apps Script deployed
4. [ ] URL in index.html updated (line 637)
5. [ ] Pushed to GitHub
6. [ ] GitHub Pages enabled
7. [ ] Test guest list code: https://rflxtns.github.io/taking-mime003?cid=AMPP
8. [ ] Test promoter tracking: https://rflxtns.github.io/taking-mime003?pid=LYB8_dVk
9. [ ] Check Google Sheet updates
10. [ ] party-info.png displays correctly

## Questions?

**Code not auto-filling?**
- Check URL has `?cid=XXXX` parameter
- Check code is in VALID_GUEST_LIST_CODES array

**Email validation not working?**
- Make sure email has @ and .com/.org/etc

**Google Sheet not updating?**
- Check Apps Script is deployed
- Check URL in index.html is correct
- View Apps Script execution log for errors

**Different image for VIP vs regular?**
- Currently both show same party-info.png
- Can create separate images if needed

## Summary

You're almost there! Just need to:
1. Create party-info.png (1080x1080)
2. Setup Google Sheet (5 min)
3. Push to GitHub & enable Pages

Everything else is ready to go! 🎉
