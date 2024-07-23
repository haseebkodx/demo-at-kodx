import settings from '../../../config/settings'
import authHeader from '../../authHeader'
import { SET_APPROVED_AGREEMENT } from './approveDecline.type'

const setAcceptDeclineInvitaition = ({ invitationToken, invitation, title, roleName, uuid, email }) => async dispatch => {

  const authenticationHeader = authHeader()
  const url = settings.devUrl + '/users/protege/invitation/'

  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      invitation_token: invitationToken,
      invitation: invitation,
      title: title,
      role_name: roleName,
      uuid: uuid,
      email: email
    }),
    headers: { 'Content-Type': 'application/json', ...authenticationHeader }
  })

  dispatch({ type: SET_APPROVED_AGREEMENT, payload: await res.json() })
}

export default setAcceptDeclineInvitaition
