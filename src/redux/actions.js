import data from './initialState.json';
import { SET_IMAGE, SET_INITIAL_STATE } from './actionTypes';
import shuffle from '../utils/shuffle';

export const setInitialState = () => {
  return {
    type: SET_INITIAL_STATE,
    data: shuffle(data)
  }
};

export const fetchImage = () => dispatch => {
  fetch('https://dog.ceo/api/breeds/image/random')
  .then(data => data.json())
  .then(response => {
    dispatch(fetchSucces(response.message));
  })
  // TODO: dispatch a separate type if the request fails
};

const fetchSucces = imageURL => {
  return {
    type: SET_IMAGE,
    imageURL
  }
};

export const setWrongImage = () => {
  return {
    type: SET_IMAGE,
    imageURL: 'wrong'
  }
}