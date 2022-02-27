import { SET_IMAGE, SET_INITIAL_STATE } from '../actionTypes';

const initialState = [];

function imagesReducer(state=initialState, action) {
  if (action.type === SET_IMAGE) {
    return [...state, action.imageURL];
  } else if (action.type === SET_INITIAL_STATE) {
    return initialState;
  }
  return state;
}

export default imagesReducer;