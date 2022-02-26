import data from './initialState.json';
import { SET_INITIAL_STATE } from './actionTypes';
import shuffle from '../utils/shuffle';

export const setInitialState = () => {
  return {
    type: SET_INITIAL_STATE,
    data: shuffle(data)
  }
};