const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');
const prisma = new PrismaClient();

// GET /api/user/profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.userId } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    const { password, ...safe } = user;
    safe.allergies = JSON.parse(safe.allergies || '[]');
    res.json(safe);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch profile' });
  }
});

// PUT /api/user/profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, age, condition, language, trimester, foodPreference, allergies } = req.body;
    const updated = await prisma.user.update({
      where: { id: req.userId },
      data: {
        ...(name && { name }),
        ...(age && { age: parseInt(age) }),
        ...(condition && { condition }),
        ...(language && { language }),
        ...(trimester !== undefined && { trimester: trimester ? parseInt(trimester) : null }),
        ...(foodPreference && { foodPreference }),
        ...(allergies && { allergies: JSON.stringify(allergies) }),
      }
    });
    const { password, ...safe } = updated;
    safe.allergies = JSON.parse(safe.allergies || '[]');
    res.json(safe);
  } catch (err) {
    res.status(500).json({ error: 'Could not update profile' });
  }
});

module.exports = router;
