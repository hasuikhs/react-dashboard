import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useNavigate, NavigateFunction, Navigate, Outlet, useLocation, Location } from 'react-router-dom';
import { useSelector } from 'react-redux';

import API, { requestAPI } from './common/API';
import { RootState } from './modules';
import { Auth } from './modules/auth';

function App(): JSX.Element {

  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();

  const authentificated: Auth = useSelector<RootState>(state => state.auth) as Auth;

  useEffect(() => {
    if (location.pathname !== '/login') {
      API.defaults.headers.common['Authorization'] = authentificated.token as string;
      requestAPI({
        httpType: 'POST',
        url: '/token/check',
        body: {},
        callback: () => navigate('/login')
      });
    }
  }, [authentificated.token, location, navigate]);

  const Login = lazy(() => import('./pages/Login'));
  const Home = lazy(() => import('./pages/Home'));
  const NotFound = lazy(() => import('./pages/404'));
  const Forbidden = lazy(() => import('./pages/403'));

  return (
    <div className="app">
      <Suspense fallback={ <p>Loading...</p> }>
        <Routes>
          <Route path="/" element={ <ProtectedRoute isLogin={ authentificated.user.isLogin } /> }>
            <Route path="" element={ <Home /> } />
          </Route>
          <Route path="/login" element={ <Login /> } />
          <Route path="*" element={ <NotFound /> } />
          <Route path="/forbidden" element={ <Forbidden /> } />
        </Routes>
      </Suspense>
    </div>
  );
}

function ProtectedRoute({ isLogin = false }: { isLogin: boolean }): JSX.Element {
  return isLogin ? <Outlet /> : <Navigate to="/forbidden" replace />;
}

export default App;
