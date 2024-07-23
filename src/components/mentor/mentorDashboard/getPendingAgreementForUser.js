import settings from '../../../config/settings'
import authHeader from '../../authHeader'

const getPendingAgreementsForUser = async (userEmail) => {

  const url = settings.devUrl + `/users/protege/invites/`

  const rawResponse = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify({
      invitee_email: userEmail
    })
  }).catch(() => {
    window.location.replace('#/failureReport')
    return
  }).catch(() => {
    window.location.replace('#/failureReport')
    return
  })

  const response = rawResponse && await rawResponse.json()
  return response

}

export default getPendingAgreementsForUser