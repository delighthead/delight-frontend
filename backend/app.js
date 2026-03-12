const express = require('express');
const app = express();
const students = require('./routes/students');
const teachers = require('./routes/teachers');
const classes = require('./routes/classes');
const auth = require('./routes/auth');

app.use(express.json());
app.use('/api/students', students);
app.use('/api/teachers', teachers);
app.use('/api/classes', classes);
app.use('/api/auth', auth);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
