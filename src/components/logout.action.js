import settings from '../config/settings'
import authHeader from './authHeader'
const logout = async () => {

  const url = settings.devUrl + '/users/logout'

  const rawResponse = await fetch(url, {
    method: 'get',
    headers: authHeader()
  })

  const response = await rawResponse.json()
  return response
}

export default logout