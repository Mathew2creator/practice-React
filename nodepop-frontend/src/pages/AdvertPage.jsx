import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAdvertById, deleteAdvert } from '../services/advertService';

function AdvertPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [advert, setAdvert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAdvertById(id)
      .then((data) => {
        if (!data) {
          navigate('/404', { replace: true });
          return;
        }
        setAdvert(data);
      })
      .catch(() => setError('Error al cargar el anuncio'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      await deleteAdvert(id);
      navigate('/adverts');
    } catch {
      setError('Error al borrar el anuncio');
    }
  };

  if (loading) return <p>Cargando anuncio...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!advert) return null;

  return (
    <div style={styles.container}>
      <h2>{advert.name}</h2>
      <p>
        <strong>Precio:</strong> {advert.price}€
      </p>
      <p>
        <strong>Tipo:</strong> {advert.sale ? 'Venta' : 'Compra'}
      </p>
      <p>
        <strong>Tags:</strong> {advert.tags && advert.tags.join(', ')}
      </p>
      <div>
        {advert.photo ? (
          <img
            src={advert.photo}
            alt={advert.name}
            style={styles.image}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/placeholder.png';
            }}
          />
        ) : (
          <div style={styles.placeholder}>No hay foto disponible</div>
        )}
      </div>
      <button onClick={() => setShowConfirm(true)} style={styles.deleteButton}>
        Borrar anuncio
      </button>

      {showConfirm && (
        <div style={styles.confirmOverlay}>
          <div style={styles.confirmBox}>
            <p>¿Seguro que quieres borrar este anuncio?</p>
            <button onClick={handleDelete} style={styles.confirmButton}>
              Sí, borrar
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              style={styles.cancelButton}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '10px'
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    marginBottom: '10px'
  },
  placeholder: {
    width: '100%',
    height: '200px',
    backgroundColor: '#ccc',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#666',
    marginBottom: '10px'
  },
  deleteButton: {
    backgroundColor: '#d9534f',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  confirmOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  confirmBox: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center'
  },
  confirmButton: {
    backgroundColor: '#d9534f',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    marginRight: '10px',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default AdvertPage;
