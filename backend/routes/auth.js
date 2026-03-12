const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

// Register user
router.post('/register', async (req, res) => {
  const { Username, Password, Role, Email } = req.body;
  const hash = await bcrypt.hash(Password, 10);
  await db.query(
    'INSERT INTO Users (Username, PasswordHash, Role, Email) VALUES (?, ?, ?, ?)',
    [Username, hash, Role, Email]
  );
  res.json({ message: 'User registered' });
});

// Login user
router.post('/login', async (req, res) => {
  const { Username, Password } = req.body;
  const [rows] = await db.query('SELECT * FROM Users WHERE Username = ?', [Username]);
  if (rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
  const user = rows[0];
  const ok = await bcrypt.compare(Password, user.PasswordHash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  // For demo: return user info (add JWT for production)
  res.json({ message: 'Login successful', user });
});

module.exports = router;
