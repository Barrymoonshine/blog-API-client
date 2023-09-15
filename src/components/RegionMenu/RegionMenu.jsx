import './RegionMenu.css';
import { Link } from 'react-router-dom';

const RegionMenu = ({ toggleMenuVisibility }) => {
  return (
    <div
      className='region-menu'
      style={{
        left: `0px`,
        top: `89px`,
        width: '200px',
        position: 'fixed',
      }}
      onClick={() => toggleMenuVisibility()}
    >
      EXPLORE A REGION
      <ul>
        <li>
          <Link to={`/region/africa`}>Africa</Link>
        </li>
        <li>
          <Link to={`/region/asia`}>Asia</Link>
        </li>
        <li>
          <Link to={`/region/the-caribbean`}>The Caribbean</Link>
        </li>
        <li>
          <Link to={`/region/central-america`}>Central America</Link>
        </li>
        <li>
          <Link to={`/region/europe`}>Europe</Link>
        </li>
        <li>
          <Link to={`/region/north-america`}>North America</Link>
        </li>
        <li>
          <Link to={`/region/oceania`}>Oceania</Link>
        </li>
        <li>
          <Link to={`/region/south-america`}>South America</Link>
        </li>
      </ul>
    </div>
  );
};

export default RegionMenu;
