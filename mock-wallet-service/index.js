const express = require('express');
const app = express();

app.use(express.json());

const wallets = {
  '1': { userId: '1', balance: 50 },
  '2': { userId: '2', balance: 150 },
};

app.get('/wallet/:userId', (req, res) => {
  const wallet = wallets[req.params.userId];
  if (wallet) {
    res.json(wallet);
  } else {
    res.status(404).send('Wallet not found');
  }
});

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Wallet Service running on port ${PORT}`);
});
