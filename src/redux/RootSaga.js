import { all, call } from 'redux-saga/effects';
import { userSaga } from './user/userSaga';
export function* rootSaga() {
  yield all([call(userSaga)]);
}
