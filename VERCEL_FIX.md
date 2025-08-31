# Vercel Environment Variables Setup Guide

## CRITICAL: Configure these environment variables in Vercel Dashboard

Go to your Vercel project settings → Environment Variables and set:

### Production Environment Variables:
```
PAYLOAD_PUBLIC_SERVER_URL=https://indiasteelhub.com
NEXT_PUBLIC_SERVER_URL=https://indiasteelhub.com

PAYLOAD_SECRET=dd32e04a54cc58f4cdd925235c08ea5d2f4ea8c000d25a123ca001a7f88af534
NEXT_PRIVATE_SECRET=dd32e04a54cc58f4cdd925235c08ea5d2f4ea8c000d25a123ca001a7f88af534

PAYLOAD_PUBLIC_DRAFT_SECRET=f0759dfc515c7f7cff1ccf52639f280f6a43caa206999f4d6941a0cc6d1dccba
NEXT_PRIVATE_DRAFT_SECRET=f0759dfc515c7f7cff1ccf52639f280f6a43caa206999f4d6941a0cc6d1dccba

POSTGRES_URL=postgres://postgres.kqgnfldlyvtcamkrmehn:KRngJA1ayHErfsBs@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?sslmode=require&supa=base-pooler.x
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_r9Qzh6eLKxLgHNUH_uZYVU0mUicokWrWiYGP6gYAfNvhxfy

REVALIDATION_KEY=5b20e44a2cf52e70097ac45f9853ee5655e084ae5f0522c4fa1c5c2a684109c4
NEXT_PRIVATE_REVALIDATION_KEY=5b20e44a2cf52e70097ac45f9853ee5655e084ae5f0522c4fa1c5c2a684109c4

SMTP_FROM_NAME=India Steel Hub
SMTP_FROM_ADDRESS=info@indiasteelhub.com
SMTP_HOST=smtppro.zoho.in
SMTP_PORT=465
SMTP_USER=info@indiasteelhub.com
SMTP_PASS=4bLkmVY0tiMp
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
