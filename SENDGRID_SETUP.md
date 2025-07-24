# SendGrid Setup Guide for Anshi

## Quick Setup (5 minutes):

### 1. Create SendGrid Account
1. Go to [SendGrid.com](https://sendgrid.com)
2. Click "Start for Free"
3. Sign up with your email (chhavi09nayyar@gmail.com)
4. Verify your email

### 2. Get API Key
1. In SendGrid dashboard, go to **Settings** → **API Keys**
2. Click **"Create API Key"**
3. Name it "Anshi App"
4. Choose **"Restricted Access"** → **"Mail Send"**
5. Copy the API key (starts with "SG.")

### 3. Verify Sender Email
1. Go to **Settings** → **Sender Authentication**
2. Click **"Verify a Single Sender"**
3. Add your email: chhavi09nayyar@gmail.com
4. Fill in the form and verify

### 4. Add to Vercel Environment Variables
In your Vercel dashboard:
- `SENDGRID_API_KEY` = Your API key (SG.xxx...)
- `SENDGRID_FROM_EMAIL` = chhavi09nayyar@gmail.com

## Benefits of SendGrid:
- ✅ Works perfectly on Vercel
- ✅ 100 emails/day free
- ✅ No Gmail app password needed
- ✅ Reliable delivery
- ✅ Better for production

## Test it:
After setup, your Anshi app will send emails reliably! 🚀 