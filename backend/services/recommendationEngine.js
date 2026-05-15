const db = require('../db/database');
const { generateForecast } = require('./riskEngine');

function getCurrentSeason() {
  const month = new Date().getMonth() + 1;
  if ([12, 1, 2].includes(month)) return 'Winter';
  if ([3, 4, 5].includes(month)) return 'Lente';
  if ([6, 7, 8].includes(month)) return 'Zomer';
  return 'Herfst';
}

function getCurrentRiskLevel() {
  const forecast = generateForecast();
  const currentYear = new Date().getFullYear();
  const currentSeason = getCurrentSeason();

  const current = forecast.find(
    f => f.year === currentYear + 1 && f.season === currentSeason
  );

  return current ? current.riskLevel : 'low';
}

function getRecommendations() {
  const riskLevel = getCurrentRiskLevel();
  const allMaterials = db.prepare('SELECT * FROM materials WHERE isActive = 1').all();

  if (riskLevel === 'high' || riskLevel === 'medium') {
    const floodTools = allMaterials.filter(m => m.isFloodTool === 1);
    const others = allMaterials.filter(m => m.isFloodTool === 0);
    return { riskLevel, materials: [...floodTools, ...others] };
  }

  return { riskLevel, materials: allMaterials };
}

module.exports = { getRecommendations, getCurrentRiskLevel, getCurrentSeason };