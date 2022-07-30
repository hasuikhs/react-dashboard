import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import API from './common/API';

import { RootState } from './modules';
import { Auth } from './modules/auth';

import Spinner from './components/spinner/Spinner';

function App(): JSX.Element {

  const authentificated: Auth = useSelector<RootState>(state => state.auth) as Auth;

  API.defaults.headers.common['Authorization'] = authentificated.token as string;
  // pages
  const Login = lazy(() => import('./pages/Login'));
  const Home = lazy(() => import('./pages/Home'));
  const User = lazy(() => import('./pages/User'));
  const Server = lazy(() => import('./pages/Server'));

  const NotFound = lazy(() => import('./pages/404'));
  // const Forbidden = lazy(() => import('./pages/403'));

  return (
    <div className="app">
      <Suspense fallback={ <Spinner /> }>
        <Routes>
          <Route path="/" element={ <ProtectedRoute isLogin={ authentificated.user.isLogin } /> }>
            <Route path="" element={ <Home /> } />
            <Route path="/user" element={ <User /> } />
            <Route path="/server" element={ <Server /> } />
          </Route>
          <Route path="/login" element={ <Login /> } />
          <Route path="*" element={ <NotFound /> } />
        </Routes>
      </Suspense>
    </div>
  );
}

function ProtectedRoute({ isLogin = false }: { isLogin: boolean }): JSX.Element {
  return isLogin ? <Outlet /> : <Navigate to="/login" replace />;
}

export default App;
