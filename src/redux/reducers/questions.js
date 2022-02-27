import { SET_INITIAL_STATE } from '../actionTypes';

const initialState = [];

function questionsReducer(state=initialState, action) {
  if (action.type === SET_INITIAL_STATE) {
    return action.data;
  }
  return state;
}

export default questionsReducer;