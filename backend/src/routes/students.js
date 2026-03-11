const express = require("express");
const { prisma } = require("../prisma");
const { authRequired, requireRole } = require("../middleware/auth");

const router = express.Router();

// ADMIN: list all students
router.get("/", authRequired, requireRole("ADMIN", "TEACHER"), async (req, res) => {
  try {
    const { classId, q } = req.query;

    const students = await prisma.student.findMany({
      where: {
        ...(classId ? { classId: String(classId) } : {}),
        ...(q
          ? {
              OR: [
                { admissionNo: { contains: String(q), mode: "insensitive" } },
                { user: { name: { contains: String(q), mode: "insensitive" } } },
              ],
            }
          : {}),
      },
      include: {
        user: { select: { id: true, name: true, email: true, phone: true } },
        class: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 200,
    });

    return res.json({ ok: true, students });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

// Get single student
router.get("/:id", authRequired, async (req, res) => {
  try {
    const id = String(req.params.id);

    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true, phone: true } },
        class: { select: { id: true, name: true } },
        parent: { include: { user: { select: { name: true, phone: true, email: true } } } },
      },
    });

    if (!student) return res.status(404).json({ error: "Student not found" });

    // Students can only view their own profile
    if (req.user.role === "STUDENT") {
      const ownProfile = await prisma.student.findUnique({ where: { userId: req.user.id } });
      if (!ownProfile || ownProfile.id !== id) {
        return res.status(403).json({ error: "Not allowed" });
      }
    }

    return res.json({ ok: true, student });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

// ADMIN: create student profile (user must already exist with STUDENT role)
router.post("/", authRequired, requireRole("ADMIN", "TEACHER"), async (req, res) => {
  try {
    const { userId, admissionNo, dateOfBirth, gender, address, classId, parentId } = req.body;

    if (!userId || !admissionNo) {
      return res.status(400).json({ error: "userId and admissionNo are required" });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.role !== "STUDENT") {
      return res.status(400).json({ error: "User not found or not a STUDENT" });
    }

    const existing = await prisma.student.findUnique({ where: { userId } });
    if (existing) return res.status(409).json({ error: "Student profile already exists" });

    const student = await prisma.student.create({
      data: {
        userId,
        admissionNo,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        gender: gender || null,
        address: address || null,
        classId: classId || null,
        parentId: parentId || null,
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
        class: { select: { id: true, name: true } },
      },
    });

    return res.json({ ok: true, student });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

// ADMIN: update student
router.patch("/:id", authRequired, requireRole("ADMIN"), async (req, res) => {
  try {
    const id = String(req.params.id);
    const { admissionNo, dateOfBirth, gender, address, classId, parentId } = req.body;

    const existing = await prisma.student.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: "Student not found" });

    const student = await prisma.student.update({
      where: { id },
      data: {
        ...(admissionNo !== undefined ? { admissionNo } : {}),
        ...(dateOfBirth !== undefined ? { dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null } : {}),
        ...(gender !== undefined ? { gender } : {}),
        ...(address !== undefined ? { address } : {}),
        ...(classId !== undefined ? { classId } : {}),
        ...(parentId !== undefined ? { parentId } : {}),
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
        class: { select: { id: true, name: true } },
      },
    });

    return res.json({ ok: true, student });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

// ADMIN: delete student profile
router.delete("/:id", authRequired, requireRole("ADMIN"), async (req, res) => {
  try {
    const id = String(req.params.id);

    const existing = await prisma.student.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: "Student not found" });

    await prisma.student.delete({ where: { id } });

    return res.json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
