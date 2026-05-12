const db = require('./database');

// Categories
const categories = [
  'Bevestigingsmateriaal',
  'Persoonlijke beschermingsmiddelen',
  'Gereedschap',
  'Riolering & Aquafin tools',
  'Diversen'
];

for (const name of categories) {
  db.prepare('INSERT OR IGNORE INTO categories (name) VALUES (?)').run(name);
}

// Test materialen (kleine dataset)
const materials = [
  { name: 'Dompelpomp', category: 'Riolering & Aquafin tools', isFloodTool: 1 },
  { name: 'Rioolstop', category: 'Riolering & Aquafin tools', isFloodTool: 1 },
  { name: 'Slangenwagen', category: 'Riolering & Aquafin tools', isFloodTool: 1 },
  { name: 'Gasdetectiemeter', category: 'Persoonlijke beschermingsmiddelen', isFloodTool: 1 },
  { name: 'Hogedrukreiniger', category: 'Riolering & Aquafin tools', isFloodTool: 1 },
  { name: 'Veiligheidshelm', category: 'Persoonlijke beschermingsmiddelen', isFloodTool: 0 },
  { name: 'Werkhandschoenen', category: 'Persoonlijke beschermingsmiddelen', isFloodTool: 0 },
  { name: 'Momentsleutel', category: 'Gereedschap', isFloodTool: 0 },
  { name: 'Bouten M10', category: 'Bevestigingsmateriaal', isFloodTool: 0 },
  { name: 'Tie-wraps', category: 'Diversen', isFloodTool: 0 },
];

for (const mat of materials) {
  const cat = db.prepare('SELECT id FROM categories WHERE name = ?').get(mat.category);
  db.prepare('INSERT OR IGNORE INTO materials (name, categoryId, isFloodTool) VALUES (?, ?, ?)')
    .run(mat.name, cat.id, mat.isFloodTool);
}

console.log('Seed data ingevoerd.');