import './Header.css';
import { NavLink } from 'react-router-dom';
import useAuthState from '../../hooks/useAuthState';
import useAuthDispatch from '../../hooks/useAuthDispatch';
import { useEffect } from 'react';

const Header = () => {
  const { isLoggedIn } = useAuthState();
  const { handleLogOut, checkAuthStatus } = useAuthDispatch();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <header>
      <p>Region</p>
      <NavLink to='/' style={{ textDecoration: 'none' }}>
        <h3>Sayonara</h3>
      </NavLink>
      <nav>
        {isLoggedIn ? (
          <ul>
            <li>
              <NavLink to='/create' style={{ textDecoration: 'none' }}>
                <h3>Create</h3>
              </NavLink>
            </li>
            <li>
              <NavLink to='/my-account' style={{ textDecoration: 'none' }}>
                <h3>My Account</h3>
              </NavLink>
            </li>
            <li>
              <button onClick={() => handleLogOut()}>Log out</button>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink to='/log-in' style={{ textDecoration: 'none' }}>
                <h3>Log in</h3>
              </NavLink>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
