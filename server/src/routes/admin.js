import { Router } from 'express';
import { db, upsertUser, upsertListing } from '../store/db.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth, requireRole('superadmin'));

router.get('/analytics', (req, res) => {
  const users = db.users.all();
  const listings = db.listings.all();
  const orders = db.orders.all();
  const farmers = users.filter(u => u.role === 'farmer').length;
  const buyers = users.filter(u => u.role === 'buyer').length;
  const sales = orders.length;
  const activeListings = listings.filter(l => l.status === 'approved' && l.quantity > 0).length;
  res.json({ farmers, buyers, sales, activeListings });
});

router.get('/users', (req, res) => {
  const users = db.users.all().map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role, status: u.status, createdAt: u.createdAt }));
  res.json(users);
});

router.post('/users/:id/approve', (req, res) => {
  const users = db.users.all();
  const u = users.find(x => x.id === req.params.id);
  if (!u) return res.status(404).json({ error: 'Not found' });
  u.status = 'approved';
  upsertUser(u);
  res.json(u);
});

router.post('/users/:id/reject', (req, res) => {
  const users = db.users.all();
  const u = users.find(x => x.id === req.params.id);
  if (!u) return res.status(404).json({ error: 'Not found' });
  u.status = 'rejected';
  upsertUser(u);
  res.json(u);
});

router.delete('/users/:id', (req, res) => {
  const users = db.users.all();
  const next = users.filter(x => x.id !== req.params.id);
  db.users.save(next);
  res.json({ ok: true });
});

router.get('/listings', (req, res) => {
  res.json(db.listings.all());
});

router.post('/listings/:id/approve', (req, res) => {
  const listings = db.listings.all();
  const l = listings.find(x => x.id === req.params.id);
  if (!l) return res.status(404).json({ error: 'Not found' });
  l.status = 'approved';
  upsertListing(l);
  res.json(l);
});

router.post('/listings/:id/reject', (req, res) => {
  const listings = db.listings.all();
  const l = listings.find(x => x.id === req.params.id);
  if (!l) return res.status(404).json({ error: 'Not found' });
  l.status = 'rejected';
  upsertListing(l);
  res.json(l);
});

router.delete('/listings/:id', (req, res) => {
  const listings = db.listings.all();
  const next = listings.filter(x => x.id !== req.params.id);
  db.listings.save(next);
  res.json({ ok: true });
});

export default router;
