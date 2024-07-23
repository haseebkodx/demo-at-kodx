import authHeader from '../../authHeader'
import settings from '../../../config/settings'

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

  if (rawResponse.status >= 200 && rawResponse.status < 400) {
    const result = await rawResponse.json()
    return result
  }
  else {
    window.location.replace('#/failureReport')
    return
  }
}

export default getProtegeAgreementData