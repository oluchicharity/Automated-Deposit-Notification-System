const express = require('express');
const axios = require('axios');
const nodemailer = require('nodemailer');
const winston = require('winston');
const app = express();

app.use(express.json());

const config = {
  userServiceUrl: 'http://localhost:4000',
  walletServiceUrl: 'http://localhost:4001',
  notificationType: {
    mobile: 'MOBILE',
    email: 'EMAIL'
  },
  emailService: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
};

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'notification-service.log' })
  ]
});

const transporter = nodemailer.createTransport({
  host: config.emailService.host,
  port: config.emailService.port,
  secure: false,
  auth: {
    user: config.emailService.user,
    pass: config.emailService.pass
  }
});

app.post('/notify', async (req, res) => {
  const { userId, amount, notificationType } = req.body;

  try {
    const userResponse = await axios.get(`${config.userServiceUrl}/users/${userId}`);
    const user = userResponse.data;

    const walletResponse = await axios.get(`${config.walletServiceUrl}/wallet/${userId}`);
    const wallet = walletResponse.data;

    if (wallet.balance < amount) {
      if (notificationType === config.notificationType.mobile) {
        logger.info(`Sending mobile notification to ${user.mobile}`);
      } else if (notificationType === config.notificationType.email) {
        const mailOptions = {
          from: config.emailService.user,
          to: user.email,
          subject: 'Automated Deposit Failed',
          text: `Dear ${user.name}, your automated deposit of ${amount} failed due to insufficient funds. Please resolve the issue at your earliest convenience.`
        };

        await transporter.sendMail(mailOptions);
        logger.info(`Email sent to ${user.email}`);
      }

      res.status(200).send('Notification sent');
    } else {
      res.status(200).send('Sufficient funds, no notification sent');
    }
  } catch (error) {
    logger.error(error);
    res.status(500).send('An error occurred');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  logger.info(`Notification Service running on port ${PORT}`);
});
