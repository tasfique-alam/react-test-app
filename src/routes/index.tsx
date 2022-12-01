import {
  Routes, Route, useLocation,
} from 'react-router-dom';
import { useEffect } from 'react';
import routeNames from './routeNames';
import LauncherView from '../pages/Launchers';

function AllRoutes() {
  const { pathname } = useLocation();

  const titles: any = {
    '/': 'launchers',
  };

  useEffect(() => {
    document.title = titles[pathname] ?? 'Sorry';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Routes>
      <Route
        path={routeNames.launchers}
        element={<LauncherView />}
      />
    </Routes>
  );
}

export default AllRoutes;
