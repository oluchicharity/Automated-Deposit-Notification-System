const logger = require('./logger');

const errorHandler = (error, message) => {
  logger.error(`${message}: ${error.message}`);
  throw new Error(message);
};

module.exports = errorHandler;
