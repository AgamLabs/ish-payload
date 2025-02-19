import nodemailer from 'nodemailer';

async function testConnection() {
  const transporter = nodemailer.createTransport({
    host: 'smtppro.zoho.in',
    port: 465,
    secure: true,
    auth: {
      user: 'info@indiasteelhub.com',
      pass: '4bLkmVY0tiMp'
    },
    debug: true
  });

  try {
    await transporter.verify();
    console.log('SMTP connection successful!');
    
    // Try sending a test email
    const info = await transporter.sendMail({
      from: '"India Steel Hub" <info@indiasteelhub.com>',
      to: 'nandhanandy92@gmail.com',
      subject: 'Test Email',
      text: 'This is a test email to verify SMTP settings.'
    });
    
    console.log('Test email sent:', info.messageId);
  } catch (error) {
    console.error('Error:', error);
  }
}





testConnection();
