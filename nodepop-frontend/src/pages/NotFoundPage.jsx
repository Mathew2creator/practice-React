import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div style={styles.container}>
      <h2>404 - la pagina no ha sido encontrada</h2>
      <p>La página que buscas no existe.</p>
      <Link to="/adverts" style={styles.link}>
        Volver a la lista de anuncios
      </Link>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px'
  },
  link: {
    color: '#007bff',
    textDecoration: 'none'
  }
};

export default NotFoundPage;
