const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all teachers
router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM Teachers');
  res.json(rows);
});

// Register a new teacher
router.post('/', async (req, res) => {
  const { FullName, Gender, Phone, Email, Subject, Address } = req.body;
  await db.query(
    'INSERT INTO Teachers (FullName, Gender, Phone, Email, Subject, Address) VALUES (?, ?, ?, ?, ?, ?)',
    [FullName, Gender, Phone, Email, Subject, Address]
  );
  res.json({ message: 'Teacher registered' });
});

module.exports = router;
