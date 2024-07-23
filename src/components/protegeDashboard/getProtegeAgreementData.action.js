import authHeader from '../authHeader'
import settings from '../../config/settings'

const getProtegeAgreementData = async (uuid) => {
  const authenticationHeader = authHeader()
  const url = settings.devUrl + `/protegeAgr/${uuid}`

  const rawResponse = await fetch(url, {
    method: "GET",
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

export default getProtegeAgreementData