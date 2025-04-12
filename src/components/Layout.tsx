import { Outlet } from 'react-router';
import PdaDevice from './PdaDevice';

const Layout = () => {
  return (
    <main>
      <PdaDevice>
        <Outlet />
      </PdaDevice>
    </main>
  );
};

export default Layout;
