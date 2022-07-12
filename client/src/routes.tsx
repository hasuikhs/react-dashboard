import { lazy } from 'react';

interface RouteType {
  path: string;
  component: React.ComponentType;
}

const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/404'));

const Home = lazy(() => import('./pages/Home'));

const routes: RouteType[] = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Home
  },
  {
    path: '*',
    component: NotFound
  }
];

export default routes;