import { render, screen } from '@testing-library/react';
import { AppProvider } from '../src/context/AppContext';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Header from '../src/components/Header/Header';
import MainRouter from '../src/components/MainRouter/MainRouter';

describe('Header component', () => {
  const wrappedHeader = (
    <BrowserRouter>
      <AppProvider>
        <Header />
      </AppProvider>
    </BrowserRouter>
  );

  it('renders region button correctly', () => {
    render(wrappedHeader);
    expect(screen.getByRole('button').textContent).toMatch(/Region ⌄/i);
  });

  it('renders page title and home anchor link correctly', () => {
    render(wrappedHeader);

    expect(screen.getByText('Sayonara').closest('a')).toBeInTheDocument();
  });

  it('renders log in anchor link correctly', () => {
    render(wrappedHeader);

    expect(screen.getByText('Log in').closest('a')).toBeInTheDocument();
  });

  it('renders region drop down menu after button click', async () => {
    const user = userEvent.setup();
    render(wrappedHeader);
    const regionButton = screen.getByRole('button', { value: 'Region ⌄' });

    await user.click(regionButton);

    expect(screen.getByText('EXPLORE A REGION')).toBeInTheDocument();
  });

  it('renders log in page after link click', async () => {
    const user = userEvent.setup();

    // Render component with Routing to test Routing works correctly
    render(
      <BrowserRouter>
        <AppProvider>
          <Header />
          <MainRouter />
        </AppProvider>
      </BrowserRouter>
    );
    const logInLink = screen.getByText('Log in').closest('a');

    await user.click(logInLink);

    expect(
      screen.getByText('Welcome back fellow traveler')
    ).toBeInTheDocument();
  });
});
