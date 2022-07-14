import { lazy } from 'react';

interface RouteType {
  path: string;
  component: React.ReactElement;
}

const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/404'));
const Forbidden = lazy(() => import('./pages/403'));

const Home = lazy(() => import('./pages/Home'));

const routes: RouteType[] = [
  {
    path: '/login',
    component: <Login authentificated={ false } />
  },
  {
    path: '/',
    component: <Home authentificated={ false } />
  },
  {
    path: '*',
    component: <NotFound authentificated={ false } />
  }
];

const forbidden: RouteType = {
  path: '*',
  component: <Forbidden authentificated={ false } />
};

export default routes;
export { forbidden };