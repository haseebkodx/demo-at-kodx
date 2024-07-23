import settings from '../config/settings'
import { SET_PROFILES_INFO } from './auth.type';

const auth = (code, state) => async dispatch => {

  const url = settings.devUrl + `/users/auth/`

  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ 'code': code, 'state': state }),
    headers: { 'Content-Type': 'application/json' }
  })

   dispatch({ type: SET_PROFILES_INFO, payload: await res.json() })
}

export default auth
