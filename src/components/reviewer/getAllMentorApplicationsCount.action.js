import settings from '../../config/settings'
import authHeader from '../authHeader'

async function getAllMentorApplicationsCount() {

  const url = settings.devUrl + '/mentorApp/count'

  const rawResponse = await fetch(url, {
    method: 'get',
    headers: authHeader()
  })

  const apiData = await rawResponse.json()
  const { status } = rawResponse
  return { status, apiData }

}

export default getAllMentorApplicationsCount