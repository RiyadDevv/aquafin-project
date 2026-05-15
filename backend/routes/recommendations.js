const express = require('express');
const router = express.Router();
const { getRecommendations } = require('../services/recommendationEngine');

// GET aanbevolen materialen op basis van risiconiveau
router.get('/', (req, res) => {
  const recommendations = getRecommendations();
  res.json(recommendations);
});

module.exports = router;