import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import cors from 'cors';
import customerRoutes from './routes/customers';
import { getDb } from './db';

const PORT = 3000;

async function startServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Routes
  app.use('/api/customers', customerRoutes);

  app.get('/api/stats', async (req, res) => {
    try {
      const db = await getDb();
      const customers = db.data.customers;
      
      const stats = {
        total: customers.length,
        new_lead: customers.filter(c => c.status === 'new_lead').length,
        contacted: customers.filter(c => c.status === 'contacted').length,
        interested: customers.filter(c => c.status === 'interested').length,
        converted: customers.filter(c => c.status === 'converted').length,
        lost: customers.filter(c => c.status === 'lost').length,
        thisWeek: customers.filter(c => {
          const created = new Date(c.created_at);
          const now = new Date();
          const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return created >= oneWeekAgo;
        }).length
      };
      
      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Holter CRM running on http://localhost:${PORT}`);
  });
}

startServer();
