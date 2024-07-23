import settings from '../../../../config/settings'
import authHeader from '../../../authHeader'

const resendInvitation = async ({
  invitation_token,
  inviter_email,
  inviter_first_name,
  inviter_last_name,
  invitee_email,
  invitee_role_id
}) => {
  const url = (settings.devUrl = `/reinvite/`)
  const authenticationHeader = authHeader()
  // try {
  let rawResponse = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      invitation_token: invitation_token,
      inviter_email: inviter_email,
      inviter_first_name: inviter_first_name,
      inviter_last_name: inviter_last_name,
      invitee_email: invitee_email,
      invitee_role_id: invitee_role_id
    }),
    headers: { 'Content-Type': 'application/json', ...authenticationHeader }
  })

  const apiData = await rawResponse.json()
  const { status } = rawResponse
  return { status, apiData }
}

export default resendInvitation
