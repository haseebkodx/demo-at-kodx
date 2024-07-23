import settings from '../../../config/settings'
import authHeader from '../../authHeader'


async function requestProtegeForChanges(agrementId, reason) {


  const authenticationHeader = authHeader()
  const url = settings.devUrl + '/protegeAgr/rejected/'

  const rawResponse = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ agreement_id: agrementId, rejected_reason: reason }),
    headers: { 'Content-Type': 'application/json', ...authenticationHeader }
  }).catch(() => {
    window.location.replace('#/failureReport')
    return
  })

  const apiData = await rawResponse.json()
  const { status } = rawResponse
  return { status, apiData }
}

export default requestProtegeForChanges
