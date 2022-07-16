import React, { lazy, Suspense, useState } from 'react';
import { Routes, Route, useNavigate, NavigateFunction, Navigate, Outlet } from 'react-router-dom';

import CustomAlert from './components/CustomAlert';

import API from './common/API';

function App(): JSX.Element {

  const navigate: NavigateFunction = useNavigate();

  const [user, setUser] = useState(null);
  const authentificated = user != null;

  const checkToken = async () => {
    try {
      const ret = await API.post('/token/check');
    } catch(err) {
      CustomAlert({
        title: '로그인 세션이 만료되었습니다.',
        icon: 'error',
        didCloseCallback: () => {
          sessionStorage.removeItem('token');
          navigate('/login');
        }
      });
    }
  }

  const Login = lazy(() => import('./pages/Login'));
  const Home = lazy(() => import('./pages/Home'));
  const NotFound = lazy(() => import('./pages/404'));

  return (
    <div className="app">
      <Suspense fallback={ <p>Loading...</p> }>
        <Routes>
          <Route path="/" element={ <ProtectedRoute /> }>
            <Route path="/" element={ <Home /> } />
          </Route>
          <Route path="/login" element={ <Login /> } />
          <Route path="*" element={ <NotFound /> } />
        </Routes>
      </Suspense>
    </div>
  );
}

function ProtectedRoute(): JSX.Element {
  const authentificated: boolean = false;

  return authentificated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default App;
