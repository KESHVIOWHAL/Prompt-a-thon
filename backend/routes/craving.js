const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');
const mockAI = require('../services/mockAI');
const prisma = new PrismaClient();

// POST /api/craving
router.post('/', auth, async (req, res) => {
  try {
    const { craving } = req.body;
    if (!craving) return res.status(400).json({ error: 'Craving input is required' });

    const user = await prisma.user.findUnique({ where: { id: req.userId } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const recentMeals = await prisma.meal.findMany({
      where: { userId: req.userId },
      orderBy: { loggedAt: 'desc' },
      take: 5
    });

    const result = await mockAI.processCraving(craving, user, recentMeals);

    await prisma.craving.create({
      data: {
        userId: req.userId,
        input: craving,
        response: JSON.stringify(result)
      }
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not process craving' });
  }
});

module.exports = router;
