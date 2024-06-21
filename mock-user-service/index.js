const express = require('express');
const app = express();

app.use(express.json());

const users = {
  '1': { id: '1', name: 'John Doe', email: 'john.doe@example.com', mobile: '1234567890' },
  '2': { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', mobile: '0987654321' },
};

// GET user by ID
app.get('/users/:id', (req, res) => {
  const user = users[req.params.id];
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

// POST to update user by ID
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
