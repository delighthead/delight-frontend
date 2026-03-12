const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all classes
router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM Classes');
  res.json(rows);
});

// Register a new class
router.post('/', async (req, res) => {
  const { Name, TeacherID } = req.body;
  await db.query(
    'INSERT INTO Classes (Name, TeacherID) VALUES (?, ?)',
    [Name, TeacherID]
  );
  res.json({ message: 'Class registered' });
});

module.exports = router;
