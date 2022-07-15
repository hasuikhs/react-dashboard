import { lazy } from 'react';

interface RouteType {
  path: string;
  component: React.ReactElement;
}

const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/404'));

const Home = lazy(() => import('./pages/Home'));

const privateRoutes: RouteType[] = [
  {
    path: '/',
    component: <Home />
  },
];

const publicRoutes: RouteType[] = [
  {
    path: '/login',
    component: <Login />
  },
  {
    path: '*',
    component: <NotFound />
  }
]

export { privateRoutes, publicRoutes };