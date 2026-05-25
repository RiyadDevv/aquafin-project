import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import Spinner from '../components/Spinner';

function getRiskColor(level) {
  if (level === 'high') return '#e63946';
  if (level === 'medium') return '#f4a261';
  return '#2a9d8f';
}

function getRiskLabel(level) {
  if (level === 'high') return 'Hoog';
  if (level === 'medium') return 'Gemiddeld';
  return 'Laag';
}

function getCurrentSeason() {
  const month = new Date().getMonth() + 1;
  if ([12, 1, 2].includes(month)) return 'Winter';
  if ([3, 4, 5].includes(month)) return 'Lente';
  if ([6, 7, 8].includes(month)) return 'Zomer';
  return 'Herfst';
}

function Dashboard() {
  const [forecast, setForecast] = useState([]);
  const [floodTools, setFloodTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentSeason = getCurrentSeason();
  const [selectedSeason, setSelectedSeason] = useState(currentSeason);

  useEffect(() => {
    Promise.all([
      axios.get('/api/risk/forecast'),
      axios.get('/api/materials')
    ]).then(([forecastRes, matRes]) => {
      setForecast(forecastRes.data);
      setFloodTools(matRes.data.filter(m => m.isFloodTool === 1));
      setLoading(false);
    });
  }, []);

  if (loading) return <Spinner />;

  const currentYear = new Date().getFullYear();
  const seasons = ['Winter', 'Lente', 'Zomer', 'Herfst'];

  const seasonCards = seasons.map(season => {
    const entry = forecast.find(f => f.season === season && f.year === currentYear)
      || forecast.find(f => f.season === season);
    return { season, entry };
  });

  const selectedEntry = seasonCards.find(s => s.season === selectedSeason)?.entry;
  const showFloodTools = selectedEntry && (selectedEntry.riskLevel === 'high' || selectedEntry.riskLevel === 'medium');

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="section">
        <h2>Seizoensoverzicht</h2>
        <div className="season-grid">
          {seasonCards.map(({ season, entry }) => (
            <div
              key={season}
              className={`season-card ${selectedSeason === season ? 'active' : ''}`}
              onClick={() => setSelectedSeason(season)}
            >
              {season === currentSeason && (
                <div><span className="current-badge">Huidig</span></div>
              )}
              <h3>{season}</h3>
              {entry ? (
                <>
                  <p style={{ color: getRiskColor(entry.riskLevel), fontWeight: 'bold' }}>
                    {getRiskLabel(entry.riskLevel)}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: '#666' }}>{entry.predictedRainfall} mm</p>
                </>
              ) : <p>—</p>}
              <p className="click-hint">klik voor details</p>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2>
          {showFloodTools ? '⚠️ Aanbevolen Flood Tools' : 'Flood Tools'} — {selectedSeason}
        </h2>
        {showFloodTools ? (
          <ul className="flood-tools">
            {floodTools.map(tool => (
              <li key={tool.id} className="flood-tool-item">{tool.name}</li>
            ))}
          </ul>
        ) : (
          <p className="no-flood">
            Geen verhoogd overstromingsrisico voor {selectedSeason}. Geen speciale aanbevelingen.
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;