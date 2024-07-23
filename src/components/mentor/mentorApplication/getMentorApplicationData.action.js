import settings from '../../../config/settings'
import authHeader from '../../authHeader'

const getMentorApplicationData = async (uuid) => {

  const url = settings.devUrl + `/mentorApp/${uuid}`

  const rawResponse = await fetch(url, {
    method: 'GET',
    headers: authHeader()
  }).catch(() => {
    window.location.replace('#/failureReport')
    return
  })

  const apiData = rawResponse && await rawResponse.json()
  const status = rawResponse && rawResponse.status
  return { status, apiData }

}

export default getMentorApplicationData