const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');
const prisma = new PrismaClient();

// POST /api/feedback
router.post('/', auth, async (req, res) => {
  try {
    const { targetType, targetId, rating, reason } = req.body;
    if (!targetType || !targetId || rating === undefined) {
      return res.status(400).json({ error: 'targetType, targetId, and rating are required' });
    }
    const feedback = await prisma.feedback.create({
      data: { userId: req.userId, targetType, targetId, rating: parseInt(rating), reason }
    });
    res.status(201).json({ success: true, feedback });
  } catch (err) {
    res.status(500).json({ error: 'Could not save feedback' });
  }
});

module.exports = router;
