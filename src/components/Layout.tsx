import { Outlet } from 'react-router';
import Navigation from './Navigation';
import PdaDevice from './PdaDevice';

const Layout = () => {
  return (
    <main>
      <PdaDevice>
        <Outlet />
        <Navigation />
      </PdaDevice>
    </main>
  );
};

export default Layout;
