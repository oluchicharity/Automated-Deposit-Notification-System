const nodemailer = require('nodemailer');
const { notificationType, emailService } = require('../../config/config');
const logger = require('../utils/logger');
const errorHandler = require('../utils/errorHandler');

const sendEmailNotification = async (email, amount) => {
  const transporter = nodemailer.createTransport({
    host: emailService.host,
    port: emailService.port,
    secure: false,
    auth: {
      user: emailService.user,
      pass: emailService.pass
    }
  });

  const mailOptions = {
    from: emailService.user,
    to: email,
    subject: 'Failed Automated Deposit',
    text: `Your automated deposit of ${amount} has failed due to insufficient funds. Please add funds to your wallet.`
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Email sent to ${email}`);
  } catch (error) {
    errorHandler(error, 'Failed to send email notification');
  }
};

const sendMobileNotification = (mobile, amount) => {

  logger.info(`Mobile notification sent to ${mobile}`);
};

const notifyUser = async (userId, amount, type, userInfo) => {
  if (type === notificationType.email) {
    await sendEmailNotification(userInfo.email, amount);
  } else if (type === notificationType.mobile) {
    sendMobileNotification(userInfo.mobile, amount);
  } else {
    logger.error('Invalid notification type');
  }
};

module.exports = { notifyUser };
