import settings from '../../../../config/settings'
import authHeader from '../../../authHeader'

const sendMentorInvitation = async ({
  inviter_uuid,
  inviter_email,
  inviter_first_name,
  inviter_last_name,
  inviter_company,
  invitee_email }) => {
  const url = settings.devUrl + `/users/invite/`
  const authenticationHeader = authHeader()

  const rawResponse = await fetch(url, {
    method: 'post',
    body: JSON.stringify({
      inviter_uuid: inviter_uuid,
      inviter_email: inviter_email,
      inviter_first_name: inviter_first_name,
      inviter_last_name: inviter_last_name,
      inviter_company: inviter_company,
      invitee_email: invitee_email
    }),
    headers: { 'Content-Type': 'application/json', ...authenticationHeader }
  })

  const apiData = await rawResponse.json()
  const { status } = rawResponse
  return { status, apiData }
}

export default sendMentorInvitation
