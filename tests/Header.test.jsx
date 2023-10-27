import { render, screen } from '@testing-library/react';
import { AppProvider } from '../src/context/AppContext';
import { BrowserRouter } from 'react-router-dom';

import Header from '../src/components/Header/Header';

describe('Header component', () => {
  it('renders correct heading', () => {
    render(
      <BrowserRouter>
        <AppProvider>
          <Header />
        </AppProvider>
      </BrowserRouter>
    );
    expect(screen.getByRole('button').textContent).toMatch(/Region ⌄/i);
  });
});
