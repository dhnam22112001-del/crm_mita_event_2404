import { Router } from 'express';
import { getDb, Customer } from '../db';

const router = Router();

// List all customers
router.get('/', async (req, res) => {
  try {
    const db = await getDb();
    let customers = [...db.data.customers];
    
    const { search, status } = req.query;
    
    if (search) {
      const q = String(search).toLowerCase();
      customers = customers.filter(c => 
        c.full_name.toLowerCase().includes(q) || 
        c.email.toLowerCase().includes(q) || 
        c.phone.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q)
      );
    }
    
    if (status) {
      customers = customers.filter(c => c.status === status);
    }
    
    // Sort by created_at desc
    customers.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    
    res.json(customers);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create customer
router.post('/', async (req, res) => {
  try {
    const { full_name, phone, email, company, position, status, tags, notes, source } = req.body;
    
    if (!full_name) {
      return res.status(400).json({ error: "full_name is required" });
    }
    
    const db = await getDb();
    const now = new Date().toISOString();
    
    const newCustomer: Customer = {
      id: db.data.nextId++,
      full_name,
      phone: phone || '',
      email: email || '',
      company: company || '',
      position: position || '',
      status: status || 'new_lead',
      tags: tags || '',
      notes: notes || '',
      source: source || 'Event - Holter Launch',
      created_at: now,
      updated_at: now
    };
    
    db.data.customers.push(newCustomer);
    await db.write();
    
    res.status(201).json({ success: true, customer: newCustomer });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update customer
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updates = req.body;
    
    const db = await getDb();
    const index = db.data.customers.findIndex(c => c.id === id);
    
    if (index === -1) {
      return res.status(404).json({ error: "Customer not found" });
    }
    
    const now = new Date().toISOString();
    db.data.customers[index] = {
      ...db.data.customers[index],
      ...updates,
      id, // ensure ID doesn't change
      updated_at: now
    };
    
    await db.write();
    res.json({ success: true, customer: db.data.customers[index] });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete customer
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const db = await getDb();
    
    const initialLength = db.data.customers.length;
    db.data.customers = db.data.customers.filter(c => c.id !== id);
    
    if (db.data.customers.length === initialLength) {
      return res.status(404).json({ error: "Customer not found" });
    }
    
    await db.write();
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
