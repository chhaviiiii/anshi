const nodemailer = require('nodemailer');

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

    console.log('Attempting to send email...');
    console.log('From:', process.env.EMAIL_USER);
    console.log('To: chhavi09nayyar@gmail.com');

    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'chhavi09nayyar@gmail.com',
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

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
    
    res.status(200).json({ 
      success: true, 
      message: 'Chhavi will get back to you soon 🩷💛' 
    });
    
  } catch (error) {
    console.error('Email sending error details:', error);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    
    res.status(500).json({ 
      success: false, 
      message: 'Sorry, there was an error sending your message. Please try again.' 
    });
  }
} 