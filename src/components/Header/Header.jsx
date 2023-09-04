import './Header.css';
import { NavLink } from 'react-router-dom';
import useAppState from '../../hooks/useAppState';
import useAppDispatch from '../../hooks/useAppDispatch';

const Header = () => {
  const { user } = useAppState();
  const { logOut } = useAppDispatch();

  console.log('user', user);

  return (
    <header>
      <p>Region</p>
      <NavLink to='/' style={{ textDecoration: 'none' }}>
        <h3>Sayonara</h3>
      </NavLink>
      <nav>
        {user ? (
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
              <button onClick={() => logOut()}>Log out</button>
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
