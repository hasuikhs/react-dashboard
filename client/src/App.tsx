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

  const Server = lazy(() => import('./pages/info/Server'));
  const License = lazy(() => import('./pages/info/License'));
  const User = lazy(() => import('./pages/info/User'));

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
            <Route path="/license" element={ <License /> } />
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
