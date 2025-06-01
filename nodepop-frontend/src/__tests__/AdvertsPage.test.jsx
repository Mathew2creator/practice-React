import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdvertsPage from '../pages/AdvertsPage';

describe('AdvertsPage', () => {
  test('renders AdvertsPage component', () => {
    render(
      <MemoryRouter>
        <AdvertsPage />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/Anuncios/i)[0]).toBeInTheDocument();
  });
});
