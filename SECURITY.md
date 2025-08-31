# 🔐 Security Guidelines

## Environment Variables Security

### ✅ What's Safe to Share:
- Public URLs (PAYLOAD_PUBLIC_SERVER_URL, NEXT_PUBLIC_SERVER_URL)
- Public configuration (COMPANY_NAME, TWITTER_CREATOR, etc.)
- SMTP host and port information
- Email addresses (non-sensitive ones)

### ❌ NEVER Share These Secrets:
- PAYLOAD_SECRET / NEXT_PRIVATE_SECRET
- PAYLOAD_PUBLIC_DRAFT_SECRET / NEXT_PRIVATE_DRAFT_SECRET
- POSTGRES_URL (contains database credentials)
- BLOB_READ_WRITE_TOKEN (Vercel storage access)
- REVALIDATION_KEY / NEXT_PRIVATE_REVALIDATION_KEY
- SMTP_USER / SMTP_PASS (email authentication)

## Production Deployment

### Vercel Environment Variables:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Set the following variables with your actual values:

```
PAYLOAD_PUBLIC_SERVER_URL=https://indiasteelhub.com
NEXT_PUBLIC_SERVER_URL=https://indiasteelhub.com
PAYLOAD_SECRET=[your-secret-here]
POSTGRES_URL=[your-db-url-here]
BLOB_READ_WRITE_TOKEN=[your-blob-token-here]
... (other environment variables)
```

### Important Notes:
- `.env.local` is for local development only
- `.env` should not contain actual secrets
- Use Vercel Dashboard for production secrets
- Rotate secrets periodically for security

## Security Best Practices:
1. **Never commit** `.env` files with real credentials
2. **Use different secrets** for development and production
3. **Rotate secrets** regularly
4. **Limit access** to production environment variables
5. **Monitor** for any accidental credential exposure

## If Credentials Are Compromised:
1. **Immediately rotate** all affected secrets
2. **Update Vercel environment variables**
3. **Redeploy** the application
4. **Monitor** for any suspicious activity
