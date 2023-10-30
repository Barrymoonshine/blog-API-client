import { render, screen } from '@testing-library/react';
import { AppProvider } from '../src/context/AppContext';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import LogIn from '../src/pages/LogIn/LogIn';
import MainRouter from '../src/components/MainRouter/MainRouter';

describe('Header component', () => {
  const wrappedLogInPage = (
    <BrowserRouter>
      <AppProvider>
        <LogIn />
        <MainRouter />
      </AppProvider>
    </BrowserRouter>
  );

  it('renders all key Log In form elements correctly ', () => {
    render(wrappedLogInPage);
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument(); // Pass
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument(); // Pass
    expect(
      screen.getByText(/Log In/i, { selector: 'button' })
    ).toBeInTheDocument(); // Fail
  });
});
