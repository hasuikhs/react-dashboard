import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes';

function App(): JSX.Element {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
