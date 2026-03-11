const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { prisma } = require("../prisma");

const router = express.Router();

const VALID_ROLES = ["ADMIN", "TEACHER", "STUDENT", "PARENT"];

// Registration endpoint removed. Accounts must be created by admin only.

router.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password) return res.status(400).json({ error: "identifier and password required" });

    // Allow login with email, name, or phone
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { name: identifier },
          { phone: identifier }
        ]
      }
    });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      ok: true,
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
