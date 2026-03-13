# Taking Mime 003 - Deployment Guide

## Quick Deploy to GitHub Pages

### 1. Create party-info.png Image
Create a 1080x1080px image with event details and save as `party-info.png` in this directory.

### 2. Push to GitHub

```bash
git add index.html party-info.png
git commit -m "Deploy Taking Mime 003 redemption system"
git remote add origin https://github.com/rflxtns/taking-mime003.git
git push -u origin main
```

### 3. Enable GitHub Pages
1. Go to https://github.com/rflxtns/taking-mime003/settings/pages
2. Source: Deploy from branch
3. Branch: main / (root)
4. Save

Site will be live at: https://rflxtns.github.io/taking-mime003

## Airtable Setup

### 1. Create Airtable Base
Create a base called "Taking Mime Events" with table "Events":

**Fields:**
- `event_type` (Single select: "scan", "email_submission")
- `code` (Single line text)
- `pid` (Single line text)
- `email` (Email)
- `timestamp` (Created time)

### 2. Create Webhook Automation
1. Automations → Create Automation
2. Trigger: When webhook received
3. Action: Create record in Events table
4. Map fields from webhook data
5. Copy webhook URL

### 3. Update index.html
Replace line 623 in `index.html`:
```javascript
const AIRTABLE_WEBHOOK_URL = 'YOUR_WEBHOOK_URL_HERE';
```

With your actual webhook URL.

### 4. Redeploy
```bash
git add index.html
git commit -m "Add Airtable webhook"
git push
```

## File Structure

```
redemption-system/
├── index.html                      (Main redemption page)
├── party-info.png                  (Event details image - 1080x1080)
├── guest-list-passes/              (99 VIP passes)
├── promoter-flyers-svg/            (36 promoter flyers - SVG)
├── promoter-flyers-jpg/            (36 promoter flyers - JPG)
├── promoter-flyers-reference.json  (PID mapping)
└── qr-codes-manifest.json          (All codes and URLs)
```

## Testing

### Test Guest List Code
1. Visit: https://rflxtns.github.io/taking-mime003?cid=AMPP
2. Enter full code: AMPPHDPbMwBw
3. Should show party-info.png

### Test Promoter Tracking
1. Visit: https://rflxtns.github.io/taking-mime003?pid=LYB8_dVk
2. Check Airtable for "scan" event with correct PID

### Test Email Submission
1. Submit email on redemption page
2. Check Airtable for "email_submission" event

## URLs Reference

**Guest List Passes:** 99 unique codes in qr-codes-manifest.json
**Promoter Flyers:** 36 unique PIDs in promoter-flyers-reference.json
**Social Media Links:**
- Instagram: ?pid=instagram_pid
- Twitter: ?pid=twitter_pid
- TikTok: ?pid=tiktok_pid
- Facebook: ?pid=facebook_pid
- Discord: ?pid=discord_pid
- WhatsApp: ?pid=whatsapp_pid
- Email: ?pid=email_pid
- Reddit: ?pid=reddit_pid
- Website: ?pid=website_pid
- Direct: ?pid=direct
