require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/students");
const teacherRoutes = require("./routes/teachers");
const classRoutes = require("./routes/classes");
const subjectRoutes = require("./routes/subjects");
const attendanceRoutes = require("./routes/attendance");
const gradeRoutes = require("./routes/grades");
const timetableRoutes = require("./routes/timetable");
const feeRoutes = require("./routes/fees");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true, name: "School Management API" }));

app.use("/auth", authRoutes);
app.use("/students", studentRoutes);
app.use("/teachers", teacherRoutes);
app.use("/classes", classRoutes);
app.use("/subjects", subjectRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/grades", gradeRoutes);
app.use("/timetable", timetableRoutes);
app.use("/fees", feeRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
