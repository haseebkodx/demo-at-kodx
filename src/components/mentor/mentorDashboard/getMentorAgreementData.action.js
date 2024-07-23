import authHeader from '../../authHeader'
import settings from '../../../config/settings'

const getMentorAgreementData = async (uuid) => {
  const authenticationHeader = authHeader()
  const url = settings.devUrl + `/mentorAgr/${uuid}`

  const rawResponse = await fetch(url, {
    method: "GET",
    headers: { 'Content-Type': 'application/json', ...authenticationHeader }
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

export default getMentorAgreementData