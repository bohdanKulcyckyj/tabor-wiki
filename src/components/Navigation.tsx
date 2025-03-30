import { Link } from 'react-router';
import MenuItemIconSrc from '../assets/menu-icon.svg';
import { useCurrentTime } from '../hooks/useCurrentTime';

const Navigation = () => {
  const currentTime = useCurrentTime();
  return (
    <nav className="navigation">
      <ul>
        <li className="navigation__item">
          <img src={MenuItemIconSrc} alt="soubor" />
          <Link to="/ukoly">Úkoly</Link>
        </li>
        <li className="navigation__item navigation__item--separator">
          <span></span>
        </li>
        <li className="navigation__item">
          <img src={MenuItemIconSrc} alt="soubor" />
          <Link to="/mapy">Mapy</Link>
        </li>
        <li className="navigation__item navigation__item--separator">
          <span></span>
        </li>
        <li className="navigation__item">
          <img src={MenuItemIconSrc} alt="soubor" />
          <Link to="/denik">Deník</Link>
        </li>
        <li className="navigation__item navigation__item--separator">
          <span></span>
        </li>
        <li className="navigation__item">
          <img src={MenuItemIconSrc} alt="soubor" />
          <Link to="/encyklopedie">Encykolpedie</Link>
        </li>
      </ul>
      <div>
        <p>{currentTime}</p>
      </div>
    </nav>
  );
};

export default Navigation;
