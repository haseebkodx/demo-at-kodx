import settings from '../../../config/settings'
import authHeader from '../../authHeader'

const fileData = async (id) => {
  const url = settings.devUrl + `/file/${id}`

  const rawResponse = await fetch(url, {
    method: 'GET',
    headers: authHeader()
  })

  const response = await rawResponse.blob();
  return response

}

export default fileData