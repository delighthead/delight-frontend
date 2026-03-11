const express = require("express");
const { prisma } = require("../prisma");
const { authRequired, requireRole } = require("../middleware/auth");

const router = express.Router();

// TEACHER/ADMIN: list grades by subject + class
router.get("/", authRequired, requireRole("ADMIN", "TEACHER"), async (req, res) => {
  try {
    const { subjectId, academicYear, term } = req.query;

    const grades = await prisma.grade.findMany({
      where: {
        ...(subjectId ? { subjectId: String(subjectId) } : {}),
        ...(academicYear ? { academicYear: String(academicYear) } : {}),
        ...(term ? { term: String(term) } : {}),
      },
      include: {
        student: {
          include: { user: { select: { name: true } } },
        },
        subject: { select: { name: true, code: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 500,
    });

    return res.json({ ok: true, grades });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

// STUDENT: view own grades
router.get("/me", authRequired, requireRole("STUDENT"), async (req, res) => {
  try {
    const studentProfile = await prisma.student.findUnique({ where: { userId: req.user.id } });
    if (!studentProfile) return res.status(404).json({ error: "Student profile not found" });

    const grades = await prisma.grade.findMany({
      where: { studentId: studentProfile.id },
      include: {
        subject: { select: { name: true, code: true } },
      },
      orderBy: [{ academicYear: "desc" }, { term: "desc" }],
    });

    return res.json({ ok: true, grades });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

// TEACHER/ADMIN: add grade
router.post("/", authRequired, requireRole("ADMIN", "TEACHER"), async (req, res) => {
  try {
    const { studentId, subjectId, examType, score, maxScore, grade, academicYear, term, remarks } = req.body;

    if (!studentId || !subjectId || !examType || score === undefined || maxScore === undefined || !academicYear || !term) {
      return res.status(400).json({ error: "studentId, subjectId, examType, score, maxScore, academicYear, term are required" });
    }

    const entry = await prisma.grade.create({
      data: {
        studentId,
        subjectId,
        examType,
        score,
        maxScore,
        grade: grade || null,
        academicYear,
        term,
        remarks: remarks || null,
      },
      include: {
        student: { include: { user: { select: { name: true } } } },
        subject: { select: { name: true } },
      },
    });

    return res.json({ ok: true, grade: entry });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

// TEACHER/ADMIN: update grade
router.patch("/:id", authRequired, requireRole("ADMIN", "TEACHER"), async (req, res) => {
  try {
    const id = String(req.params.id);
    const { score, maxScore, grade, remarks } = req.body;

    const existing = await prisma.grade.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: "Grade not found" });

    const updated = await prisma.grade.update({
      where: { id },
      data: {
        ...(score !== undefined ? { score } : {}),
        ...(maxScore !== undefined ? { maxScore } : {}),
        ...(grade !== undefined ? { grade } : {}),
        ...(remarks !== undefined ? { remarks } : {}),
      },
    });

    return res.json({ ok: true, grade: updated });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

// ADMIN: delete grade
router.delete("/:id", authRequired, requireRole("ADMIN"), async (req, res) => {
  try {
    const id = String(req.params.id);

    const existing = await prisma.grade.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: "Grade not found" });

    await prisma.grade.delete({ where: { id } });

    return res.json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
