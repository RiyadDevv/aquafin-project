import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Beheer.css';
import Spinner from '../components/Spinner';

function Beheer() {
  const [materials, setMaterials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [isFloodTool, setIsFloodTool] = useState(false);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMaterials = () => {
    Promise.all([
      axios.get('/api/materials'),
      axios.get('/api/categories')
    ]).then(([matRes, catRes]) => {
      setMaterials(matRes.data);
      setCategories(catRes.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const showToast = (msg, type) => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleAdd = async () => {
    if (!name) return showToast('Naam is verplicht.', 'error');
    if (!categoryId) return showToast('Categorie is verplicht.', 'error');

    try {
      await axios.post('/api/materials', { name, categoryId: parseInt(categoryId), isFloodTool });
      showToast(`"${name}" succesvol toegevoegd.`, 'success');
      setName('');
      setCategoryId('');
      setIsFloodTool(false);
      fetchMaterials();
    } catch (err) {
      if (err.response?.status === 409) {
        showToast('Materiaal met deze naam bestaat al.', 'error');
      } else {
        showToast('Er ging iets mis.', 'error');
      }
    }
  };

  const handleDeactivate = async (id, materialName) => {
    if (!window.confirm(`Ben je zeker dat je "${materialName}" wil deactiveren?`)) return;

    try {
      await axios.delete(`/api/materials/${id}`);
      showToast(`"${materialName}" gedeactiveerd.`, 'success');
      fetchMaterials();
    } catch (err) {
      showToast('Er ging iets mis bij het deactiveren.', 'error');
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="beheer">
      <h1>Materiaalbeheer</h1>

      <div className="add-form">
        <h2>Nieuw Materiaal Toevoegen</h2>
        <div className="form-row">
          <input
            type="text"
            placeholder="Materiaalnaam"
            value={name}
            onChange={e => setName(e.target.value)}
            className="form-input"
          />
          <select
            value={categoryId}
            onChange={e => setCategoryId(e.target.value)}
            className="form-select"
          >
            <option value="">Selecteer categorie</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <label className="flood-checkbox">
            <input
              type="checkbox"
              checked={isFloodTool}
              onChange={e => setIsFloodTool(e.target.checked)}
            />
            Flood Tool
          </label>
          <button className="add-btn" onClick={handleAdd}>Toevoegen</button>
        </div>
      </div>

      <div className="materials-table">
        <h2>Actieve Materialen</h2>
        <table>
          <thead>
            <tr>
              <th>Naam</th>
              <th>Categorie</th>
              <th>Flood Tool</th>
              <th>Actie</th>
            </tr>
          </thead>
          <tbody>
            {materials.map(m => {
              const cat = categories.find(c => c.id === m.categoryId);
              return (
                <tr key={m.id}>
                  <td>{m.name}</td>
                  <td>{cat ? cat.name : '-'}</td>
                  <td>{m.isFloodTool ? '✅' : '—'}</td>
                  <td>
                    <button
                      className="deactivate-btn"
                      onClick={() => handleDeactivate(m.id, m.name)}
                    >
                      Deactiveren
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}

export default Beheer;