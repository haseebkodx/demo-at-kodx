import { SET_APPROVED_AGREEMENT } from './approveDecline.type'

export default function (state = {}, action) {
  switch (action.type) {
    case SET_APPROVED_AGREEMENT:
      return action.payload
    default:
      return state;
  }
}