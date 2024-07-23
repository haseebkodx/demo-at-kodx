const authHeader = () => {
  const headers = {}

  const localStorage = window.localStorage
  const userInfo = JSON.parse(localStorage.getItem('user_info'))
  const token = userInfo && userInfo.token.id_token
  headers['Authorization'] = `Bearer ${token}`

  return headers
}

export default authHeader
