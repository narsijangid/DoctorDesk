import axios from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const loginUser = (payload) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', payload);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('role', res.data.role);

     console.log('Login success ✅');
  } catch (err) {
    dispatch({ type: LOGIN_FAILURE, payload: err.response?.data?.message || 'Login failed' });
  }
};

export const signupUser = (payload) => async (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });
  try {
    const res = await axios.post('http://localhost:5000/api/auth/register', payload);
    dispatch({ type: SIGNUP_SUCCESS, payload: res.data });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('role', res.data.role);
  } catch (err) {
    dispatch({ type: SIGNUP_FAILURE, payload: err.response?.data?.message || 'Signup failed' });
  }
}; 