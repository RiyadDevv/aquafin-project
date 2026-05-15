const db = require('../db/database');

// Seizoensindeling
const SEASONS = {
  Winter: { months: [12, 1, 2], threshold: 300 },
  Lente: { months: [3, 4, 5], threshold: 250 },
  Zomer: { months: [6, 7, 8], threshold: 260 },
  Herfst: { months: [9, 10, 11], threshold: 280 },
};

// Bepaal seizoen op basis van maand
function getSeason(month) {
  for (const [season, data] of Object.entries(SEASONS)) {
    if (data.months.includes(month)) return season;
  }
}

// Groepeer neerslagdata per seizoen per jaar
function groupBySeason(rainfallData) {
  const grouped = {};

  for (const row of rainfallData) {
    const season = getSeason(row.month);
    const year = row.month === 12 ? row.year + 1 : row.year;
    const key = `${year}-${season}`;

    if (!grouped[key]) {
      grouped[key] = { year, season, total: 0 };
    }
    grouped[key].total += row.rainfallMm;
  }

  return Object.values(grouped);
}

// Lineaire regressie
function linearRegression(points) {
  const n = points.length;
  const sumX = points.reduce((s, p) => s + p.x, 0);
  const sumY = points.reduce((s, p) => s + p.y, 0);
  const sumXY = points.reduce((s, p) => s + p.x * p.y, 0);
  const sumX2 = points.reduce((s, p) => s + p.x * p.x, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return { slope, intercept };
}

// Classificeer risiconiveau
function classifyRisk(predicted, threshold) {
  if (predicted > threshold * 1.1) return 'high';
  if (predicted >= threshold) return 'medium';
  return 'low';
}

// Hoofdfunctie: genereer forecast voor komende 5 jaar
function generateForecast() {
  const rainfallData = db.prepare('SELECT * FROM rainfallData').all();
  const grouped = groupBySeason(rainfallData);
  const currentYear = new Date().getFullYear();
  const forecast = [];

  for (const seasonName of Object.keys(SEASONS)) {
    const threshold = SEASONS[seasonName].threshold;
    const seasonData = grouped.filter(g => g.season === seasonName);

    const points = seasonData.map(d => ({ x: d.year, y: d.total }));
    if (points.length < 2) continue;

    const { slope, intercept } = linearRegression(points);

    for (let i = 1; i <= 5; i++) {
      const year = currentYear + i;
      const predicted = slope * year + intercept;
      const riskLevel = classifyRisk(predicted, threshold);

      forecast.push({
        year,
        season: seasonName,
        predictedRainfall: Math.round(predicted),
        threshold,
        riskLevel,
      });
    }
  }

  return forecast;
}

module.exports = { generateForecast };