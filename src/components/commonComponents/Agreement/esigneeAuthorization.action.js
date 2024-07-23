import settings from '../../../config/settings'
import authHeader from '../../authHeader'

const saveEsigneeAuthorizationAction = async esigneePayload => {

    const authenticationHeader = authHeader()
    const url = settings.devUrl + '/esign/'

    const response = await fetch(`${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authenticationHeader },
        body: JSON.stringify(esigneePayload)
    })

    return await response.json()
}

export default saveEsigneeAuthorizationAction
