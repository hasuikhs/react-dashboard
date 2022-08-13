import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
// redux
import { useSelector } from 'react-redux';
import { RootState } from './modules';
import { Auth } from './modules/auth';

import { Backdrop, CircularProgress } from '@mui/material';

import Layout from './layouts';

import API from './common/API';

import Spinner from './components/spinner/Spinner';

import ThemeProvider from './theme';

// --------------------------------------------------------------------------------

function App(): JSX.Element {

  const authentificated: Auth = useSelector<RootState>(state => state.auth) as Auth;

  API.defaults.headers.common['Authorization'] = authentificated.token as string;

  // --------------------------------------------------------------------------------

  const Login = lazy(() => import('./pages/Login_new'));
  const Home = lazy(() => import('./pages/Home'));

  const Server = lazy(() => import('./pages/info/Server'));
  const License = lazy(() => import('./pages/info/License'));
  const User = lazy(() => import('./pages/info/User'));

  const NotFound = lazy(() => import('./pages/404'));
  const Forbidden = lazy(() => import('./pages/403'));

  // --------------------------------------------------------------------------------

  return (
    <ThemeProvider>
      <div className="app">
        <Suspense fallback={ <Spinner /> }>
          <Routes>
            <Route path="/" element={ <ProtectedRoute isLogin={ authentificated.user.isLogin } /> }>
              <Route path="/home" element={ <Home /> } />
              <Route path="/user" element={ <User /> } />
              <Route path="/server" element={ <Server /> } />
              <Route path="/license" element={ <License /> } />
            </Route>
            <Route path="/login" element={ <Login /> } />
            <Route path="*" element={ <NotFound /> } />
          </Routes>
        </Suspense>
      </div>
    </ThemeProvider>
  );
}

function ProtectedRoute({ isLogin = false }: { isLogin: boolean }): JSX.Element {
  const { pathname } = useLocation();

  return isLogin
          ? pathname === '/'
            ? <Navigate to="/home" />
            : <Layout />
          : <Navigate to="/login" replace />;
}

// --------------------------------------------------------------------------------

export default App;
