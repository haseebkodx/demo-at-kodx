import settings from '../../config/settings'
import authHeader from '../authHeader'

async function getAllMentorProtegeAgreementsCount() {

  const url = settings.devUrl + '/agreement/count'

  const rawResponse = await fetch(url, {
    method: 'GET',
    headers: { ...authHeader(), 'Content-Type': 'application/json' }
  })

  const apiData = await rawResponse.json()
  const { status } = rawResponse
  return { status, apiData }
}

export default getAllMentorProtegeAgreementsCount