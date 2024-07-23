import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { reduxForm } from 'redux-form'
import { useSelector } from 'react-redux'
import InputField from '../../commonComponents/forms/InputField'
import SelectField from '../../commonComponents/forms/SelectField'
import addUserAction from './addUser.action'
import validateAddUserForm from './validateAddUserForm'
import validateEmail from '../../commonComponents/forms/validations/validateEmail'

function AddUserModal({
  showModal,
  handleModal,
  updateUsers,
  setNewUserAdded,
  initialize,
  handleSubmit
}) {
  const userInfo = useSelector((state) => state.currentUserInfo)
  const [userExsit, setUserExist] = useState(false)
  const [areEmailsDifferent, setAreEmailsDifferent] = useState(false)

  useEffect(() => {
    setAreEmailsDifferent(false)
    initialize({
      invitee_first_name: '',
      invitee_last_name: '',
      invitee_email: '',
      retype_invitee_email: '',
      department: '',
      title: ''
    })
  }, [showModal])

  const addUserInfo = useSelector(
    (state) => state.form.addUser && state.form.addUser.values
  )
  const departments = [{ abbreviation: 'OSBP MPP' }]
  const roles = [{ abbreviation: 'Admin' }, { abbreviation: 'Support' }]

  const addUser = async () => {
    const { invitee_email, retype_invitee_email } = addUserInfo
    const validate = validateAddUserForm(addUserInfo)

    const emailsStatus = invitee_email != retype_invitee_email
    setAreEmailsDifferent(emailsStatus)

    if (!validate || emailsStatus) return
    const { status } = validate && (await addUserAction(addUserInfo, userInfo))

    if (status === 400) {
      setUserExist(true)
    } else {
      setUserExist(false)
      validateAddUserForm(addUserInfo) && handleModal()
      updateUsers()
      setNewUserAdded(addUserInfo)
      setTimeout(() => {
        setNewUserAdded(null)
      }, 5000)
    }
  }

  return (
    <Modal show={showModal} onHide={handleModal} aria-labelledby="add-new-user-container" centered>
      <form onSubmit={handleSubmit(addUser)}>
        <Modal.Header className='dialog_header' closeButton>
          <Modal.Title className='w-100'>
            <h1 id="add-new-user-container" className="modal-heading">
              Add New User
            </h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {userExsit && (
            <div className='erorr-red ml-5 pl-4'>User Already exists</div>
          )}
          <div className='row mb-1'>
            <div className='col-6'>
              <div className='row'>
                <div className='col-12'>

                  <InputField
                    name='invitee_first_name'
                    placeholder={'First Name'}
                    id='first-name'
                    value={addUserInfo && addUserInfo['invitee_first_name']}
                    required={true}
                  />
                </div>
              </div>
            </div>
            <div className='col-6'>
              <div className='row'>
                <div className='col-12'>

                  <InputField
                    name='invitee_last_name'
                    placeholder={'Last Name'}
                    id='last-name'
                    value={addUserInfo && addUserInfo['invitee_last_name']}
                    required={true}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='row mb-1'>
            <div className='col-12'>

              <InputField
                name='invitee_email'
                placeholder={'Email Address'}
                id='email-address'
                value={addUserInfo && addUserInfo['invitee_email']}
                validation={validateEmail}
                required={true}
                onCopy={true}
                onPaste={true}
                className={
                  areEmailsDifferent
                    ? 'form-control different_invitee_emails'
                    : 'form-control'
                }
              />
            </div>
          </div>

          <div className='row mb-1'>
            <div className='col-12'>

              <InputField
                name='retype_invitee_email'
                // id='email-address'
                id='retype-email-address'
                placeholder={'Confirm Email Address'}
                value={addUserInfo && addUserInfo['retype_invitee_email']}
                validation={validateEmail}
                required={true}
                onCopy={true}
                onPaste={true}
                className={
                  areEmailsDifferent
                    ? 'form-control different_invitee_emails'
                    : 'form-control'
                }
              />
            </div>
          </div>

          <div className='row mb-2'>
            <div className='col-6'>
              <div className='row'>
                <div className='col-12'>

                  <SelectField
                    name='department'
                    placeholder={'Department'}
                    id='department'
                    options={departments}
                    required={true}
                    value={addUserInfo && addUserInfo['department']}
                    defaultValue='Select'
                  />
                </div>
              </div>
            </div>
            <div className='col-6'>
              <div className='row'>
                <div className='col-12'>

                  <SelectField
                    name='title'
                    placeholder={'Role'}
                    id='role'
                    options={roles}
                    required={true}
                    value={addUserInfo && addUserInfo['title']}
                    defaultValue='Select'
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='row mt-4 mb-2'>
            <div className='col-12'>
              <button className='btn btn-primary mx-2 my-2 focusable-item' type='submit'>
                Add New User
              </button>
            </div>
          </div>
        </Modal.Body>
      </form>
    </Modal>
  )
}

AddUserModal = reduxForm({
  form: 'addUser'
})(AddUserModal)

export default AddUserModal
