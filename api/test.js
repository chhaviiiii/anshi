export default async function handler(req, res) {
  res.status(200).json({
    message: 'Test endpoint working',
    sendgridApiKeyExists: !!process.env.SENDGRID_API_KEY,
    sendgridApiKeyLength: process.env.SENDGRID_API_KEY ? process.env.SENDGRID_API_KEY.length : 0,
    fromEmail: process.env.SENDGRID_FROM_EMAIL,
    nodeEnv: process.env.NODE_ENV
  });
} 