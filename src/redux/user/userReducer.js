import userTypes from './userTypes';
const INITIAL_VALUE = {
  userData: [
    {
      name: 'Shreyansh',
      email: 'mayanklucent@gmail.com',
      password: '123456',
      id: 123,
    },
  ],
  todosData: [
    {
      userId: 123,
      id: 1,
      title: 'First todo',
      description: 'Hello from todo 1',
      timeStamp: 1685035395985,
    },
  ],
  loggedUser: {},
  // blogLoading: true,
};
const userReducer = (state = INITIAL_VALUE, action) => {
  switch (action.type) {
    case userTypes.CREATE_USER:
      return {
        ...state,
        userData: [...state.userData, action.payload],
      };
    case userTypes.SET_LOGGED_USER:
      return {
        ...state,
        loggedUser: action.payload,
      };
    case userTypes.SET_USER_TODO:
      return {
        ...state,
        todosData: [...state.todosData, action.payload],
      };
    case userTypes.SET_DELETE_USER_TODO:
      return {
        ...state,
        todosData: [action.payload],
      };
    case userTypes.SET_EDIT_USER_TODO:
      return {
        ...state,
        todosData: action.payload,
      };
    default:
      return state;
  }
};
export default userReducer;
