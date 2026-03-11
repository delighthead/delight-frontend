const express = require("express");
const { prisma } = require("../prisma");
const { authRequired, requireRole } = require("../middleware/auth");

const router = express.Router();

// List timetable for a class
router.get("/", authRequired, async (req, res) => {
  try {
    const { classId } = req.query;

    if (!classId) return res.status(400).json({ error: "classId is required" });

    const entries = await prisma.timetable.findMany({
      where: { classId: String(classId) },
      include: {
        subject: { select: { name: true, code: true } },
        teacher: {
          include: { user: { select: { name: true } } },
        },
      },
      orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
    });

    return res.json({ ok: true, timetable: entries });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

// ADMIN: create timetable entry
router.post("/", authRequired, requireRole("ADMIN"), async (req, res) => {
  try {
    const { classId, subjectId, teacherId, dayOfWeek, startTime, endTime, room } = req.body;

    if (!classId || !subjectId || !teacherId || !dayOfWeek || !startTime || !endTime) {
      return res.status(400).json({
        error: "classId, subjectId, teacherId, dayOfWeek, startTime, endTime are required",
      });
    }

    const entry = await prisma.timetable.create({
      data: {
        classId,
        subjectId,
        teacherId,
        dayOfWeek,
        startTime,
        endTime,
        room: room || null,
      },
      include: {
        subject: { select: { name: true } },
        teacher: { include: { user: { select: { name: true } } } },
        class: { select: { name: true } },
      },
    });

    return res.json({ ok: true, timetable: entry });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

// ADMIN: update timetable entry
router.patch("/:id", authRequired, requireRole("ADMIN"), async (req, res) => {
  try {
    const id = String(req.params.id);
    const { subjectId, teacherId, dayOfWeek, startTime, endTime, room } = req.body;

    const existing = await prisma.timetable.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: "Timetable entry not found" });

    const entry = await prisma.timetable.update({
      where: { id },
      data: {
        ...(subjectId !== undefined ? { subjectId } : {}),
        ...(teacherId !== undefined ? { teacherId } : {}),
        ...(dayOfWeek !== undefined ? { dayOfWeek } : {}),
        ...(startTime !== undefined ? { startTime } : {}),
        ...(endTime !== undefined ? { endTime } : {}),
        ...(room !== undefined ? { room } : {}),
      },
    });

    return res.json({ ok: true, timetable: entry });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

// ADMIN: delete timetable entry
router.delete("/:id", authRequired, requireRole("ADMIN"), async (req, res) => {
  try {
    const id = String(req.params.id);

    const existing = await prisma.timetable.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: "Timetable entry not found" });

    await prisma.timetable.delete({ where: { id } });

    return res.json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
