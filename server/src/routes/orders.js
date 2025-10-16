import { Router } from 'express';
import { nanoid } from 'nanoid';
import { db, upsertOrder, upsertListing } from '../store/db.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.post('/', requireAuth, requireRole('buyer'), (req, res) => {
  const { items } = req.body || {};
  if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ error: 'No items' });
  const listings = db.listings.all();
  let total = 0;
  const orderItems = [];
  for (const { listingId, quantity } of items) {
    const l = listings.find(x => x.id === listingId && x.status === 'approved');
    if (!l) return res.status(400).json({ error: `Listing ${listingId} unavailable` });
    const qty = Number(quantity);
    if (qty <= 0 || qty > l.quantity) return res.status(400).json({ error: `Invalid quantity for ${l.name}` });
    total += qty * Number(l.price);
    orderItems.push({ listingId: l.id, name: l.name, price: Number(l.price), quantity: qty, farmerId: l.farmerId });
  }

  const order = {
    id: nanoid(),
    buyerId: req.user.id,
    items: orderItems,
    total,
    status: 'placed',
    createdAt: new Date().toISOString()
  };
  upsertOrder(order);

  // decrement quantities
  for (const item of orderItems) {
    const current = db.listings.all().find(l => l.id === item.listingId);
    if (current) {
      upsertListing({ ...current, quantity: current.quantity - item.quantity, updatedAt: new Date().toISOString() });
    }
  }

  res.json(order);
});

router.get('/mine/me', requireAuth, requireRole('buyer'), (req, res) => {
  const orders = db.orders.all().filter(o => o.buyerId === req.user.id);
  res.json(orders);
});

router.get('/for-my-listings/me', requireAuth, requireRole('farmer'), (req, res) => {
  const myListingIds = new Set(db.listings.all().filter(l => l.farmerId === req.user.id).map(l => l.id));
  const orders = db.orders.all().filter(o => o.items.some(it => myListingIds.has(it.listingId)));
  res.json(orders);
});

export default router;
