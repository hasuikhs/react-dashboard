import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useNavigate, NavigateFunction, Navigate, Outlet, useLocation, Location } from 'react-router-dom';
import { useSelector } from 'react-redux';

import API from './common/API';
import Swal from 'sweetalert2';
import { RootState } from './modules';
import { Auth } from './modules/auth';

function App(): JSX.Element {

  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();

  const authentificated = useSelector<RootState>(state => state.auth) as Auth;

  useEffect(() => {
    console.log('location');
  }, [ location ]);

  const checkToken = async () => {
    try {
      await API.post('/token/check');
    } catch(err) {
      return Swal.fire({
        title: '로그인 세션이 만료되었습니다.',
        icon: 'error',
        confirmButtonText: '확인',
        didClose: () => {
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('user');
          navigate('/login');
        }
      });
    }
  }

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
