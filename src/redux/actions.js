import data from './initialState.json';
import { SET_INITIAL_STATE } from './actionTypes';

export const setInitialState = () => {
  return {
    type: SET_INITIAL_STATE,
    data
  }
};