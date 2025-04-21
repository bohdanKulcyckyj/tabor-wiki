import { Link } from 'react-router';
import MenuItemIconSrc from '../assets/menu-icon.svg';
import { useCurrentTime } from '../hooks/useCurrentTime';

const PdaNavigation = () => {
  const currentTime = useCurrentTime();

  return (
    <nav className="pda-navigation">
      <ul>
        <li className="pda-navigation__item">
          <img src={MenuItemIconSrc} alt="soubor" />
          <Link to="/ukoly">Úkoly</Link>
        </li>
        <li className="pda-navigation__item pda-navigation__item--separator">
          <span></span>
        </li>
        <li className="pda-navigation__item">
          <img src={MenuItemIconSrc} alt="soubor" />
          <Link to="/mapy">Mapy</Link>
        </li>
        <li className="pda-navigation__item pda-navigation__item--separator">
          <span></span>
        </li>
        <li className="pda-navigation__item">
          <img src={MenuItemIconSrc} alt="soubor" />
          <Link to="/denik">Deník</Link>
        </li>
        <li className="pda-navigation__item pda-navigation__item--separator">
          <span></span>
        </li>
        <li className="pda-navigation__item">
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

export default PdaNavigation;
