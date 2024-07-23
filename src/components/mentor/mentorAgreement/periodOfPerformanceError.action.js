import { SET_PERIOD_OF_PERFORMANCE_ERROR } from './mentorAgreement.types';
export default function loadingAction(error) {
  return ({
    type: SET_PERIOD_OF_PERFORMANCE_ERROR,
    payload: error
  })

}