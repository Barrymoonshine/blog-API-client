import { render, screen } from '@testing-library/react';
import { AppProvider } from '../src/context/AppContext';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import MyAccount from '../src/pages/MyAccount/MyAccount';
// import * as useAuthStateModule from '../src/hooks/useAuthState';

describe('My account page', () => {
  const wrappedMyAccountPage = (
    <BrowserRouter>
      <AppProvider>
        <MyAccount />
      </AppProvider>
    </BrowserRouter>
  );

  it('renders update username form on click', async () => {
    const user = userEvent.setup();

    render(wrappedMyAccountPage);

    await user.click(screen.getByRole('button', { name: /Update username/i }));

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
  });

  it('renders update password form on click', async () => {
    const user = userEvent.setup();

    render(wrappedMyAccountPage);

    await user.click(screen.getByRole('button', { name: /Update password/i }));

    // getByLabelText is buggy :'-( , but getByText works!
    expect(screen.getByText('Current Password:')).toBeInTheDocument();
    expect(screen.getByText('New Password:')).toBeInTheDocument();
    expect(screen.getByText('Confirm New Password:')).toBeInTheDocument();
  });

  it('update username form completes client side validation', async () => {
    const user = userEvent.setup();

    render(wrappedMyAccountPage);

    await user.click(screen.getByRole('button', { name: /Update username/i }));
    await user.click(screen.getByRole('button', { name: /Submit username/i }));

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

  it('update password form completes client side validation', async () => {
    const user = userEvent.setup();

    render(wrappedMyAccountPage);

    await user.click(screen.getByRole('button', { name: /Update password/i }));
    await user.click(screen.getByRole('button', { name: /Submit password/i }));

    // Multiple password validation errors present
    expect(
      screen.getAllByText(
        'Please enter a password that is between 8 and 20 characters long and contains at least one number, one capital letter and one special symbol(!@#$%^&*=+-_)',
        {
          selector: 'span',
        }
      )[0]
    ).toBeInTheDocument();
    expect(
      screen.getByText('Passwords must match', { selector: 'span' })
    ).toBeInTheDocument();
  });
});
