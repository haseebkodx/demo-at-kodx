import { SET_PERIOD_OF_PERFORMANCE_ERROR } from './mentorAgreement.types';

export default function (state = {}, action) {
  switch (action.type) {
    case SET_PERIOD_OF_PERFORMANCE_ERROR:
      return action.payload ? action.payload : {}
    default:
      return state;
  }
}