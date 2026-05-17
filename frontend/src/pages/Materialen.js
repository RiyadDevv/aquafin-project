import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Materialen.css';

function getRiskColor(level) {
  if (level === 'high') return '#e63946';
  if (level === 'medium') return '#f4a261';
  return '#2a9d8f';
}

function Materialen() {
  const [materials, setMaterials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [riskLevel, setRiskLevel] = useState('low');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get('/api/materials'),
      axios.get('/api/categories'),
      axios.get('/api/recommendations')
    ]).then(([matRes, catRes, recRes]) => {
      setMaterials(matRes.data);
      setCategories(catRes.data);
      setRiskLevel(recRes.data.riskLevel);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Laden...</p>;

  const filtered = materials.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === '' || m.categoryId === parseInt(selectedCategory);
    return matchSearch && matchCat;
  });

  const floodTools = filtered.filter(m => m.isFloodTool === 1);
  const others = filtered.filter(m => m.isFloodTool === 0);
  const showFloodFirst = riskLevel === 'high' || riskLevel === 'medium';

  return (
    <div className="materialen">
      <h1>Materialen</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Zoeken op naam..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input"
        />
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          <option value="">Alle categorieën</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {showFloodFirst && floodTools.length > 0 && (
        <div className="flood-section">
          <h2 style={{ color: getRiskColor(riskLevel) }}>
            ⚠️ Aanbevolen Flood Tools — Risico: {riskLevel === 'high' ? 'Hoog' : 'Gemiddeld'}
          </h2>
          <div className="materials-grid">
            {floodTools.map(m => (
              <div key={m.id} className="material-card flood-tool">
                <span className="flood-badge">Flood Tool</span>
                <p>{m.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="all-materials">
        <h2>Alle Materialen</h2>
        <div className="materials-grid">
          {(showFloodFirst ? others : filtered).map(m => (
            <div key={m.id} className="material-card">
              <p>{m.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Materialen;