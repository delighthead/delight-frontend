const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all students
router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM Students');
  res.json(rows);
});

// Register a new student
router.post('/', async (req, res) => {
  const { FirstName, Surname, OtherName, Gender, DateOfBirth, ClassID, ParentID, Contact, Address, Picture } = req.body;
  await db.query(
    'INSERT INTO Students (FirstName, Surname, OtherName, Gender, DateOfBirth, ClassID, ParentID, Contact, Address, Picture) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [FirstName, Surname, OtherName, Gender, DateOfBirth, ClassID, ParentID, Contact, Address, Picture]
  );
  res.json({ message: 'Student registered' });
});

module.exports = router;
