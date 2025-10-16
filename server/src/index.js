import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authRouter from './routes/auth.js';
import listingsRouter from './routes/listings.js';
import ordersRouter from './routes/orders.js';
import adminRouter from './routes/admin.js';
import meRouter from './routes/me.js';
import { ensureDataFiles, seedDefaultSuperadmin } from './store/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: '2mb' }));

ensureDataFiles();
await seedDefaultSuperadmin();

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.use('/api/auth', authRouter);
app.use('/api/listings', listingsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/admin', adminRouter);
app.use('/api', meRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
