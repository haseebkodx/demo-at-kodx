import { SET_CURRENT_PROFILES_INFO } from './auth.type';

export default function (state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_PROFILES_INFO:
      return action.payload
    default:
      return state;
  }
}