import settings from '../config/settings'

const login = async (invitationToken) => {

  const url = settings.devUrl + `/users/login${invitationToken ? `?invitation_token=${invitationToken}` : ''}`

  const rawResponse = await fetch(url, {
    method: 'GET',
  }).catch(() => {
    window.location.replace('#/failureReport')
    return
  })

  if (rawResponse && rawResponse.status >= 200 && rawResponse.status <= 400) {
    const response = await rawResponse.json()
    return response
  }
  else {
    window.location.replace('#/failureReport')
    return
  }

}

export default login