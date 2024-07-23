import settings from '../../config/settings'
import authHeader from '../authHeader'

export const saveCompanyInfo = async payload => {

  const authenticationHeader = authHeader()
  const url = settings.devUrl + `/company/`

  const rawResponse = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json', ...authenticationHeader }
  })

  const apiData = await rawResponse.json()
  const { status } = rawResponse
  return { status, apiData }
}