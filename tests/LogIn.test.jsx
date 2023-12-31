import { render, screen } from '@testing-library/react';
import { AppProvider } from '../src/context/AppContext';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import LogIn from '../src/pages/LogIn/LogIn';
import MainRouter from '../src/components/MainRouter/MainRouter';

describe('Log in form Page', () => {
  const wrappedLogInPage = (
    <BrowserRouter>
      <AppProvider>
        <LogIn />
        <MainRouter />
      </AppProvider>
    </BrowserRouter>
  );

  it('renders all key LogIn form elements', () => {
    render(wrappedLogInPage);
    expect(getUsernameInput()).toBeInTheDocument();
    expect(getPasswordInput()).toBeInTheDocument();
    expect(getLogInBtn()).toBeInTheDocument();
  });

  it('performs client side validation', async () => {
    const user = userEvent.setup();
    render(wrappedLogInPage);
    await user.click(getLogInBtn());

    expect(
      screen.getByText('Username is required', { selector: 'span' })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Please enter a password that is between 8 and 20 characters long and contains at least one number, one capital letter and one special symbol(!@#$%^&*=+-_)',
        {
          selector: 'span',
        }
      )
    ).toBeInTheDocument();
  });

  it('submits form with correct data ', async () => {
    const handleOnSubmitMock = vi.fn();
    const user = userEvent.setup();
    render(wrappedLogInPage);

    screen.getByRole('form', { name: 'log-in-form' }).onsubmit = (e) => {
      e.preventDefault();
      handleOnSubmitMock({
        username: getUsernameInput().value,
        password: getPasswordInput().value,
      });
    };

    await user.type(getUsernameInput(), 'Ernest Hemingway AI');
    await user.type(getPasswordInput(), 'Password!234');
    await user.click(getLogInBtn());

    expect(handleOnSubmitMock).toHaveBeenCalledWith({
      username: 'Ernest Hemingway AI',
      password: 'Password!234',
    });
  });
});

// Helper functions
function getUsernameInput() {
  return screen.getByRole('textbox', { name: /Username/i });
}

function getPasswordInput() {
  return screen.getByLabelText(/Password/i);
}

function getLogInBtn() {
  return screen.getByRole('button', { name: /Log In/i });
}
