import { render, screen } from '@testing-library/react';
import { AppProvider } from '../src/context/AppContext';
import { BrowserRouter } from 'react-router-dom';
import Home from '../src/pages/Home/Home';
import * as useAuthStateModule from '../src/hooks/useAuthState';

describe('Home page', () => {
  const wrappedHomePage = (
    <BrowserRouter>
      <AppProvider>
        <Home />
      </AppProvider>
    </BrowserRouter>
  );

  it('conditionally renders welcome message when user is logged in', () => {
    vi.spyOn(useAuthStateModule, 'default').mockReturnValue({
      isLoggedIn: true,
      username: 'Test',
    });

    render(wrappedHomePage);
    expect(
      screen.getByRole('heading', { name: /Welcome back Test/i })
    ).toBeInTheDocument();
  });
});
