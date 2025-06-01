import { useState, useEffect, useCallback } from 'react';
import { login as loginService, getMe } from '../services/authService';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = useCallback(async (email, password, remember) => {
    const data = await loginService(email, password);
    if (data && data.token) {
      if (remember) {
        localStorage.setItem('token', data.token);
      } else {
        sessionStorage.setItem('token', data.token);
      }
      const userData = await getMe(data.token);
      setUser(userData);
      setIsAuthenticated(true);
    } else {
      throw new Error('Credenciales inválidas');
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      getMe(token)
        .then((userData) => {
          setUser(userData);
          setIsAuthenticated(true);
        })
        .catch(() => {
          logout();
        });
    }
  }, [logout]);

  return {
    user,
    isAuthenticated,
    login,
    logout
  };
}
