import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.resolve(__dirname, '../../data');

const files = {
  users: path.join(dataDir, 'users.json'),
  listings: path.join(dataDir, 'listings.json'),
  orders: path.join(dataDir, 'orders.json')
};

export function ensureDataFiles() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  for (const file of Object.values(files)) {
    if (!fs.existsSync(file)) fs.writeFileSync(file, '[]');
  }
}

function read(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  try { return JSON.parse(raw || '[]'); } catch { return []; }
}

function write(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export const db = {
  users: {
    all: () => read(files.users),
    save: (rows) => write(files.users, rows)
  },
  listings: {
    all: () => read(files.listings),
    save: (rows) => write(files.listings, rows)
  },
  orders: {
    all: () => read(files.orders),
    save: (rows) => write(files.orders, rows)
  }
};

export async function seedDefaultSuperadmin() {
  const users = db.users.all();
  const hasSuperadmin = users.some(u => u.role === 'superadmin');
  if (!hasSuperadmin) {
    const passwordHash = await bcrypt.hash('admin123', 10);
    const admin = {
      id: nanoid(),
      name: 'Super Admin',
      email: 'admin@local',
      passwordHash,
      role: 'superadmin',
      status: 'approved',
      createdAt: new Date().toISOString()
    };
    users.push(admin);
    db.users.save(users);
    console.log('Seeded default superadmin: admin@local / admin123');
  }
}

export function findUserByEmail(email) {
  return db.users.all().find(u => u.email.toLowerCase() === String(email).toLowerCase());
}

export function findUserById(id) {
  return db.users.all().find(u => u.id === id);
}

export function upsertUser(user) {
  const users = db.users.all();
  const idx = users.findIndex(u => u.id === user.id);
  if (idx >= 0) users[idx] = user; else users.push(user);
  db.users.save(users);
  return user;
}

export function upsertListing(listing) {
  const listings = db.listings.all();
  const idx = listings.findIndex(l => l.id === listing.id);
  if (idx >= 0) listings[idx] = listing; else listings.push(listing);
  db.listings.save(listings);
  return listing;
}

export function removeListing(id) {
  const listings = db.listings.all();
  const next = listings.filter(l => l.id !== id);
  db.listings.save(next);
}

export function upsertOrder(order) {
  const orders = db.orders.all();
  const idx = orders.findIndex(o => o.id === order.id);
  if (idx >= 0) orders[idx] = order; else orders.push(order);
  db.orders.save(orders);
  return order;
}
