import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE
} from '../actions/authActions';

const initialState = {
  loading: false,
  error: null,
  user: null,
  token: localStorage.getItem('token') || null,
  role: localStorage.getItem('role') || null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case SIGNUP_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.name,
        token: action.payload.token,
        role: action.payload.role,
        error: null
      };
    case LOGIN_FAILURE:
    case SIGNUP_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}; 