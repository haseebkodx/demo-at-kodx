import settings from '../../../config/settings'
import authHeader from '../../authHeader'

async function changeStatus(uuid, active) {

  const authenticationHeader = authHeader()
  const url = settings.devUrl + '/users/updateStatus/'

  const rawResponse = await fetch(url, {
    method: "post",
    body: JSON.stringify({ uuid: uuid, active: active === true ? false : true }),
    headers: { 'Content-Type': 'application/json', ...authenticationHeader }
  })


  const result = await rawResponse.json()
  return result
}

export default changeStatus
