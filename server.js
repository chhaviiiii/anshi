const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/share-feelings', async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message || message.trim() === '') {
            return res.status(400).json({ 
                success: false, 
                message: 'Message cannot be empty' 
            });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'chhavi09nayyar@gmail.com',
            subject: 'Anshi Shared her Feelings🤭',
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
        
        res.json({ 
            success: true, 
            message: 'Chhavi will get back to you soon 🩷💛' 
        });
        
    } catch (error) {
        console.error('Email sending error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Sorry, there was an error sending your message. Please try again.' 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Make sure to set up your email credentials in .env file');
}); 