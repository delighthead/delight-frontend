const express = require("express");
const { prisma } = require("../prisma");
const { authRequired, requireRole } = require("../middleware/auth");

const router = express.Router();

// List all classes
router.get("/", authRequired, async (req, res) => {
  try {
    const classes = await prisma.class.findMany({
      include: {
        teacher: {
          include: { user: { select: { name: true } } },
        },
        _count: { select: { students: true } },
      },
      orderBy: { name: "asc" },
    });

    return res.json({ ok: true, classes });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

// Get single class with students
router.get("/:id", authRequired, async (req, res) => {
  try {
    const id = String(req.params.id);

    const cls = await prisma.class.findUnique({
      where: { id },
      include: {
        teacher: {
          include: { user: { select: { name: true, email: true } } },
        },
        students: {
          include: { user: { select: { name: true, email: true } } },
        },
      },
    });

    if (!cls) return res.status(404).json({ error: "Class not found" });
    return res.json({ ok: true, class: cls });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

// ADMIN: create class
router.post("/", authRequired, requireRole("ADMIN"), async (req, res) => {
  try {
    const { name, section, teacherId } = req.body;

    if (!name) return res.status(400).json({ error: "name is required" });

    const cls = await prisma.class.create({
      data: {
        name,
        section: section || null,
        teacherId: teacherId || null,
      },
    });

    return res.json({ ok: true, class: cls });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

// ADMIN: update class
router.patch("/:id", authRequired, requireRole("ADMIN"), async (req, res) => {
  try {
    const id = String(req.params.id);
    const { name, section, teacherId } = req.body;

    const existing = await prisma.class.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: "Class not found" });

    const cls = await prisma.class.update({
      where: { id },
      data: {
        ...(name !== undefined ? { name } : {}),
        ...(section !== undefined ? { section } : {}),
        ...(teacherId !== undefined ? { teacherId } : {}),
      },
    });

    return res.json({ ok: true, class: cls });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

// ADMIN: delete class
router.delete("/:id", authRequired, requireRole("ADMIN"), async (req, res) => {
  try {
    const id = String(req.params.id);

    const existing = await prisma.class.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: "Class not found" });

    await prisma.class.delete({ where: { id } });

    return res.json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
