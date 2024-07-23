import settings from '../../config/settings'
import authHeader from '../authHeader'

async function getAllMentorApplications(payload) {
  const url = settings.devUrl + `/mentorApp/all/`
  const rawResponse = await fetch(url, {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: payload
  })

  const apiData = await rawResponse.json()
  const { status } = rawResponse
  return { status, apiData }
}

export default getAllMentorApplications
