import settings from '../../config/settings'
import authHeader from '../authHeader'

const sendAcceptDeclineReviewerInvitation = async (invitee_email, invitation_decision, invitation_token, id_token) => {
    const url = `${settings.devUrl}/users/reviewer/invitation/`
    const authenticationHeader = authHeader()
    authenticationHeader.Authorization = `Bearer ${id_token}`

    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            invitee_email,
            invitation_decision,
            invitation_token
        }),
        headers: { 'Content-Type': 'application/json', ...authenticationHeader }
    })

    const { status } = response
    const jsonResponse = await response.json()

    return { status, ...jsonResponse }
}

export default sendAcceptDeclineReviewerInvitation
