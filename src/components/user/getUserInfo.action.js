import settings from '../../config/settings'
import authHeader from '../authHeader'

async function getUserInfo(accessToken) {

  const authenticationHeader = authHeader()
  const url = settings.devUrl + '/users/current/'

  const rawResponse = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ access_token: accessToken }),
    headers: { 'Content-Type': 'application/json', ...authenticationHeader }
  }).catch(() => {
    window.location.replace('#/failureReport')
    return
  })

  if (rawResponse && rawResponse.status >= 200 && rawResponse.status < 400) {
    const apiData = await rawResponse.json()
    const { status } = rawResponse
    return { status, apiData }
  }
  else {
    window.location.replace('#/failureReport')
    return
  }
}

export default getUserInfo
