import { SET_LOADING } from './auth.type';
export default function loadingAction(loading) {
  return ({
    type: SET_LOADING,
    payload: loading
  })

}