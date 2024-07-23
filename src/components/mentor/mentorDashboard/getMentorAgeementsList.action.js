import settings from '../../../config/settings'
import authHeader from '../../authHeader'

const getMentorAgreementList = async () => {

  const url = settings.devUrl + `/agreement/AgrByMentor/`

  const rawResponse = await fetch(url, {
    method: 'GET',
    headers: authHeader()
  }).catch(() => {
    window.location.replace('#/failureReport')
    return
  })

  if (rawResponse && rawResponse.status >= 200 && rawResponse.status < 400) {
    const apiData = await rawResponse.json()
    const { status } = rawResponse
    return { status, apiData }
  }
  else {
    window.location.replace('#/failureReport')
    return
  }

}

export default getMentorAgreementList