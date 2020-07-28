import axios from 'axios';

import {FETCH_USER} from '../actions/types';

export const fetchUser = () => async dispatch => {

  const fetchRes = await axios.get('/api/current_user');

  // console.log(fetchRes.data)

  dispatch({
    type: FETCH_USER,
    payload: fetchRes.data,
  });

};
