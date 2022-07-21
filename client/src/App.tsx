import React, { lazy, Suspense } from 'react';
import { Routes, Route, useNavigate, NavigateFunction, Navigate, Outlet, useLocation, Location } from 'react-router-dom';
import { useSelector } from 'react-redux';

import API, { requestAPI } from './common/API';
import { RootState } from './modules';
import { Auth } from './modules/auth';

import Spinner from './components/Spinner';

function App(): JSX.Element {

  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();

  const authentificated: Auth = useSelector<RootState>(state => state.auth) as Auth;

  // useEffect(() => {
  //   const arr = ['/login', '/forbidden'];
  //   console.log(location.pathname)
  //   console.log(arr.includes(location.pathname))
  //   // if (!arr.includes(location.pathname)) {
  //   //   console.log('ttt')
  //   //   API.defaults.headers.common['Authorization'] = authentificated.token as string;
  //   //   requestAPI({
  //   //     type: 'POST',
  //   //     url: '/token/check',
  //   //     body: {},
  //   //     callback: () => navigate('/login')
  //   //   });
  //   // }
  // }, [authentificated.token, location.pathname, navigate]);

  // pages
  const Login = lazy(() => import('./pages/Login'));
  const Home = lazy(() => import('./pages/Home'));
  const User = lazy(() => import('./pages/User'));
  const Server = lazy(() => import('./pages/Server'));

  const NotFound = lazy(() => import('./pages/404'));
  const Forbidden = lazy(() => import('./pages/403'));

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
          <Route path="/403" element={ <Forbidden /> } />
        </Routes>
      </Suspense>
    </div>
  );
}

function ProtectedRoute({ isLogin = false }: { isLogin: boolean }): JSX.Element {
  return isLogin ? <Outlet /> : <Navigate to="/403" replace />;
}

export default App;
