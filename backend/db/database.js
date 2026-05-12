const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'aquafin.sqlite'));

db.exec(`
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
  );

  CREATE TABLE IF NOT EXISTS materials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    categoryId INTEGER NOT NULL,
    isFloodTool INTEGER DEFAULT 0,
    isActive INTEGER DEFAULT 1,
    FOREIGN KEY (categoryId) REFERENCES categories(id)
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    technicianName TEXT NOT NULL,
    deliveryDate TEXT NOT NULL,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'pending'
  );

  CREATE TABLE IF NOT EXISTS orderItems (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    orderId INTEGER NOT NULL,
    materialId INTEGER NOT NULL,
    quantity INTEGER NOT NULL CHECK(quantity > 0),
    FOREIGN KEY (orderId) REFERENCES orders(id),
    FOREIGN KEY (materialId) REFERENCES materials(id)
  );

  CREATE TABLE IF NOT EXISTS rainfallData (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    year INTEGER NOT NULL,
    month INTEGER NOT NULL CHECK(month >= 1 AND month <= 12),
    rainfallMm REAL NOT NULL
  );

  CREATE TABLE IF NOT EXISTS riskResults (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    year INTEGER NOT NULL,
    season TEXT NOT NULL,
    predictedRainfall REAL NOT NULL,
    threshold REAL NOT NULL,
    riskLevel TEXT NOT NULL
  );
`);

module.exports = db;