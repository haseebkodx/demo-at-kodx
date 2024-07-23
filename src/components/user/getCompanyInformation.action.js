import settings from '../../config/settings'
import authHeader from '../authHeader'

const getCompanyInformation = async (code) => {

  const url = settings.devUrl + `/company/v2/${code}`
  const rawResponse = await fetch(url, {
    method: 'GET',
    headers: authHeader()
  }).catch(() => {
    window.location.replace('#/failureReport')
    return
  })

  if (rawResponse.status >= 200 && rawResponse.status < 400) {

    const response = await rawResponse.json()
    return response
  }
  else {
    window.location.replace('#/failureReport')
    return
  }
}

export default getCompanyInformation