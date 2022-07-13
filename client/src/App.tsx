import React, { Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import routes from './routes';

import Swal from 'sweetalert2';

import API from './common/API';

function App(): JSX.Element {

  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname !== '/login') {
      checkToken();
    }
  }, []);

  const checkToken = async () => {
    try {
      const ret = await API.post('/token/check');
    } catch(err) {
      Swal.fire({
        title: '로그인 세션이 만료되었습니다.',
        icon: 'error',
        confirmButtonText: '확인',
        didClose: () => {
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('isLogin');
          navigate('/login');
        }
      })
    }
  }

  return (
    <div className="app">
      <Suspense>
        <Routes>
          {
            routes.map(route => {
              return (
                <Route 
                  key={ route.path ? route.path : null }
                  path={ route.path }
                  element={ <route.component /> }
                />
              );
            })
          }
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
