const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');
const prisma = new PrismaClient();

// POST /api/meals/log
router.post('/log', auth, async (req, res) => {
  try {
    const { name, description, mealTime } = req.body;
    if (!name) return res.status(400).json({ error: 'Meal name is required' });
    const meal = await prisma.meal.create({
      data: { userId: req.userId, name, description, mealTime: mealTime || 'lunch' }
    });
    // Update streak
    const user = await prisma.user.findUnique({ where: { id: req.userId } });
    const last = user.lastLoggedAt ? new Date(user.lastLoggedAt) : null;
    const now = new Date();
    const diffDays = last ? Math.floor((now - last) / 86400000) : null;
    const newStreak = diffDays === 1 ? user.streakCount + 1 : diffDays === 0 ? user.streakCount : 1;
    await prisma.user.update({
      where: { id: req.userId },
      data: { streakCount: newStreak, lastLoggedAt: now }
    });
    res.status(201).json({ meal, streak: newStreak });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not log meal' });
  }
});

// GET /api/meals/history
router.get('/history', auth, async (req, res) => {
  try {
    const meals = await prisma.meal.findMany({
      where: { userId: req.userId },
      orderBy: { loggedAt: 'desc' },
      take: 20
    });
    res.json(meals);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch history' });
  }
});

module.exports = router;
