import { Router } from 'express';
import { nanoid } from 'nanoid';
import multer from 'multer';
import { db, upsertListing, removeListing } from '../store/db.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { filterListings } from '../utils/filters.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', (req, res) => {
  const all = db.listings.all();
  const filtered = filterListings(all, {
    search: req.query.search,
    category: req.query.category,
    minPrice: req.query.minPrice,
    maxPrice: req.query.maxPrice,
    location: req.query.location,
    onlyApproved: true
  });
  res.json(filtered);
});

router.get('/:id', (req, res) => {
  const listing = db.listings.all().find(l => l.id === req.params.id);
  if (!listing || listing.status !== 'approved') return res.status(404).json({ error: 'Not found' });
  res.json(listing);
});

router.post('/', requireAuth, requireRole('farmer'), upload.array('images', 5), (req, res) => {
  const { name, category, quantity, price, location, description } = req.body || {};
  if (!name || !category || !quantity || !price || !location) return res.status(400).json({ error: 'Missing fields' });
  const images = (req.files || []).map(f => `data:${f.mimetype};base64,${f.buffer.toString('base64')}`);
  const listing = {
    id: nanoid(),
    farmerId: req.user.id,
    name,
    category,
    quantity: Number(quantity),
    price: Number(price),
    location,
    description: description || '',
    images,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  upsertListing(listing);
  res.json({ message: 'Listing submitted for approval', listing });
});

router.put('/:id', requireAuth, requireRole('farmer'), upload.array('images', 5), (req, res) => {
  const listings = db.listings.all();
  const existing = listings.find(l => l.id === req.params.id && l.farmerId === req.user.id);
  if (!existing) return res.status(404).json({ error: 'Not found' });
  const { name, category, quantity, price, location, description, status } = req.body || {};
  const images = (req.files || []).length > 0 ? (req.files || []).map(f => `data:${f.mimetype};base64,${f.buffer.toString('base64')}`) : existing.images;
  const updated = {
    ...existing,
    name: name ?? existing.name,
    category: category ?? existing.category,
    quantity: quantity != null ? Number(quantity) : existing.quantity,
    price: price != null ? Number(price) : existing.price,
    location: location ?? existing.location,
    description: description ?? existing.description,
    images,
    status: status && ['pending','approved','rejected'].includes(status) ? status : existing.status,
    updatedAt: new Date().toISOString()
  };
  upsertListing(updated);
  res.json(updated);
});

router.delete('/:id', requireAuth, requireRole('farmer', 'superadmin'), (req, res) => {
  const listings = db.listings.all();
  const item = listings.find(l => l.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  if (req.user.role !== 'superadmin' && item.farmerId !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
  removeListing(item.id);
  res.json({ ok: true });
});

router.get('/mine/me', requireAuth, requireRole('farmer'), (req, res) => {
  const mine = db.listings.all().filter(l => l.farmerId === req.user.id);
  res.json(mine);
});

export default router;
