const express = require('express');
const app = express();
const port = 3000;

// Built-in middleware to parse JSON bodies
app.use(express.json());

// In-memory data store
let items = [];
let nextId = 1;

// GET /items — return all items
app.get('/items', (req, res) => {
  res.json(items);
});

// GET /items/:id — return one item
app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json(item);
});

// POST /items — add a new item
app.post('/items', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });
  const newItem = { id: nextId++, name };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT /items/:id — update an existing item
app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name } = req.body;
  const itemIndex = items.findIndex(i => i.id === id);
  if (itemIndex === -1) return res.status(404).json({ error: 'Item not found' });
  if (!name) return res.status(400).json({ error: 'Name is required' });
  items[itemIndex].name = name;
  res.json(items[itemIndex]);
});

// DELETE /items/:id — remove an item
app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const initialLength = items.length;
  items = items.filter(i => i.id !== id);
  if (items.length === initialLength) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.status(204).end();
});

// Start server
app.listen(port, () => {
  console.log(`Test API listening at http://localhost:${port}`);
});