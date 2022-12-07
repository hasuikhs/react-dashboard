import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, Persistor } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './modules';

import { HelmetProvider } from 'react-helmet-async';

// --------------------------------------------------------------------------------

const store = createStore(
  rootReducer,
  composeWithDevTools()
);
const persistor: Persistor = persistStore(store);

const root: ReactDOM.Root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// --------------------------------------------------------------------------------

root.render(
  <Provider store={ store }>
    <PersistGate loading={ null } persistor={ persistor }>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </PersistGate>
  </Provider>
);