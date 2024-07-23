import authHeader from './authHeader'
import settings from '../config/settings'
import { SET_CURRENT_PROFILES_INFO } from './auth.type';

const getCurrentUserInfo = (accessToken) => async dispatch => {
  const authenticationHeader = authHeader()
  const url = settings.devUrl + '/users/current/'

  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ access_token: accessToken }),
    headers: { 'Content-Type': 'application/json', ...authenticationHeader }
  })

  dispatch({ type: SET_CURRENT_PROFILES_INFO, payload: await res.json() })
}

export default getCurrentUserInfo
