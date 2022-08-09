import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';

import authReducer from './auth';
import rememberReducer from './remember';

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['auth']
}

const authPersistConfig = {
  key: 'auth',
  storage: storageSession
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  remember: rememberReducer
});

export default persistReducer(rootPersistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;