import { Outlet } from 'react-router';
import Navigation from './Navigation';

const Layout = () => {
  return (
    <main>
      <div>
        <Outlet />
        <Navigation />
      </div>
    </main>
  );
};

export default Layout;
