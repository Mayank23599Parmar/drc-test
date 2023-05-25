import { takeLatest, put, call, all } from 'redux-saga/effects';
import userTypes from './userTypes';
import {
  setDeleteUserTodo,
  setEditUserTodo,
  setUserData,
  setUserTodo,
} from './userActions';

function* createUserData(action) {
  yield put(setUserData(action.payload));
}

function* setUserDataActions() {
  yield takeLatest(userTypes.CREATE_USER, createUserData);
}
function* addUserTodoAction(action) {
  yield put(setUserTodo(action.payload));
}

function* setUserTodoAction() {
  yield takeLatest(userTypes.ADD_USER_TODO, addUserTodoAction);
}
function* deleteUserTodoAction(action) {
  yield put(setDeleteUserTodo(action.payload));
}

function* setDeleteUserTodoAction() {
  yield takeLatest(userTypes.DELETE_USER_TODO, deleteUserTodoAction);
}
function* editUserTodoAction(action) {
  yield put(setEditUserTodo(action.payload));
}

function* setEditUserTodoAction() {
  yield takeLatest(userTypes.EDIT_USER_TODO, editUserTodoAction);
}
export function* userSaga() {
  yield all([
    call(setUserDataActions),
    call(setUserTodoAction),
    call(setDeleteUserTodoAction),
    call(setEditUserTodoAction),
  ]);
}
