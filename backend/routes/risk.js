const express = require('express');
const router = express.Router();
const { generateForecast } = require('../services/riskEngine');

// GET risicoforecast voor komende 5 jaar
router.get('/forecast', (req, res) => {
  const forecast = generateForecast();
  res.json(forecast);
});

module.exports = router;