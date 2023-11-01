import { render, screen } from '@testing-library/react';
import { AppProvider } from '../src/context/AppContext';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import SignUp from '../src/pages/SignUp/SignUp';

describe('SignUp form Page', () => {
  const wrappedSignUpPage = (
    <BrowserRouter>
      <AppProvider>
        <SignUp />
      </AppProvider>
    </BrowserRouter>
  );

  it('renders all key SignUp form elements', () => {
    render(wrappedSignUpPage);
    screen.debug();
    expect(getUsernameInput()).toBeInTheDocument();
    expect(getPasswordInput()).toBeInTheDocument();
    expect(getConfPasswordInput()).toBeInTheDocument();
    expect(getSignUpBtn()).toBeInTheDocument();
  });

  it('performs client side validation', async () => {
    const user = userEvent.setup();
    render(wrappedSignUpPage);
    await user.click(getSignUpBtn());

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
    expect(
      screen.getByText('Passwords do not match', {
        selector: 'span',
      })
    ).toBeInTheDocument();
  });

  it('submits form with correct data ', async () => {
    const handleOnSubmitMock = vi.fn();
    const user = userEvent.setup();
    render(wrappedSignUpPage);

    screen.getByRole('form', { name: 'sign-up-form' }).onsubmit = (e) => {
      e.preventDefault();
      handleOnSubmitMock({
        username: getUsernameInput().value,
        password: getPasswordInput().value,
        confirmPassword: getConfPasswordInput().value,
      });
    };

    await user.type(getUsernameInput(), 'Test');
    await user.type(getPasswordInput(), 'Password!234');
    await user.type(getConfPasswordInput(), 'Password!234');
    await user.click(getSignUpBtn());

    expect(handleOnSubmitMock).toHaveBeenCalledWith({
      username: 'Test',
      password: 'Password!234',
      confirmPassword: 'Password!234',
    });
  });
});

// Helper functions
function getUsernameInput() {
  return screen.getByRole('textbox');
}

function getPasswordInput() {
  return screen.getByLabelText('Password:');
}

function getConfPasswordInput() {
  return screen.getByLabelText('Confirm password:');
}

function getSignUpBtn() {
  return screen.getByRole('button', { name: /Sign up/i });
}
