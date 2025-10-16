import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import { db, findUserByEmail, upsertUser } from '../store/db.js';
import { signToken } from '../middleware/auth.js';

const router = Router();

router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body || {};
  if (!name || !email || !password || !role) return res.status(400).json({ error: 'Missing fields' });
  if (!['farmer', 'buyer'].includes(role)) return res.status(400).json({ error: 'Invalid role' });
  if (findUserByEmail(email)) return res.status(400).json({ error: 'Email already registered' });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    id: nanoid(),
    name,
    email,
    passwordHash,
    role,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  upsertUser(user);
  res.json({ message: 'Registered. Await approval by admin.' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  const user = findUserByEmail(email);
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash || '');
  if (!ok) return res.status(400).json({ error: 'Invalid credentials' });
  if (user.role !== 'superadmin' && user.status !== 'approved') {
    return res.status(403).json({ error: 'Account not approved' });
  }
  const token = signToken(user);
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, status: user.status } });
});

export default router;
