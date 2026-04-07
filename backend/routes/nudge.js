const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');
const mockAI = require('../services/mockAI');
const prisma = new PrismaClient();

// GET /api/nudge/daily
router.get('/daily', auth, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.userId } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    const nudge = await mockAI.generateNudge(user);
    res.json(nudge);
  } catch (err) {
    res.status(500).json({ error: 'Could not generate nudge' });
  }
});

module.exports = router;
