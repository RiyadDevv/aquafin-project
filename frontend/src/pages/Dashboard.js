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

function Dashboard() {
  const [recommendations, setRecommendations] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get('/api/recommendations'),
      axios.get('/api/risk/forecast')
    ]).then(([recRes, forecastRes]) => {
      setRecommendations(recRes.data);
      setForecast(forecastRes.data);
      setLoading(false);
    });
  }, []);

if (loading) return <Spinner />;

  const floodTools = recommendations.materials.filter(m => m.isFloodTool === 1);
  const upcomingSeasons = forecast.filter(f => f.year === new Date().getFullYear() + 1);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      {/* Huidig Risico */}
      <div className="risk-card" style={{ borderLeft: `6px solid ${getRiskColor(recommendations.riskLevel)}` }}>
        <h2>Huidig Overstromingsrisico</h2>
        <p className="risk-level" style={{ color: getRiskColor(recommendations.riskLevel) }}>
          {getRiskLabel(recommendations.riskLevel)}
        </p>
      </div>

      {/* Komende Seizoenen */}
      <div className="section">
        <h2>Forecast Komende Seizoenen</h2>
        <div className="season-grid">
          {upcomingSeasons.map((s, i) => (
            <div key={i} className="season-card" style={{ borderTop: `4px solid ${getRiskColor(s.riskLevel)}` }}>
              <h3>{s.season}</h3>
              <p style={{ color: getRiskColor(s.riskLevel) }}>{getRiskLabel(s.riskLevel)}</p>
              <p>{s.predictedRainfall} mm</p>
            </div>
          ))}
        </div>
      </div>

      {/* Aanbevolen Tools */}
      {(recommendations.riskLevel === 'high' || recommendations.riskLevel === 'medium') && (
        <div className="section">
          <h2>⚠️ Aanbevolen Flood Tools</h2>
          <ul className="flood-tools">
            {floodTools.map(tool => (
              <li key={tool.id} className="flood-tool-item">{tool.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dashboard;