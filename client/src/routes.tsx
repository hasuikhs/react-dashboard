import { lazy } from 'react';

interface RouteType {
  path: string;
  component: React.ComponentType;
}

const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/404'));

const routes: RouteType[] = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '*',
    component: NotFound
  }
];

export default routes;