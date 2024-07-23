import settings from '../../../config/settings'
import authHeader from '../../authHeader'

const getInvitationList = async (offset, limit) => {

  const url = settings.devUrl + `/users/reviewers?limit=${limit}&offset=${offset}`

  const rawResponse = await fetch(url, {
    method: 'get',
    headers: authHeader()
  })

  const apiData = await rawResponse.json()
  const { status } = rawResponse
  return { status, apiData }
}

export default getInvitationList