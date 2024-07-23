import settings from '../../config/settings'
import authHeader from '../authHeader'

// get only Eccalon users
export const getOnlyEccalonUsers = async () => {
  const url = settings.devUrl + `/users/ecc/`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: authHeader()
    })

    const data = await response.json()

    return data
  } catch (err) {
    return {
      errorMessage: `There was an error. ${err}`
    }
  }
}

// update role of only Eccalon user
export const updateRoleOfEccalonUser = async (uuid, role) => {
  const url = settings.devUrl + `/users/ecc/update/`

  const urlencoded = new URLSearchParams()
  urlencoded.append('uuid', uuid)
  urlencoded.append('role', role)

  try {
    // switch existing reviewer to user
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...authHeader()
      },
      body: urlencoded
    })

    const data = await response.json()

    return data
  } catch (err) {
    return {
      errorMessage: `There was an error. ${err}`
    }
  }
}
