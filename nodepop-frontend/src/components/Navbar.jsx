import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('¿Seguro que quieres cerrar sesión?')) {
      logout();
      navigate('/login');
    }
  };

  return (
    <nav style={styles.nav}>
      <div>
        <NavLink to="/adverts" style={styles.link} activeclassname="active">
          Anuncios
        </NavLink>
        {' | '}
        <NavLink to="/adverts/new" style={styles.link} activeclassname="active">
          Nuevo Anuncio
        </NavLink>
      </div>
      <button onClick={handleLogout} style={styles.button}>
        Logout
      </button>
    </nav>
  );
}

const styles = {
  nav: {
    padding: '10px 20px',
    backgroundColor: '#282c34',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    marginRight: '10px'
  },
  button: {
    backgroundColor: '#61dafb',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default Navbar;
