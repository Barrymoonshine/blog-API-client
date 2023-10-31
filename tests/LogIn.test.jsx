import { render, screen } from '@testing-library/react';
import { AppProvider } from '../src/context/AppContext';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import LogIn from '../src/pages/LogIn/LogIn';
import MainRouter from '../src/components/MainRouter/MainRouter';

describe('Log in form Page', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const wrappedLogInPage = (
    <BrowserRouter>
      <AppProvider>
        <LogIn />
        <MainRouter />
      </AppProvider>
    </BrowserRouter>
  );

  it('renders all key Log In form elements correctly', () => {
    render(wrappedLogInPage);
    expect(
      screen.getByRole('textbox', { name: /Username/i })
    ).toBeInTheDocument();
    // Password input fields have no 'role' in RTL
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Log In/i })).toBeInTheDocument();
  });

  it('performs client side validation correctly', async () => {
    const user = userEvent.setup();

    render(wrappedLogInPage);

    await user.click(screen.getByRole('button', { name: /Log In/i }));

    expect(
      screen.getByText('Username is required', {selector: 'span'})
    ).toBeInTheDocument();
    expect(
      screen.getByText('Please enter a password that is between 8 and 20 characters long and contains at least one number, one capital letter and one special symbol(!@#$%^&*=+-_)', {
        selector: 'span'
      })
    ).toBeInTheDocument();
  });

  // it('submits forms when provided with valid data', async () => {
  //   const user = userEvent.setup();

  //   render(wrappedLogInPage);

  //   // Spy on the onSubmit function
  //   const onSubmitSpy = vi.spyOn(LogIn.defaultProps, 'onSubmit');

  //   // Input content into form fields and press submit
  //   await user.type(
  //     screen.getByRole('textbox', { name: /Username/i }),
  //     'test2'
  //   );
  //   await user.type(screen.getByLabelText(/Password/i), 'Password!234');

  //   await user.click(screen.getByRole('button', { name: /Log In/i }));

  //   // Confirm that onSubmit has been called with called when the user has provided valid inputs?
  //   expect(onSubmitSpy).toHaveBeenCalled();
  // });
});
