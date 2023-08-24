import './Header.css';
import { NavLink } from 'react-router-dom';
import useAppState from '../../hooks/useAppState';
import useAppDispatch from '../../hooks/useAppDispatch';

const Header = () => {
  const { isUserLoggedIn } = useAppState();
  const { toggleUserLogIn } = useAppDispatch();
  return (
    <header>
      <div>
        <NavLink to='/'>
          <h3>Sayonara</h3>
        </NavLink>
        <h4>Region - Drop down to view by Region </h4>
      </div>
      <nav>
        {isUserLoggedIn ? (
          <ul>
            <li>
              <NavLink to='/create'>
                <h3>Create</h3>
              </NavLink>
            </li>
            <li>
              <NavLink to='/my-account'>
                <h3>My Account</h3>
              </NavLink>
            </li>
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
