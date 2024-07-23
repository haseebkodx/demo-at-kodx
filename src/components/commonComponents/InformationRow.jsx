import { TextField } from '@material-ui/core'
import React from 'react'
import formatPhone from '../../helpers/formatter/formatPhone'

const InformationRow = ({ 
  label, 
  detail, 
  isMentorSubmittedCard = false, 
  isEditable=false, 
  isPhone=false,
  onEdit=()=>{} 
}) => {

  const [value, setValue] = React.useState(detail)

  const statusDesign =
    detail === 'Declined'
      ? 'declined-app'
      : detail === 'Approved'
        ? 'approved-app'
        : detail === 'Pending'
          ? 'pending-app'
          : ''

  const nonEditableValueField = (value) => 
    <div
      className={isMentorSubmittedCard
        ? `col-xs-10 pl-3 ${statusDesign}`
        : `col-sm-9 text-left pl-0 ${statusDesign}`
      }
    >
      {value}
    </div>

  const editablePhoneValueField = (label, value, onEdit) => 
  <TextField 
      label={label} 
      variant="outlined" 
      margin="dense"
      type="phone"
      value={value}
      InputProps={{
        inputMode: 'numeric', // Allow only numeric input
      }}
      onChange={(event) => {
        const formattedValue = formatPhone(event.target.value);
        setValue(formattedValue);
        onEdit(formattedValue);
      }}
    />

  const editableValueField = (label, value, onEdit) => 
  <TextField 
    className={statusDesign} 
    label={label} 
    variant="outlined" 
    margin="dense"
    type="phone"
    onChange={(event) => {
      onEdit(event.target.value);
    }}
  />

  return (
    <div>
      <div
        className={
          isMentorSubmittedCard
            ? 'row py-2 d-flex flex-wrap information-row'
            : 'row d-flex flex-wrap'
        }
      >
        {isMentorSubmittedCard ? (
          <div className='col-xs-3 information-label'>
            <strong>{label}</strong>:
          </div>
        ) : (
            <div className='col-sm-3 text-left d-flex'>
              <div className='col-md-10 px-0'>
                <strong>{label} :</strong>
              </div>
            </div>
          )}
        {isEditable ? 
          isPhone ? editablePhoneValueField(label, value, onEdit) : editableValueField(label, value, onEdit) : 
          nonEditableValueField(detail)
        }
      </div>
    </div>
  )
}

export default InformationRow