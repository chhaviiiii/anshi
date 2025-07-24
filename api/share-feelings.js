import sgMail from '@sendgrid/mail';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    
    if (!message || message.trim() === '') {
      return res.status(400).json({ 
        success: false, 
        message: 'Please write something to share...' 
      });
    }

    // Check if API key exists
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SENDGRID_API_KEY not found');
      return res.status(500).json({ 
        success: false, 
        message: 'Email service not configured - API key missing' 
      });
    }

    // Set API key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // Try with a different from email first
    const msg = {
      to: 'chhavi09nayyar@gmail.com',
      from: 'noreply@sendgrid.net', // Use SendGrid's default sender
      subject: 'New Message from Anshi 💙',
      text: message,
      html: `<p>${message}</p>`
    };

    console.log('Sending email...');
    await sgMail.send(msg);
    console.log('Email sent successfully!');
    
    res.status(200).json({ 
      success: true, 
      message: 'Chhavi will get back to you soon 💙' 
    });
    
  } catch (error) {
    console.error('SendGrid error:', error.message);
    console.error('Error details:', error.response?.body);
    
    // Show the actual error to help debug
    res.status(500).json({ 
      success: false, 
      message: `Error: ${error.message}`,
      details: error.response?.body
    });
  }
} 