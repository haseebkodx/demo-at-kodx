import settings from '../../../../config/settings'
import authHeader from '../../../authHeader'

const getInvitationList = async (uuid) => {
  const url = settings.devUrl + `/users/mentor/invites/`

  const rawResponse = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ inviter_uuid: uuid }),
    headers: { 'Content-Type': 'application/json', ...authHeader() }
  })

  const apiData = await rawResponse.json()
  const { status } = rawResponse
  return { status, apiData }
}

export default getInvitationList