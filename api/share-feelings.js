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

    // Set API key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // Simple email
    const msg = {
      to: 'chhavi09nayyar@gmail.com',
      from: 'chhavi09nayyar@gmail.com', // Use your verified email
      subject: 'New Message from Anshi 💙',
      text: message,
      html: `<p>${message}</p>`
    };

    await sgMail.send(msg);
    
    res.status(200).json({ 
      success: true, 
      message: 'Chhavi will get back to you soon 💙' 
    });
    
  } catch (error) {
    console.error('Error:', error.message);
    
    res.status(500).json({ 
      success: false, 
      message: 'Sorry, there was an error. Please try again.' 
    });
  }
} 