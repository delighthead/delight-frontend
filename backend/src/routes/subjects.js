const express = require("express");
const { prisma } = require("../prisma");
const { authRequired, requireRole } = require("../middleware/auth");

const router = express.Router();

// List all subjects
router.get("/", authRequired, async (req, res) => {
  try {
    const subjects = await prisma.subject.findMany({
      include: {
        teacher: {
          include: { user: { select: { name: true } } },
        },
      },
      orderBy: { name: "asc" },
    });

    return res.json({ ok: true, subjects });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

// Get single subject
router.get("/:id", authRequired, async (req, res) => {
  try {
    const id = String(req.params.id);

    const subject = await prisma.subject.findUnique({
      where: { id },
      include: {
        teacher: {
          include: { user: { select: { name: true, email: true } } },
        },
      },
    });

    if (!subject) return res.status(404).json({ error: "Subject not found" });
    return res.json({ ok: true, subject });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

// ADMIN: create subject
router.post("/", authRequired, requireRole("ADMIN"), async (req, res) => {
  try {
    const { name, code, teacherId } = req.body;

    if (!name || !code) return res.status(400).json({ error: "name and code are required" });

    const subject = await prisma.subject.create({
      data: {
        name,
        code,
        teacherId: teacherId || null,
      },
    });

    return res.json({ ok: true, subject });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

// ADMIN: update subject
router.patch("/:id", authRequired, requireRole("ADMIN"), async (req, res) => {
  try {
    const id = String(req.params.id);
    const { name, code, teacherId } = req.body;

    const existing = await prisma.subject.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: "Subject not found" });

    const subject = await prisma.subject.update({
      where: { id },
      data: {
        ...(name !== undefined ? { name } : {}),
        ...(code !== undefined ? { code } : {}),
        ...(teacherId !== undefined ? { teacherId } : {}),
      },
    });

    return res.json({ ok: true, subject });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

// ADMIN: delete subject
router.delete("/:id", authRequired, requireRole("ADMIN"), async (req, res) => {
  try {
    const id = String(req.params.id);

    const existing = await prisma.subject.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: "Subject not found" });

    await prisma.subject.delete({ where: { id } });

    return res.json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
