import settings from '../../../config/settings'
import authHeader from '../../authHeader'

const setDocusignPdfEnvelope = async envelopeId => {
    const url = settings.devUrl + `/esign/envelope/${envelopeId}`
    const authenticationHeader = authHeader()
  
    const response = await fetch(url, {
        headers: { 'Content-Type': 'application/pdf', ...authenticationHeader }
    })

    return await response.blob()
}

export default setDocusignPdfEnvelope