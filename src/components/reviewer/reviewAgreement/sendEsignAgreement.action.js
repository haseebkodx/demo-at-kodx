import settings from '../../../config/settings'
import authHeader from '../../authHeader'

const sendEsignAgreementReview = async (agreementId) => {

  const authenticationHeader = authHeader()
  const url = settings.devUrl + '/esign/'

  const esignResponse = await fetch(`${url}`, {
    method: 'POST',
    body: JSON.stringify({ agreementId: agreementId }),
    headers: { 'Content-Type': 'application/json', ...authenticationHeader }
  })

  const responseData = await esignResponse.json()
  const responseStatus = esignResponse.status

  return { status: responseStatus, data: responseData }
}

export default sendEsignAgreementReview
