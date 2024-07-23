import settings from '../../../config/settings'
import authHeader from '../../authHeader'
const getEsignAgreementReview = async (agreementId, role, signedStatus) => {
    const authenticationHeader = authHeader()
    const url = settings.devUrl + '/esign'
    const esignResponse = await fetch(`${url}/${agreementId}/${role}/${signedStatus}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', ...authenticationHeader }
    })
    const responseData = await esignResponse.json()
    const responseStatus = esignResponse.status
    return { status: responseStatus, data: responseData }
}
export default getEsignAgreementReview
