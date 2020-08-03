import axios from 'axios';

import { FETCH_USER } from '../actions/types';

export const fetchUser = () => async dispatch => {
  const fetchRes = await axios.get('/api/current_user');

  dispatch({
    type: FETCH_USER,
    payload: fetchRes.data,
  });
};

export const hanldeStripeToken = token => async dispatch => {
  const postTokenRes = await axios.post('/api/stripe', token);

  dispatch({
    type: FETCH_USER,
    payload: postTokenRes.data,
  });
};
