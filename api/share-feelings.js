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
        message: 'Message cannot be empty' 
      });
    }

    console.log('Attempting to send email with SendGrid...');
    console.log('To: chhavi09nayyar@gmail.com');

    // Set SendGrid API key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: 'chhavi09nayyar@gmail.com',
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@yourdomain.com',
      subject: 'Someone Shared Their Feelings 💙',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 15px; color: white; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">💙 New Feelings Shared 💙</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Someone has shared their thoughts with you</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin-top: 20px; border-left: 4px solid #667eea;">
            <h3 style="color: #333; margin-top: 0;">Their Message:</h3>
            <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e1e5e9; line-height: 1.6; color: #333;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #666; font-size: 14px;">
            <p>Sent from your Feelings Sharing App</p>
            <p>💙 Be there for them 💙</p>
          </div>
        </div>
      `
    };

    await sgMail.send(msg);
    console.log('Email sent successfully with SendGrid!');
    
    res.status(200).json({ 
      success: true, 
      message: 'Chhavi will get back to you soon 🩷💛' 
    });
    
  } catch (error) {
    console.error('SendGrid email sending error:', error);
    console.error('Error message:', error.message);
    
    res.status(500).json({ 
      success: false, 
      message: 'Sorry, there was an error sending your message. Please try again.' 
    });
  }
} 