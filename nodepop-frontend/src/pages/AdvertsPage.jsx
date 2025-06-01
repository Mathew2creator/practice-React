import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAdverts, getTags } from '../services/advertService';

function AdvertsPage() {
  const [adverts, setAdverts] = useState([]);
  const [tags, setTags] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    sale: 'todos',
    priceMin: '',
    priceMax: '',
    selectedTags: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tags on mount
  useEffect(() => {
    getTags()
      .then((data) => setTags(data))
      .catch(() => setError('Error al cargar los tags'));
  }, []);

  // Fetch adverts when filters change
  useEffect(() => {
    setLoading(true);
    setError(null);

    // Build query params for filters
    const query = {};

    if (filters.name) {
      query.name = filters.name;
    }
    if (filters.sale !== 'todos') {
      query.sale = filters.sale === 'venta';
    }
    if (filters.priceMin !== '' || filters.priceMax !== '') {
      query.price = `${filters.priceMin || 0}-${filters.priceMax || 1000000}`;
    }
    if (filters.selectedTags.length > 0) {
      query.tags = filters.selectedTags.join(',');
    }

    getAdverts(query)
      .then((data) => setAdverts(data))
      .catch(() => setError('Error al cargar los anuncios'))
      .finally(() => setLoading(false));
  }, [filters]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagChange = (e) => {
    const { value, checked } = e.target;
    setFilters((prev) => {
      const selectedTags = new Set(prev.selectedTags);
      if (checked) {
        selectedTags.add(value);
      } else {
        selectedTags.delete(value);
      }
      return { ...prev, selectedTags: Array.from(selectedTags) };
    });
  };

  return (
    <div style={styles.container}>
      <h2>Anuncios</h2>

      <form style={styles.filtersForm}>
        <div style={styles.filterGroup}>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={filters.name}
            onChange={handleInputChange}
            placeholder="Filtrar por nombre"
            style={styles.input}
          />
        </div>

        <div style={styles.filterGroup}>
          <label>Compra/Venta:</label>
          <select
            name="sale"
            value={filters.sale}
            onChange={handleInputChange}
            style={styles.select}
          >
            <option value="todos">Todos</option>
            <option value="venta">Venta</option>
            <option value="compra">Compra</option>
          </select>
        </div>

        <div style={styles.filterGroup}>
          <label>Precio mínimo:</label>
          <input
            type="number"
            name="priceMin"
            value={filters.priceMin}
            onChange={handleInputChange}
            style={styles.input}
            min="0"
          />
        </div>

        <div style={styles.filterGroup}>
          <label>Precio máximo:</label>
          <input
            type="number"
            name="priceMax"
            value={filters.priceMax}
            onChange={handleInputChange}
            style={styles.input}
            min="0"
          />
        </div>

        <div style={styles.filterGroup}>
          <label>Tags:</label>
          <div style={styles.tagsContainer}>
            {tags.map((tag) => (
              <label key={tag} style={styles.tagLabel}>
                <input
                  type="checkbox"
                  value={tag}
                  checked={filters.selectedTags.includes(tag)}
                  onChange={handleTagChange}
                />
                {tag}
              </label>
            ))}
          </div>
        </div>
      </form>

      {loading && <p>Cargando anuncios...</p>}
      {error && <p style={styles.error}>{error}</p>}

      {!loading && adverts.length === 0 && (
        <p>
          No hay anuncios para mostrar.{' '}
          <Link to="/adverts/new">Crear un nuevo anuncio</Link>
        </p>
      )}

      <ul style={styles.advertsList}>
        {adverts.map((advert) => (
          <li key={advert.id} style={styles.advertItem}>
            <Link to={`/adverts/${advert.id}`} style={styles.advertLink}>
              <strong>{advert.name}</strong> - {advert.price}€ -{' '}
              {advert.sale ? 'Venta' : 'Compra'} - Tags:{' '}
              {advert.tags && advert.tags.join(', ')}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '20px auto',
    padding: '10px'
  },
  filtersForm: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
    marginBottom: '20px'
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '150px'
  },
  input: {
    padding: '6px',
    fontSize: '1rem'
  },
  select: {
    padding: '6px',
    fontSize: '1rem'
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px'
  },
  tagLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  advertsList: {
    listStyle: 'none',
    padding: 0
  },
  advertItem: {
    marginBottom: '10px'
  },
  advertLink: {
    textDecoration: 'none',
    color: '#007bff'
  },
  error: {
    color: 'red'
  }
};

export default AdvertsPage;
