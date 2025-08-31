# Vercel Environment Variables Setup Guide

## CRITICAL: Configure these environment variables in Vercel Dashboard

Go to your Vercel project settings → Environment Variables and set:

### Production Environment Variables:
```
PAYLOAD_PUBLIC_SERVER_URL=https://indiasteelhub.com
NEXT_PUBLIC_SERVER_URL=https://indiasteelhub.com

PAYLOAD_SECRET=[YOUR_PAYLOAD_SECRET]
NEXT_PRIVATE_SECRET=[YOUR_PAYLOAD_SECRET]

PAYLOAD_PUBLIC_DRAFT_SECRET=[YOUR_DRAFT_SECRET]
NEXT_PRIVATE_DRAFT_SECRET=[YOUR_DRAFT_SECRET]

POSTGRES_URL=[YOUR_POSTGRES_CONNECTION_STRING]
BLOB_READ_WRITE_TOKEN=[YOUR_VERCEL_BLOB_TOKEN]

REVALIDATION_KEY=[YOUR_REVALIDATION_KEY]
NEXT_PRIVATE_REVALIDATION_KEY=[YOUR_REVALIDATION_KEY]

SMTP_FROM_NAME=India Steel Hub
SMTP_FROM_ADDRESS=info@indiasteelhub.com
SMTP_HOST=[YOUR_SMTP_HOST]
SMTP_PORT=465
SMTP_USER=[YOUR_SMTP_USER]
SMTP_PASS=[YOUR_SMTP_PASSWORD]
ADMIN_EMAIL=info@indiasteelhub.com

COMPANY_NAME=Steel XPRESS Solution
TWITTER_CREATOR=@nandhanandy92
TWITTER_SITE=https://indiasteelhub.com/
SITE_NAME=India Steel Hub ISH Marketplace
```

## Steps to Fix:

1. **In Vercel Dashboard:**
   - Go to your project settings
   - Navigate to Environment Variables
   - Update PAYLOAD_PUBLIC_SERVER_URL to: https://indiasteelhub.com
   - Update NEXT_PUBLIC_SERVER_URL to: https://indiasteelhub.com

2. **Redeploy:**
   - After updating variables, trigger a new deployment
   - The CORS errors will be resolved

## Root Cause:
The API calls were failing because:
- Frontend trying to call: https://www.indiasteelhub.com/api/users/me
- But actual domain is: https://indiasteelhub.com
- Plus HTTP/HTTPS protocol mismatch from localhost config
