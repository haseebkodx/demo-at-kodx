import settings from '../../../config/settings'
import authHeader from '../../authHeader'

async function getMentorProtegeAgreementData(agreementId) {

  const url = settings.devUrl + `/agreement/${agreementId}`

  const rawResponse = await fetch(url, {
    method: 'GET',
    headers: authHeader()
  })

  const result = await rawResponse.json()
  return result
}

export default getMentorProtegeAgreementData