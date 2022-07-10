import { lazy } from 'react';

interface RouteType {
  path: string;
  component: React.ComponentType;
}

const NotFound = lazy(() => import('./pages/404'));

const routes: RouteType[] = [
  {
    path: '*',
    component: NotFound
  }
];

export default routes;