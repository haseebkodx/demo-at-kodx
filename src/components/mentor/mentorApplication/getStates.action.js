import settings from '../../../config/settings'
import authHeader from '../../authHeader'

const getStates = async () => {

  const url = settings.devUrl + '/utils/states'

  const rawResponse = await fetch(url, {
    method: 'GET',
    headers: authHeader()
  }).catch(() => {
    window.location.replace('#/failureReport')
    return
  })

  if (rawResponse && rawResponse.status >= 200 && rawResponse.status < 400) {
    const response = await rawResponse.json();
    return response
  }
  else {
    window.location.replace('#/failureReport')
    return
  }
}

export default getStates