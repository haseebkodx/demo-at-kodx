import dateFormat from 'dateformat'
import moment from 'moment'

export const expiredInvitation = (invitation) => {
  const now = new Date()

  const currentDate = dateFormat(now, 'm/d/yyyy')

  const invitationLastUpdatedDate = dateFormat(
    invitation.updated_at,
    'm/d/yyyy'
  )

  const durationDays = 3

  const nowDate = moment(currentDate)
  const updatedDate = moment(invitationLastUpdatedDate)
  const calculatedDuration = nowDate.diff(updatedDate, 'days')

  if (calculatedDuration > durationDays) {
    return true
  }

  return false
}

export const expiredRedemption = (date) => {
  const now = new Date()

  const currentDate = dateFormat(now, 'm/d/yyyy')

  const durationDays = 3

  const nowDate = moment(currentDate)
  const updatedDate = moment(date)
  const calculatedDuration = nowDate.diff(updatedDate, 'days')

  if (calculatedDuration > durationDays) {
    return true
  }

  return false
}
