import { LOGIN, LOGOUT, SIGNUP } from '../actions/auth';

const initialState = {
  loggedIn: false,
  isLoading: true,
  userToken: null,
  userId: null
}

export default (state = initialState, action) => {
  switch(action.type) {
    case LOGIN:
      return {
        ...initialState,
        loggedIn: true,
        userToken: action.userToken,
        userId: action.userId
      }
    case SIGNUP:
      return {
        ...initialState,
        loggedIn: true,
        userToken: action.userToken,
        userId: action.userId
      }
    case LOGOUT:
      return {
        ...initialState,
        loggedIn: false,
        userToken: null
      }
    default:
      return state;
  }
}