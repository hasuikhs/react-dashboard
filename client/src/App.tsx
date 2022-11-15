import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
// redux
import { useSelector } from 'react-redux';
import { RootState } from './modules';
import { Auth } from './modules/auth';

import Layout from './layouts';

import API from './common/API';

import Spinner from './components/spinner/Spinner';

import ThemeProvider from './theme';

// --------------------------------------------------------------------------------

function App(): JSX.Element {

  const authentificated: Auth = useSelector<RootState>(state => state.auth) as Auth;

  API.defaults.headers.common['Authorization'] = authentificated.token as string;

  // --------------------------------------------------------------------------------

  const Login = lazy(() => import('./pages/Login'));
  const Dashboard = lazy(() => import('./pages/Dashboard'));

  const Data = lazy(() => import('./pages/info/Data'));
  const User = lazy(() => import('./pages/info/User'));
  const Server = lazy(() => import('./pages/info/Server'));
  const License = lazy(() => import('./pages/info/License'));
  const Sheet = lazy(() => import('./pages/info/Sheet'));
  const Group = lazy(() => import('./pages/info/Group'));

  const NotFound = lazy(() => import('./pages/404'));
  // const Forbidden = lazy(() => import('./pages/403'));

  // --------------------------------------------------------------------------------

  return (
    <ThemeProvider>
      <div className="app">
        <Suspense fallback={ <Spinner /> }>
          <Routes>
            <Route path="/" element={ <ProtectedRoute isLogin={ authentificated.user.isLogin } /> }>
              <Route path="/dashboard" element={ <Dashboard /> } />
              <Route path="/data" element={ <Data /> } />
              <Route path="/user" element={ <User /> } />
              <Route path="/server" element={ <Server /> } />
              <Route path="/license" element={ <License /> } />
              <Route path="/sheet" element={ <Sheet /> } />
              <Route path="/group" element={ <Group /> } />
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
