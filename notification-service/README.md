# Automated Deposit Notification System

This project consists of three microservices: User Service, Wallet Service, and Notification Service. The Notification Service is responsible for sending notifications when a user's wallet balance is insufficient for an automated deposit.

##Running the Services
To start all services, run the following command from the root directory:
 
npm start
This will start the User Service on port 4000, the Wallet Service on port 4001, and the Notification Service on port 3000.
## Table of Contents

- [Automated Deposit Notification System](#automated-deposit-notification-system)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Project Structure](#project-structure)
  - [Configuration](#configuration)
  - [Running the Services](#running-the-services)
  - [API Endpoints](#api-endpoints)
    - [User Service](#user-service)
    - [Wallet Service](#wallet-service)
    - [Notification Service](#notification-service)
  - [Testing with Postman](#testing-with-postman)
  - [Logging](#logging)
  - [Troubleshooting](#troubleshooting)
  - [License](#license)

## Prerequisites

Before running the services, ensure you have the following installed:

- Node.js (>= 14.x)
- npm (>= 6.x)

## Project Structure


## Configuration

Create a `config/config.js` file to store configuration settings such as service URLs and email service credentials:

```javascript
module.exports = {
  userServiceUrl: 'http://localhost:4000',
  walletServiceUrl: 'http://localhost:4001',
  notificationType: {
    email: 'EMAIL',
    mobile: 'MOBILE'
  },
  emailService: {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    user: process.env.EMAIL_USER || 'finsworthpro@gmail.com',
    pass: process.env.EMAIL_PASS || 'bxto xjhh nddv blpa'
  }
};
License
This project is licensed under the MIT License