import './Header.css';
import { NavLink } from 'react-router-dom';
import useAuthState from '../../hooks/useAuthState';
import useAuthDispatch from '../../hooks/useAuthDispatch';

const Header = () => {
  const { isLoggedIn } = useAuthState();
  const { handleLogOut } = useAuthDispatch();

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
                <img
                  className='header-icons'
                  src='./images/create.png'
                  alt='create'
                />
                Create
              </NavLink>
            </li>
            <li>
              <NavLink to='/my-account' style={{ textDecoration: 'none' }}>
                <img
                  className='header-icons'
                  src='./images/my-account.png'
                  alt='my account'
                />
                My Account
              </NavLink>
            </li>
            <li>
              <button className='log-out-button' onClick={() => handleLogOut()}>
                <img
                  className='header-icons'
                  src='../images/log-out.png'
                  alt='log out'
                />
                Log out
              </button>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink to='/log-in' style={{ textDecoration: 'none' }}>
                <img
                  className='header-icons'
                  src='../images/log-in.png'
                  alt='log in'
                />
                Log in
              </NavLink>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
