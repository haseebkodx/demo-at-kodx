import settings from '../../../config/settings'
import authHeader from '../../authHeader'

async function addUser(addUserInfo, userInfo) {

  const authenticationHeader = authHeader()
  const url = settings.devUrl + '/users/reviewer/invite/'

  const rawResponse = await fetch(url, {
    method: "post",
    body: JSON.stringify({
      ...addUserInfo,
      inviter_uuid: userInfo && userInfo.uuid,
      inviter_email: userInfo && userInfo.email,
      inviter_first_name: userInfo && userInfo.first_name,
      inviter_last_name: userInfo && userInfo.last_name
    }),
    headers: { 'Content-Type': 'application/json', ...authenticationHeader }
  })

  const apiData = await rawResponse.json()
  const { status } = rawResponse
  return { status, apiData }
}

export default addUser
