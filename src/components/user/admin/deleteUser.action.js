import settings from "../../../config/settings"
import authHeader from "../../authHeader"

const deleteUser = async (invitation_token) => {
  const authenticationHeader = authHeader()
  const url = settings.devUrl + "/users/delete/invite/"

  const response = await fetch(`${url}`, {
    method: "post",
    headers: { "Content-Type": "application/json", ...authenticationHeader },
    body: JSON.stringify({ invitation_token })
  })

  const { status } = response
  return { status }
}

export default deleteUser
