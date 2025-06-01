import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdvertsPage from './pages/AdvertsPage';
import AdvertPage from './pages/AdvertPage';
import NewAdvertPage from './pages/NewAdvertPage';
import NotFoundPage from './pages/NotFoundPage';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './hooks/useAuth';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Navbar />}
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Navigate to="/adverts" replace />
            </PrivateRoute>
          }
        />
        <Route
          path="/adverts"
          element={
            <PrivateRoute>
              <AdvertsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/adverts/new"
          element={
            <PrivateRoute>
              <NewAdvertPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/adverts/:id"
          element={
            <PrivateRoute>
              <AdvertPage />
            </PrivateRoute>
          }
        />

        {/* Funcion para manejar rutas no encontradas */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
