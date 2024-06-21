const axios = require('axios');
const { userServiceUrl } = require('../../config/config');
const errorHandler = require('../utils/errorHandler');

const fetchUserInfo = async (userId) => {
  try {
    const response = await axios.get(`${userServiceUrl}/users/${userId}`);
    return response.data;
  } catch (error) {
    errorHandler(error, 'Failed to fetch user information');
  }
};

module.exports = { fetchUserInfo };
