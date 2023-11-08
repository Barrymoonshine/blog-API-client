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

    screen.debug();

    expect(screen.getByText('Current Password:')).toBeInTheDocument();
    expect(screen.getByText('New Password:')).toBeInTheDocument();
    expect(screen.getByText('Confirm New Password:')).toBeInTheDocument();
  });
});
