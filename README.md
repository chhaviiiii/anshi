# Feelings Sharing App 💙

A beautiful landing page where people can share their feelings, sorrows, and thoughts. All messages are sent directly to your email address.

## Features

- ✨ Beautiful, modern design with calming purple gradients
- 💙 Encouraging interface for sharing feelings
- 📧 Messages sent directly to your email
- 📱 Fully responsive design
- 🎨 Smooth animations and floating elements
- ⌨️ Keyboard shortcuts (Ctrl+Enter to submit)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Email Settings

You need to set up Gmail to send emails. Follow these steps:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. **Create a `.env` file** in the project root:

```bash
cp env.example .env
```

4. **Edit the `.env` file** with your Gmail credentials:

```
EMAIL_USER=email
EMAIL_PASS=16characterpassword
PORT=3000
```

### 3. Start the Server

```bash
npm start
```

The app will be available at: http://localhost:3000

### 4. Test the Email Functionality

1. Open http://localhost:3000 in your browser
2. Type a message in the textarea
3. Click "Share" or press Ctrl+Enter
4. Check your email (chhavi09nayyar@gmail.com) for the message

## How It Works

- Users visit the landing page and see a beautiful, calming interface
- They can type their feelings, sorrows, or thoughts in the textarea
- When they click "Share", the message is sent to your email address
- You'll receive a beautifully formatted email with their message
- The user gets a confirmation that their message was sent

## Email Format

Each email you receive will include:
- A beautiful header with hearts
- The user's message in a clean, readable format
- Timestamp and sender information
- Encouraging footer message

## Security Notes

- The app uses environment variables to keep your email credentials secure
- Never commit your `.env` file to version control
- The app validates messages before sending
- CORS is enabled for cross-origin requests

## Troubleshooting

### Email Not Sending?
- Check that your Gmail credentials are correct
- Ensure 2-factor authentication is enabled
- Verify you're using an App Password (not your regular password)
- Check the server console for error messages

### Server Won't Start?
- Make sure all dependencies are installed: `npm install`
- Check that the `.env` file exists and has correct credentials
- Ensure port 3000 is not already in use

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Email**: Nodemailer
- **Styling**: Custom CSS with gradients and animations

## License

MIT License - feel free to use and modify as needed!
