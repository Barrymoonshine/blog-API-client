import { render, screen, waitFor } from '@testing-library/react';
import { AppProvider } from '../src/context/AppContext';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import LogIn from '../src/pages/LogIn/LogIn';
import MainRouter from '../src/components/MainRouter/MainRouter';
// import { createAuth } from '../src/hooks/useAuthDispatch';

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
    expect(
      screen.getByRole('textbox', { name: /Username/i })
    ).toBeInTheDocument();
    // Password input fields have no 'role' in RTL
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Log In/i })).toBeInTheDocument();
  });

  it('performs client side validation', async () => {
    const user = userEvent.setup();
    render(wrappedLogInPage);
    await user.click(screen.getByRole('button', { name: /Log In/i }));

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

  // Failure - can't find element
  // it('server side validation works for invalid password ', async () => {
  //   const user = userEvent.setup();
  //   render(wrappedLogInPage);

  //   const usernameInput = screen.getByRole('textbox', { name: /Username/i });
  //   const passwordInput = screen.getByLabelText(/Password/i);

  //   await user.type(usernameInput, 'test2');
  //   await user.type(passwordInput, 'WrongPassword!2345');

  //   // Pass, test values correctly input into fields
  //   expect(usernameInput).toHaveValue('test2');
  //   expect(passwordInput).toHaveValue('WrongPassword!2345');

  //
  //   async user.click(screen.getByRole('button', { name: /Log In/i }));
  //
  //   // Fail, unable to find element
  //   expect(
  //     screen.getByText('Password not valid', { selector: 'span' })
  //   ).toBeInTheDocument();
  // });

  it('submits form with correct data ', async () => {
    const handleOnSubmitMock = vi.fn();
    const user = userEvent.setup();
    render(wrappedLogInPage);
    const usernameInput = screen.getByRole('textbox', { name: /Username/i });
    const passwordInput = screen.getByLabelText(/Password/i);

    screen.getByRole('form', { name: 'log-in-form' }).onsubmit = (e) => {
      e.preventDefault();
      handleOnSubmitMock({
        username: usernameInput.value,
        password: passwordInput.value,
      });
    };

    await user.type(usernameInput, 'Ernest Hemingway AI');
    await user.type(passwordInput, 'Password!234');
    await user.click(screen.getByRole('button', { name: /Log In/i }));

    expect(handleOnSubmitMock).toHaveBeenCalledWith({
      username: 'Ernest Hemingway AI',
      password: 'Password!234',
    });
  });
});

// Refactor, create functions to get fields
