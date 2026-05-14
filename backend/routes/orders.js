const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET alle bestellingen
router.get('/', (req, res) => {
  const orders = db.prepare('SELECT * FROM orders').all();
  res.json(orders);
});

// POST nieuwe bestelling aanmaken
router.post('/', (req, res) => {
  const { technicianName, deliveryDate, items } = req.body;

  if (!technicianName) {
    return res.status(400).json({ error: 'Naam technieker is verplicht.' });
  }

  if (!deliveryDate) {
    return res.status(400).json({ error: 'Leverdatum is verplicht.' });
  }

  const today = new Date().toISOString().split('T')[0];
  if (deliveryDate <= today) {
    return res.status(400).json({ error: 'Kies een datum in de toekomst.' });
  }

  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'Selecteer minstens één materiaal.' });
  }

  const order = db.prepare(
    'INSERT INTO orders (technicianName, deliveryDate) VALUES (?, ?)'
  ).run(technicianName, deliveryDate);

  const insertItem = db.prepare(
    'INSERT INTO orderItems (orderId, materialId, quantity) VALUES (?, ?, ?)'
  );

  for (const item of items) {
    insertItem.run(order.lastInsertRowid, item.materialId, item.quantity);
  }

  res.status(201).json({ id: order.lastInsertRowid, message: 'Bestelling aangemaakt.' });
});

module.exports = router;