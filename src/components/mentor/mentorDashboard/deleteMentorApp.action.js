import settings from '../../../config/settings'
import authHeader from '../../authHeader'

const deleteMentorApp = async (uuid) => {

  const url = settings.devUrl + `/mentorApp/delete/`
  const authenticationHeader = authHeader()

  const rawResponse = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ id: uuid }),
    headers: { 'Content-Type': 'application/json', ...authenticationHeader }
  })

  const apiData = await rawResponse.json()
  const { status } = rawResponse
  return { status, apiData }
}

export default deleteMentorApp
