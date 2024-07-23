import settings from '../../config/settings'
import authHeader from '../authHeader'
import setPhoneFormat from '../../helpers/formatter/setPhoneFormat'

async function saveUserInfo(firstName, lastName, phone, title) {

  const authenticationHeader = authHeader()
  const url = settings.devUrl + '/users/updateContact/'
  phone = phone.replace(/[() ]/g, '')

  const rawResponse = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ first_name: firstName, last_name: lastName, phone: setPhoneFormat(phone), title: title }),
    headers: { 'Content-Type': 'application/json', ...authenticationHeader }
  })

  const apiData = await rawResponse.json()
  const { status } = rawResponse
  return { status, apiData }
}

export default saveUserInfo
