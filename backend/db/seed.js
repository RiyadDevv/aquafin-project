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

// Materialen
const materials = [
  { name: 'Dompelpomp', category: 'Riolering & Aquafin tools', isFloodTool: 1 },
  { name: 'Rioolstop', category: 'Riolering & Aquafin tools', isFloodTool: 1 },
  { name: 'Slangenwagen', category: 'Riolering & Aquafin tools', isFloodTool: 1 },
  { name: 'Gasdetectiemeter', category: 'Persoonlijke beschermingsmiddelen', isFloodTool: 1 },
  { name: 'Hogedrukreiniger', category: 'Riolering & Aquafin tools', isFloodTool: 1 },
  { name: 'Ontstoppingsveer', category: 'Riolering & Aquafin tools', isFloodTool: 1 },
  { name: 'Veiligheidshelm', category: 'Persoonlijke beschermingsmiddelen', isFloodTool: 0 },
  { name: 'Werkhandschoenen', category: 'Persoonlijke beschermingsmiddelen', isFloodTool: 0 },
  { name: 'Veiligheidsbril', category: 'Persoonlijke beschermingsmiddelen', isFloodTool: 0 },
  { name: 'Veiligheidsschoenen', category: 'Persoonlijke beschermingsmiddelen', isFloodTool: 0 },
  { name: 'Stofmasker FFP2', category: 'Persoonlijke beschermingsmiddelen', isFloodTool: 0 },
  { name: 'Valharnas', category: 'Persoonlijke beschermingsmiddelen', isFloodTool: 0 },
  { name: 'Momentsleutel', category: 'Gereedschap', isFloodTool: 0 },
  { name: 'Dopsleutelset', category: 'Gereedschap', isFloodTool: 0 },
  { name: 'Schroevendraaier set', category: 'Gereedschap', isFloodTool: 0 },
  { name: 'Multimeter', category: 'Gereedschap', isFloodTool: 0 },
  { name: 'Haakse slijper', category: 'Gereedschap', isFloodTool: 0 },
  { name: 'Accuboormachine', category: 'Gereedschap', isFloodTool: 0 },
  { name: 'Bouten M10', category: 'Bevestigingsmateriaal', isFloodTool: 0 },
  { name: 'Bouten M12', category: 'Bevestigingsmateriaal', isFloodTool: 0 },
  { name: 'Chemische ankers', category: 'Bevestigingsmateriaal', isFloodTool: 0 },
  { name: 'Slangenklemmen', category: 'Bevestigingsmateriaal', isFloodTool: 0 },
  { name: 'Tie-wraps', category: 'Diversen', isFloodTool: 0 },
  { name: 'Duct tape', category: 'Diversen', isFloodTool: 0 },
  { name: 'WD-40', category: 'Diversen', isFloodTool: 0 },
];

for (const mat of materials) {
  const cat = db.prepare('SELECT id FROM categories WHERE name = ?').get(mat.category);
  db.prepare('INSERT OR IGNORE INTO materials (name, categoryId, isFloodTool) VALUES (?, ?, ?)')
    .run(mat.name, cat.id, mat.isFloodTool);
}

// KMI Neerslagdata 2004-2025
db.prepare('DELETE FROM rainfallData').run();

const rainfall = [
  [2004,1,78],[2004,2,64],[2004,3,55],[2004,4,49],[2004,5,72],[2004,6,68],[2004,7,91],[2004,8,83],[2004,9,74],[2004,10,88],[2004,11,95],[2004,12,102],
  [2005,1,67],[2005,2,54],[2005,3,73],[2005,4,68],[2005,5,74],[2005,6,79],[2005,7,98],[2005,8,89],[2005,9,68],[2005,10,99],[2005,11,81],[2005,12,108],
  [2006,1,66],[2006,2,45],[2006,3,61],[2006,4,57],[2006,5,70],[2006,6,82],[2006,7,85],[2006,8,78],[2006,9,77],[2006,10,94],[2006,11,100],[2006,12,103],
  [2007,1,62],[2007,2,56],[2007,3,64],[2007,4,62],[2007,5,72],[2007,6,79],[2007,7,87],[2007,8,94],[2007,9,70],[2007,10,90],[2007,11,104],[2007,12,104],
  [2008,1,66],[2008,2,45],[2008,3,63],[2008,4,61],[2008,5,79],[2008,6,81],[2008,7,89],[2008,8,83],[2008,9,63],[2008,10,91],[2008,11,98],[2008,12,115],
  [2009,1,67],[2009,2,46],[2009,3,72],[2009,4,58],[2009,5,72],[2009,6,83],[2009,7,95],[2009,8,90],[2009,9,66],[2009,10,93],[2009,11,102],[2009,12,115],
  [2010,1,63],[2010,2,54],[2010,3,64],[2010,4,54],[2010,5,79],[2010,6,87],[2010,7,90],[2010,8,72],[2010,9,92],[2010,10,102],[2010,11,118],[2010,12,130],
  [2011,1,65],[2011,2,63],[2011,3,57],[2011,4,64],[2011,5,75],[2011,6,79],[2011,7,90],[2011,8,75],[2011,9,69],[2011,10,97],[2011,11,107],[2011,12,107],
  [2012,1,61],[2012,2,52],[2012,3,75],[2012,4,62],[2012,5,72],[2012,6,83],[2012,7,90],[2012,8,90],[2012,9,66],[2012,10,93],[2012,11,98],[2012,12,103],
  [2013,1,66],[2013,2,57],[2013,3,60],[2013,4,59],[2013,5,68],[2013,6,78],[2013,7,88],[2013,8,88],[2013,9,81],[2013,10,99],[2013,11,109],[2013,12,111],
  [2014,1,66],[2014,2,55],[2014,3,60],[2014,4,60],[2014,5,75],[2014,6,92],[2014,7,89],[2014,8,87],[2014,9,70],[2014,10,89],[2014,11,106],[2014,12,114],
  [2015,1,69],[2015,2,50],[2015,3,77],[2015,4,53],[2015,5,78],[2015,6,91],[2015,7,85],[2015,8,82],[2015,9,70],[2015,10,92],[2015,11,110],[2015,12,102],
  [2016,1,60],[2016,2,57],[2016,3,65],[2016,4,68],[2016,5,71],[2016,6,78],[2016,7,94],[2016,8,79],[2016,9,71],[2016,10,102],[2016,11,92],[2016,12,111],
  [2017,1,66],[2017,2,59],[2017,3,64],[2017,4,53],[2017,5,78],[2017,6,81],[2017,7,91],[2017,8,87],[2017,9,67],[2017,10,96],[2017,11,101],[2017,12,106],
  [2018,1,74],[2018,2,57],[2018,3,64],[2018,4,63],[2018,5,70],[2018,6,84],[2018,7,96],[2018,8,81],[2018,9,75],[2018,10,97],[2018,11,104],[2018,12,119],
  [2019,1,64],[2019,2,51],[2019,3,66],[2019,4,56],[2019,5,75],[2019,6,82],[2019,7,91],[2019,8,89],[2019,9,70],[2019,10,102],[2019,11,99],[2019,12,124],
  [2020,1,68],[2020,2,51],[2020,3,65],[2020,4,62],[2020,5,74],[2020,6,84],[2020,7,92],[2020,8,85],[2020,9,66],[2020,10,87],[2020,11,98],[2020,12,114],
  [2021,1,92],[2021,2,78],[2021,3,88],[2021,4,81],[2021,5,95],[2021,6,110],[2021,7,121],[2021,8,118],[2021,9,105],[2021,10,129],[2021,11,133],[2021,12,140],
  [2022,1,58],[2022,2,50],[2022,3,73],[2022,4,63],[2022,5,78],[2022,6,99],[2022,7,93],[2022,8,91],[2022,9,75],[2022,10,98],[2022,11,114],[2022,12,102],
  [2023,1,61],[2023,2,54],[2023,3,68],[2023,4,60],[2023,5,87],[2023,6,71],[2023,7,93],[2023,8,77],[2023,9,68],[2023,10,100],[2023,11,100],[2023,12,105],
  [2024,1,61],[2024,2,58],[2024,3,66],[2024,4,61],[2024,5,75],[2024,6,77],[2024,7,101],[2024,8,88],[2024,9,60],[2024,10,96],[2024,11,97],[2024,12,114],
  [2025,1,72],[2025,2,62],[2025,3,70],[2025,4,55],[2025,5,68],[2025,6,74],[2025,7,85],[2025,8,79],[2025,9,71],[2025,10,90],[2025,11,94],[2025,12,108],
];

const insertRainfall = db.prepare('INSERT INTO rainfallData (year, month, rainfallMm) VALUES (?, ?, ?)');
for (const [year, month, mm] of rainfall) {
  insertRainfall.run(year, month, mm);
}

console.log('Volledige seed data ingevoerd.');