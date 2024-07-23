import settings from '../../../config/settings'
import authHeader from '../../authHeader'

// get all mentor application files
export const getAllMentorFiles = async (appId) => {
  const url = settings.devUrl + `/file/mentorapp/${appId}`

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: authHeader()
    })

    const data = await res.json()

    const filesArray = data[0].json_agg

    return {
      status: 'Success',
      data: filesArray
    }
  } catch (err) {
    return {
      status: 'Error',
      errorMessage: `There was an error. ${err}`
    }
  }
}

// get all agreement files by agreement and user role
export const getAllFilesByAgreementAndType = async (
  mentor_app_id,
  agreement_type
) => {
  const url =
    settings.devUrl + `/file/agreement/${mentor_app_id}/${agreement_type}`

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: authHeader()
    })

    const data = await res.json()

    const filesArray = data[0].json_agg

    return {
      status: 'Success',
      data: filesArray
    }
  } catch (err) {
    return {
      status: 'Error',
      errorMessage: `There was an error. ${err}`
    }
  }
}
