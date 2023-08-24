import './Header.css';
import useAppState from '../../hooks/useAppState';
import useAppDispatch from '../../hooks/useAppDispatch';

const Header = () => {
  const { isUserLoggedIn } = useAppState();
  const { toggleUserLogIn } = useAppDispatch();
  return (
    <header>
      <div>
        <h3>Sayonara - Link to Home page</h3>
        <h4>Region - Drop down to view by Region </h4>
      </div>
      <nav>
        {isUserLoggedIn ? (
          <ul>
            <li>My Account - TBC</li>
            <li>Create - TBC, Page</li>
            <li>
              <button onClick={() => toggleUserLogIn()}>Log out</button>
            </li>
          </ul>
        ) : (
          <ul>
            <li>Register - TBC</li>
            <li>
              <button onClick={() => toggleUserLogIn()}>Log in</button>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
