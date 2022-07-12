import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from './routes';

function App(): JSX.Element {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
