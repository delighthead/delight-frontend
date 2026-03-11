const express = require("express");
const { prisma } = require("../prisma");
const { authRequired, requireRole } = require("../middleware/auth");

const router = express.Router();

// ADMIN: list all teachers
router.get("/", authRequired, requireRole("ADMIN"), async (req, res) => {
  try {
    const teachers = await prisma.teacher.findMany({
      include: {
        user: { select: { id: true, name: true, email: true, phone: true } },
        subjects: { select: { id: true, name: true, code: true } },
        classes: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 200,
    });

    return res.json({ ok: true, teachers });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

// Get single teacher
router.get("/:id", authRequired, async (req, res) => {
  try {
    const id = String(req.params.id);

    const teacher = await prisma.teacher.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true, phone: true } },
        subjects: { select: { id: true, name: true, code: true } },
        classes: { select: { id: true, name: true } },
      },
    });

    if (!teacher) return res.status(404).json({ error: "Teacher not found" });
    return res.json({ ok: true, teacher });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

// ADMIN: create teacher profile
router.post("/", authRequired, requireRole("ADMIN"), async (req, res) => {
  try {
    const { userId, employeeId, qualification, gender, address } = req.body;

    if (!userId || !employeeId) {
      return res.status(400).json({ error: "userId and employeeId are required" });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.role !== "TEACHER") {
      return res.status(400).json({ error: "User not found or not a TEACHER" });
    }

    const existing = await prisma.teacher.findUnique({ where: { userId } });
    if (existing) return res.status(409).json({ error: "Teacher profile already exists" });

    const teacher = await prisma.teacher.create({
      data: {
        userId,
        employeeId,
        qualification: qualification || null,
        gender: gender || null,
        address: address || null,
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
    });

    return res.json({ ok: true, teacher });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

// ADMIN: update teacher
router.patch("/:id", authRequired, requireRole("ADMIN"), async (req, res) => {
  try {
    const id = String(req.params.id);
    const { employeeId, qualification, gender, address } = req.body;

    const existing = await prisma.teacher.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: "Teacher not found" });

    const teacher = await prisma.teacher.update({
      where: { id },
      data: {
        ...(employeeId !== undefined ? { employeeId } : {}),
        ...(qualification !== undefined ? { qualification } : {}),
        ...(gender !== undefined ? { gender } : {}),
        ...(address !== undefined ? { address } : {}),
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
    });

    return res.json({ ok: true, teacher });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

// ADMIN: delete teacher
router.delete("/:id", authRequired, requireRole("ADMIN"), async (req, res) => {
  try {
    const id = String(req.params.id);

    const existing = await prisma.teacher.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: "Teacher not found" });

    await prisma.teacher.delete({ where: { id } });

    return res.json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
