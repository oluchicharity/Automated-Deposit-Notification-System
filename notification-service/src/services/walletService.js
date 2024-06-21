const axios = require('axios');
const { walletServiceUrl } = require('../../config/config');
const errorHandler = require('../utils/errorHandler');

const checkWalletBalance = async (userId) => {
  try {
    const response = await axios.get(`${walletServiceUrl}/wallets/${userId}/balance`);
    return response.data.balance;
  } catch (error) {
    errorHandler(error, 'Failed to check wallet balance');
  }
};

module.exports = { checkWalletBalance };
