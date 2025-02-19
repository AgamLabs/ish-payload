import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  console.log('Creating transport with config:', {
    host: process.env.SMTP_HOST || 'smtppro.zoho.in',
    port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: '[REDACTED]'
      
    }
  });

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtppro.zoho.in',
    port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    debug: true,
    logger: true
  });

  console.log('Verifying connection...');
  try {
    const verify = await transporter.verify();
    console.log('Connection verified:', verify);
  } catch (err) {
    console.error('Connection verification failed:', err);
    return;
  }

  console.log('Sending test email...');
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM_ADDRESS || 'info@indiasteelhub.com',
      to: process.env.ADMIN_EMAIL || process.env.SMTP_FROM_ADDRESS || 'info@indiasteelhub.com',
      subject: 'Test Email from E-commerce Store',
      text: 'This is a test email to verify SMTP configuration.',
      html: '<h1>Test Email</h1><p>This is a test email to verify SMTP configuration.</p>'
    });

    console.log('Email sent successfully:', {
      messageId: info.messageId,
      response: info.response,
      accepted: info.accepted,
      rejected: info.rejected,
      pending: info.pending,
      envelope: info.envelope
    });
  } catch (err) {
    console.error('Failed to send email:', err);
  }
}

main().catch(console.error);
