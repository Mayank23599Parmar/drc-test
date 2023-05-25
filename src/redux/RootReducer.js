import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './user/userReducer';
const presistConfig = {
  key: 'root',
  storage,
  whitelist: [],
};
const rootReducer = combineReducers({
  user: userReducer,
});
export default persistReducer(presistConfig, rootReducer);
