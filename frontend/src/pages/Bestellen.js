import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Bestellen.css';

function Bestellen() {
  const [materials, setMaterials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [technicianName, setTechnicianName] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get('/api/materials'),
      axios.get('/api/categories')
    ]).then(([matRes, catRes]) => {
      setMaterials(matRes.data);
      setCategories(catRes.data);
      setLoading(false);
    });
  }, []);

  const handleQuantityChange = (id, value) => {
    const qty = parseInt(value);
    if (qty > 0) {
      setSelectedItems(prev => ({ ...prev, [id]: qty }));
    } else {
      const updated = { ...selectedItems };
      delete updated[id];
      setSelectedItems(updated);
    }
  };

  const handleSubmit = async () => {
    setError(null);
    setMessage(null);

    if (!technicianName) return setError('Naam technieker is verplicht.');
    if (!deliveryDate) return setError('Leverdatum is verplicht.');

    const today = new Date().toISOString().split('T')[0];
    if (deliveryDate <= today) return setError('Kies een datum in de toekomst.');

    const items = Object.entries(selectedItems).map(([materialId, quantity]) => ({
      materialId: parseInt(materialId),
      quantity
    }));

    if (items.length === 0) return setError('Selecteer minstens één materiaal.');

    try {
      await axios.post('/api/orders', { technicianName, deliveryDate, items });
      setMessage(`Bestelling geplaatst voor ${deliveryDate}!`);
      setSelectedItems({});
      setTechnicianName('');
      setDeliveryDate('');
    } catch (err) {
      setError(err.response?.data?.error || 'Er ging iets mis.');
    }
  };

  if (loading) return <p>Laden...</p>;

  const filtered = materials.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === '' || m.categoryId === parseInt(selectedCategory);
    return matchSearch && matchCat;
  });

  return (
    <div className="bestellen">
      <h1>Bestelling Plaatsen</h1>

      {message && <div className="alert success">{message}</div>}
      {error && <div className="alert error">{error}</div>}

      <div className="order-form">
        <input
          type="text"
          placeholder="Naam technieker"
          value={technicianName}
          onChange={e => setTechnicianName(e.target.value)}
          className="form-input"
        />
        <input
          type="date"
          value={deliveryDate}
          onChange={e => setDeliveryDate(e.target.value)}
          className="form-input"
        />
      </div>

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

      <div className="materials-list">
        {filtered.map(m => (
          <div key={m.id} className="material-row">
            <span className="material-name">{m.name}</span>
            <input
              type="number"
              min="0"
              placeholder="0"
              value={selectedItems[m.id] || ''}
              onChange={e => handleQuantityChange(m.id, e.target.value)}
              className="quantity-input"
            />
          </div>
        ))}
      </div>

      <button className="submit-btn" onClick={handleSubmit}>
        Bestelling Bevestigen
      </button>
    </div>
  );
}

export default Bestellen;