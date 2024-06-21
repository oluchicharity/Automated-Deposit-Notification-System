module.exports = {
  userServiceUrl: 'http://localhost:4000',
  walletServiceUrl: 'http://localhost:4001',
  notificationType: {
    mobile: 'MOBILE',
    email: 'EMAIL'
  },
  emailService: {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    user: process.env.EMAIL_USER || 'finsworthpro@gmail.com',
    pass: process.env.EMAIL_PASS || 'bxto xjhh nddv blpa'
  }
};
