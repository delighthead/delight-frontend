const express = require("express");
const { prisma } = require("../prisma");
const { authRequired, requireRole } = require("../middleware/auth");

const router = express.Router();

// TEACHER/ADMIN: list attendance for a class on a date
router.get("/", authRequired, requireRole("ADMIN", "TEACHER"), async (req, res) => {
  try {
    const { classId, date } = req.query;

    if (!classId || !date) {
      return res.status(400).json({ error: "classId and date are required" });
    }

    const records = await prisma.attendance.findMany({
      where: {
        classId: String(classId),
        date: new Date(String(date)),
      },
      include: {
        student: {
          include: { user: { select: { name: true } } },
        },
      },
      orderBy: { student: { user: { name: "asc" } } },
    });

    return res.json({ ok: true, attendance: records });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

// STUDENT: view own attendance
router.get("/me", authRequired, requireRole("STUDENT"), async (req, res) => {
  try {
    const studentProfile = await prisma.student.findUnique({ where: { userId: req.user.id } });
    if (!studentProfile) return res.status(404).json({ error: "Student profile not found" });

    const records = await prisma.attendance.findMany({
      where: { studentId: studentProfile.id },
      include: {
        class: { select: { name: true } },
      },
      orderBy: { date: "desc" },
      take: 200,
    });

    return res.json({ ok: true, attendance: records });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

// TEACHER/ADMIN: mark attendance (batch)
router.post("/", authRequired, requireRole("ADMIN", "TEACHER"), async (req, res) => {
  try {
    const { classId, date, records } = req.body;

    if (!classId || !date || !Array.isArray(records) || records.length === 0) {
      return res.status(400).json({ error: "classId, date, and records[] are required" });
    }

    const attendanceDate = new Date(date);

    const results = await prisma.$transaction(
      records.map((r) =>
        prisma.attendance.upsert({
          where: {
            studentId_classId_date: {
              studentId: r.studentId,
              classId,
              date: attendanceDate,
            },
          },
          update: {
            status: r.status,
            remarks: r.remarks || null,
          },
          create: {
            studentId: r.studentId,
            classId,
            date: attendanceDate,
            status: r.status,
            remarks: r.remarks || null,
          },
        })
      )
    );

    return res.json({ ok: true, count: results.length });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
