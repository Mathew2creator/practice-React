import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAdvert, getTags } from '../services/advertService';

function NewAdvertPage() {
  const [name, setName] = useState('');
  const [sale, setSale] = useState(true);
  const [price, setPrice] = useState('');
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getTags()
      .then((data) => setTags(data))
      .catch(() => setError('Error al cargar los tags'));
  }, []);

  const handleTagChange = (e) => {
    const { value, checked } = e.target;
    setSelectedTags((prev) => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev.filter((tag) => tag !== value);
      }
    });
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const isFormValid = () => {
    return (
      name.trim() !== '' &&
      price !== '' &&
      !isNaN(price) &&
      selectedTags.length > 0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      setError('Por favor, completa todos los campos requeridos correctamente.');
      return;
    }
    setError(null);
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('sale', sale);
      formData.append('price', price);
      selectedTags.forEach((tag) => formData.append('tags', tag));
      if (photo) {
        formData.append('photo', photo);
      }

      const newAdvert = await createAdvert(formData);
      navigate(`/adverts/${newAdvert.id}`);
    } catch (err) {
      setError(err.message || 'Error al crear el anuncio');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Nuevo Anuncio</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>
          Nombre:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
        </label>

        <label>
          Tipo:
          <select
            value={sale}
            onChange={(e) => setSale(e.target.value === 'true')}
            style={styles.select}
          >
            <option value="true">Venta</option>
            <option value="false">Compra</option>
          </select>
        </label>

        <label>
          Precio:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
            style={styles.input}
          />
        </label>

        <fieldset style={styles.fieldset}>
          <legend>Tags:</legend>
          <div style={styles.tagsContainer}>
            {tags.map((tag) => (
              <label key={tag} style={styles.tagLabel}>
                <input
                  type="checkbox"
                  value={tag}
                  checked={selectedTags.includes(tag)}
                  onChange={handleTagChange}
                />
                {tag}
              </label>
            ))}
          </div>
        </fieldset>

        <label>
          Foto:
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
        </label>

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" disabled={!isFormValid() || submitting} style={styles.button}>
          {submitting ? 'Creando...' : 'Crear Anuncio'}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '10px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  input: {
    padding: '8px',
    fontSize: '1rem',
    width: '100%',
    boxSizing: 'border-box'
  },
  select: {
    padding: '8px',
    fontSize: '1rem',
    width: '100%',
    boxSizing: 'border-box'
  },
  fieldset: {
    border: '1px solid #ccc',
    padding: '10px'
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px'
  },
  tagLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  button: {
    padding: '10px',
    backgroundColor: '#282c34',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  error: {
    color: 'red'
  }
};

export default NewAdvertPage;
