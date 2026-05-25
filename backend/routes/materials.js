const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET alle actieve materialen
router.get('/', (req, res) => {
  const materials = db.prepare('SELECT * FROM materials WHERE isActive = 1').all();
  res.json(materials);
});

// POST nieuw materiaal toevoegen
router.post('/', (req, res) => {
  const { name, categoryId, isFloodTool } = req.body;

  if (!name || !categoryId) {
    return res.status(400).json({ error: 'Naam en categorie zijn verplicht.' });
  }

const existing = db.prepare('SELECT id FROM materials WHERE name = ? AND isActive = 1').get(name);
  if (existing) {
    return res.status(409).json({ error: 'Materiaal met deze naam bestaat al.' });
  }

  const result = db.prepare(
    'INSERT INTO materials (name, categoryId, isFloodTool) VALUES (?, ?, ?)'
  ).run(name, categoryId, isFloodTool ? 1 : 0);

  res.status(201).json({ id: result.lastInsertRowid, name, categoryId, isFloodTool });
});

// DELETE materiaal deactiveren (soft delete)
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const material = db.prepare('SELECT id FROM materials WHERE id = ?').get(id);
  if (!material) {
    return res.status(404).json({ error: 'Materiaal niet gevonden.' });
  }

  db.prepare('UPDATE materials SET isActive = 0 WHERE id = ?').run(id);
  res.json({ message: 'Materiaal gedeactiveerd.' });
});

module.exports = router;