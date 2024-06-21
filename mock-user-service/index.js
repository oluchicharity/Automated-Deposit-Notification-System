const express = require('express');
const app = express();

app.use(express.json());

const users = {
  '1': { id: '1', name: 'John', email: 'john@gmail.com', mobile: '0704567890' },
  '2': { id: '2', name: 'Jane', email: 'jane@mail.com', mobile: '09087654321' },
};

app.get('/users/:id', (req, res) => {
  const user = users[req.params.id];
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

app.post('/users/:id', (req, res) => {
  const userId = req.params.id;
  const newUserData = req.body;
  
  if (users[userId]) {
    users[userId] = { ...users[userId], ...newUserData };
    res.json(users[userId]);
  } else {
    res.status(404).send('User not found');
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});
