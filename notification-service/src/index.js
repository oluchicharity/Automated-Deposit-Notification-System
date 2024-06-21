const express = require('express');
const axios = require('axios');
const nodemailer = require('nodemailer');
const winston = require('winston');

const config = require('../config/config');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console()
  ]
});

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'finsworthpro@gmail.com',
    pass: 'bxto xjhh nddv blpa'
  }
});

async function sendNotification(userId, amount, notificationType) {
  try {
    const userResponse = await axios.get(`${config.userServiceUrl}/users/${userId}`);
    const user = userResponse.data;

    const walletResponse = await axios.get(`${config.walletServiceUrl}/wallet/${userId}`);
    const wallet = walletResponse.data;

    if (wallet.balance < amount) {
      if (notificationType === config.notificationType.email) {
        const mailOptions = {
          from: 'finsworthpro@gmail.com',
          to: 'oluchicharity10@gmail.com',
          subject: 'Failed Automated Deposit Notification',
          text: `Dear ${user.name},\n\nYour automated deposit of $${amount} failed due to insufficient funds in your wallet. Please add funds to your wallet to continue using the service.\n\nBest Regards,\nYour Service Team`
        };
        
        await transporter.sendMail(mailOptions);
        logger.info(`Email notification sent to ${user.email} about failed deposit of ${amount} due to insufficient funds.`);
      } else if (notificationType === config.notificationType.mobile) {
       
        logger.info(`Mobile notification sent to ${user.mobile} about failed deposit of ${amount} due to insufficient funds.`);
      }
    }
  } catch (error) {
    logger.error('Error sending notification', error);
  }
}

const app = express();
app.use(express.json());

app.post('/notify', async (req, res) => {
  const { userId, amount, notificationType } = req.body;
  await sendNotification(userId, amount, notificationType);
  res.send('Notification process completed');
});

const PORT = 3000;
app.listen(PORT, () => {
  logger.info(`Notification Service running on port ${PORT}`);
});
