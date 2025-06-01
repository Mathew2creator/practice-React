import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import * as authHook from '../hooks/useAuth';

describe('LoginPage', () => {
  const loginMock = vi.fn();

  beforeEach(() => {
    vi.spyOn(authHook, 'useAuth').mockReturnValue({
      login: loginMock,
      isAuthenticated: false,
      logout: vi.fn(),
      user: null
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders login form', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Iniciar sesión/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/Contraseña/i)[0]).toBeInTheDocument();
    expect(screen.getByLabelText(/Recordar contraseña/i)).toBeInTheDocument();
  });

  test('calls login on form submit', async () => {
    loginMock.mockResolvedValueOnce();

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getAllByLabelText(/Contraseña/i)[0], {
      target: { value: 'password123' }
    });
    fireEvent.click(screen.getByLabelText(/Recordar contraseña/i));

    fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith('test@example.com', 'password123', true);
    });
  });

  test('shows error message on login failure', async () => {
    loginMock.mockRejectedValueOnce(new Error('Error al iniciar sesión'));

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getAllByLabelText(/Contraseña/i)[0], {
      target: { value: 'wrongpassword' }
    });

    fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));

    await waitFor(() => {
      expect(screen.getByText(/Error al iniciar sesión/i)).toBeInTheDocument();
    });
  });
});
