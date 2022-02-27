import { SET_IMAGE } from '../actionTypes';

const initialState = [];

function imagesReducer(state=initialState, action) {
  if (action.type === SET_IMAGE) {
    return [...state, action.imageURL];
  }
  return state;
}

export default imagesReducer;