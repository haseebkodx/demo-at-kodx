import settings from '../../config/settings'
import authHeader from '../authHeader'

const setApproveOrDeclineMentorApplicaiton = async ({
  uuid,
  approved,
  reason
}) => {
  const url = settings.devUrl + `/mentorApp/decision/${uuid}`
  const authenticationHeader = authHeader()

  const rawResponse = await fetch(url, {
    method: 'put',
    body: JSON.stringify({
      approved: approved,
      reason: reason,
      submitted: false
    }),
    headers: { 'Content-Type': 'application/json', ...authenticationHeader }
  })

  const response = await rawResponse.json()
  return response
}

export default setApproveOrDeclineMentorApplicaiton
