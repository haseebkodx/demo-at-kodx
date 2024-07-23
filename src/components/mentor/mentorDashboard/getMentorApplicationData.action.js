import settings from '../../../config/settings'
import authHeader from '../../authHeader'

const getMentorApplication = async (uuid) => {

  const url = settings.devUrl + `/mentorApp/${uuid}`

  const rawResponse = await fetch(url, {
    method: 'GET',
    headers: authHeader()
  }).catch(() => {
    window.location.replace('#/failureReport')
    return
  })

  if (rawResponse && rawResponse.status >= 200 && rawResponse.status < 400) {
    const apiData = rawResponse && await rawResponse.json()
    const status = rawResponse && rawResponse.status
    return { status, apiData }
  }
  else {
    window.location.replace('#/failureReport')
    return
  }
}

export default getMentorApplication