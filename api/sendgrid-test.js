import sgMail from '@sendgrid/mail';

export default async function handler(req, res) {
  try {
    console.log('=== SENDGRID SIMPLE TEST ===');
    console.log('API Key exists:', !!process.env.SENDGRID_API_KEY);
    console.log('From email:', process.env.SENDGRID_FROM_EMAIL);

    if (!process.env.SENDGRID_API_KEY) {
      return res.status(500).json({ 
        error: 'SENDGRID_API_KEY not found',
        message: 'Environment variable not set'
      });
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: 'chhavi09nayyar@gmail.com',
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: 'Test Email from Anshi App',
      text: 'This is a test email to verify SendGrid is working.',
      html: '<p>This is a test email to verify SendGrid is working.</p>'
    };

    console.log('Sending test email...');
    await sgMail.send(msg);
    console.log('Test email sent successfully!');

    res.status(200).json({ 
      success: true, 
      message: 'Test email sent successfully!' 
    });

  } catch (error) {
    console.error('SendGrid test error:', error.message);
    console.error('Error response:', error.response?.body);
    
    res.status(500).json({ 
      error: error.message,
      details: error.response?.body
    });
  }
} 