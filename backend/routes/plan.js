const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');
const mockAI = require('../services/mockAI');
const prisma = new PrismaClient();

// POST /api/plan/generate
router.post('/generate', auth, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.userId } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const recentMeals = await prisma.meal.findMany({
      where: { userId: req.userId },
      orderBy: { loggedAt: 'desc' },
      take: 10
    });

    const plan = await mockAI.generateMealPlan(user, recentMeals);

    await prisma.mealPlan.create({
      data: {
        userId: req.userId,
        weekStart: plan.week_start,
        language: plan.language,
        planData: JSON.stringify(plan)
      }
    });

    res.json(plan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not generate meal plan' });
  }
});

// GET /api/plan/current
router.get('/current', auth, async (req, res) => {
  try {
    const latest = await prisma.mealPlan.findFirst({
      where: { userId: req.userId },
      orderBy: { createdAt: 'desc' }
    });
    if (!latest) return res.status(404).json({ error: 'No meal plan found. Generate one first!' });
    res.json(JSON.parse(latest.planData));
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch plan' });
  }
});

module.exports = router;
