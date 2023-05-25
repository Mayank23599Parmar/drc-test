import userTypes from './userTypes';

export const createUser = (data) => ({
  type: userTypes.CREATE_USER,
  payload: data,
});
export const setUserData = (data) => ({
  type: userTypes.SET_USER,
  payload: data,
});
export const setLoggedUserData = (data) => ({
  type: userTypes.SET_LOGGED_USER,
  payload: data,
});
export const fetchUserData = (data) => ({
  type: userTypes.FETCH_USER_DATA,
  payload: data,
});

export const addUserTodo = (data) => ({
  type: userTypes.ADD_USER_TODO,
  payload: data,
});
export const editUserTodo = (data) => ({
  type: userTypes.EDIT_USER_TODO,
  payload: data,
});

export const deleteUserTodo = (data) => ({
  type: userTypes.DELETE_USER_TODO,
  payload: data,
});
export const setUserTodo = (data) => ({
  type: userTypes.SET_USER_TODO,
  payload: data,
});
export const setDeleteUserTodo = (data) => ({
  type: userTypes.SET_DELETE_USER_TODO,
  payload: data,
});

export const setEditUserTodo = (data) => ({
  type: userTypes.SET_EDIT_USER_TODO,
  payload: data,
});
