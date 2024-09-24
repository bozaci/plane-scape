import { Outlet } from 'react-router-dom';

import Header from '@/components/shared/header';

const Layout = () => {
  return (
    <div className="app">
      <Header />

      <div className="app__main">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
