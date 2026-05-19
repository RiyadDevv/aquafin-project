import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RisicoAnalyse.css';
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

function RisicoAnalyse() {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/risk/forecast').then(res => {
      setForecast(res.data);
      setLoading(false);
    });
  }, []);

if (loading) return <Spinner />;

  const years = [...new Set(forecast.map(f => f.year))];
  const seasons = ['Winter', 'Lente', 'Zomer', 'Herfst'];

  return (
    <div className="risico-analyse">
      <h1>Risicoanalyse</h1>
      <p className="subtitle">Overstromingsrisico forecast voor de komende 5 jaar</p>

      <table className="forecast-table">
        <thead>
          <tr>
            <th>Seizoen</th>
            {years.map(y => <th key={y}>{y}</th>)}
          </tr>
        </thead>
        <tbody>
          {seasons.map(season => (
            <tr key={season}>
              <td className="season-label">{season}</td>
              {years.map(year => {
                const entry = forecast.find(f => f.year === year && f.season === season);
                if (!entry) return <td key={year}>-</td>;
                return (
                  <td key={year} className="risk-cell" style={{ backgroundColor: getRiskColor(entry.riskLevel) + '33', borderLeft: `4px solid ${getRiskColor(entry.riskLevel)}` }}>
                    <span className="risk-badge" style={{ color: getRiskColor(entry.riskLevel) }}>
                      {getRiskLabel(entry.riskLevel)}
                    </span>
                    <br />
                    <span className="risk-mm">{entry.predictedRainfall} mm</span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RisicoAnalyse;