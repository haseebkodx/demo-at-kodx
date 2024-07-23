import validateEmail from '../../commonComponents/forms/validations/validateEmail'
const validateAddUserForm = (addUserInfo) => {
  const requiredField = [
    'invitee_email',
    'department',
    'title',
    'invitee_first_name',
    'invitee_last_name'
  ]
  const requiredFieldValidate = requiredField.find((field) => (addUserInfo && addUserInfo[field] === undefined))
  const validateFormat = addUserInfo && validateEmail(addUserInfo['invitee_email'])

  return requiredFieldValidate === undefined && validateFormat
}

export default validateAddUserForm

