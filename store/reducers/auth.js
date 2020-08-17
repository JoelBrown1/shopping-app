import { LOGIN, LOGOUT } from '../actions/auth';

const initialState = {
  loggedIn: false,
  isLoading: true,
  userToke: null
}

export default (state = initialState, action) => {
  switch(action.type) {
    case LOGIN:
      return {
        ...initialState,
        loggedIn: true,
        userToke: action.token
      }
    case LOGOUT:
      return {
        ...initialState,
        loggedIn: false,
        userToke: null
      }
    default:
      return state;
  }
}