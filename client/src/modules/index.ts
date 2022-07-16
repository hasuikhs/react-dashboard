import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

import authReducer from './auth';

const persistConfig = {
  key: 'root',
  storage: storageSession,
  whiteList: ['auth']
}

const rootReducer = combineReducers({
  auth: authReducer
});

export default persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;