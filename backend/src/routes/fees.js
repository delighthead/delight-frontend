const express = require("express");
const { prisma } = require("../prisma");
const { authRequired, requireRole } = require("../middleware/auth");

const router = express.Router();

// ADMIN: list all fee records (with optional filters)
router.get("/", authRequired, requireRole("ADMIN"), async (req, res) => {
  try {
    const { studentId, status, academicYear } = req.query;

    const fees = await prisma.feePayment.findMany({
      where: {
        ...(studentId ? { studentId: String(studentId) } : {}),
        ...(status ? { status: String(status) } : {}),
        ...(academicYear ? { academicYear: String(academicYear) } : {}),
      },
      include: {
        student: {
          include: { user: { select: { name: true } } },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 500,
    });

    return res.json({ ok: true, fees });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

// STUDENT: view own fees
router.get("/me", authRequired, requireRole("STUDENT"), async (req, res) => {
  try {
    const studentProfile = await prisma.student.findUnique({ where: { userId: req.user.id } });
    if (!studentProfile) return res.status(404).json({ error: "Student profile not found" });

    const fees = await prisma.feePayment.findMany({
      where: { studentId: studentProfile.id },
      orderBy: { createdAt: "desc" },
    });

    return res.json({ ok: true, fees });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

// PARENT: view children's fees
router.get("/children", authRequired, requireRole("PARENT"), async (req, res) => {
  try {
    const parentProfile = await prisma.parent.findUnique({
      where: { userId: req.user.id },
      include: { children: { select: { id: true } } },
    });
    if (!parentProfile) return res.status(404).json({ error: "Parent profile not found" });

    const childIds = parentProfile.children.map((c) => c.id);

    const fees = await prisma.feePayment.findMany({
      where: { studentId: { in: childIds } },
      include: {
        student: {
          include: { user: { select: { name: true } } },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return res.json({ ok: true, fees });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

// ADMIN: create fee record
router.post("/", authRequired, requireRole("ADMIN"), async (req, res) => {
  try {
    const { studentId, amount, feeType, academicYear, term, dueDate, remarks } = req.body;

    if (!studentId || !amount || !feeType || !academicYear || !term) {
      return res.status(400).json({ error: "studentId, amount, feeType, academicYear, term are required" });
    }

    const fee = await prisma.feePayment.create({
      data: {
        studentId,
        amount,
        feeType,
        academicYear,
        term,
        dueDate: dueDate ? new Date(dueDate) : null,
        remarks: remarks || null,
      },
      include: {
        student: { include: { user: { select: { name: true } } } },
      },
    });

    return res.json({ ok: true, fee });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

// ADMIN: record payment
router.patch("/:id/pay", authRequired, requireRole("ADMIN"), async (req, res) => {
  try {
    const id = String(req.params.id);
    const { amountPaid } = req.body;

    if (!amountPaid) return res.status(400).json({ error: "amountPaid is required" });

    const existing = await prisma.feePayment.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: "Fee record not found" });

    const newPaid = Number(existing.amountPaid) + Number(amountPaid);
    const totalAmount = Number(existing.amount);

    let status = "PARTIAL";
    if (newPaid >= totalAmount) status = "PAID";

    const fee = await prisma.feePayment.update({
      where: { id },
      data: {
        amountPaid: String(newPaid),
        status,
        paidAt: status === "PAID" ? new Date() : null,
      },
    });

    return res.json({ ok: true, fee });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

// ADMIN: delete fee record
router.delete("/:id", authRequired, requireRole("ADMIN"), async (req, res) => {
  try {
    const id = String(req.params.id);

    const existing = await prisma.feePayment.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: "Fee record not found" });

    await prisma.feePayment.delete({ where: { id } });

    return res.json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
