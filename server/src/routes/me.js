import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/me', requireAuth, (req, res) => {
  const { id, name, email, role, status } = req.user;
  res.json({ id, name, email, role, status });
});

export default router;
