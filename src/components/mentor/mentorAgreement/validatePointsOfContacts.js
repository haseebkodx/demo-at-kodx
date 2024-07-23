import { setPhoneFormat } from '../../../helpers/formatter/format'
import validateEmail from '../../commonComponents/forms/validations/validateEmail'

const validatePointOfContacts = (mentorAgreement) => {
  const hasCheckedAdditionaPorintOfContacts = mentorAgreement
    && mentorAgreement['has_additional_point_of_contact']
    && mentorAgreement['has_additional_point_of_contact'].toString() === 'true'

  const acorequiredFields =
    mentorAgreement &&
      mentorAgreement['aco_selected'] && hasCheckedAdditionaPorintOfContacts
      ? mentorAgreement['aco_title'] &&
      mentorAgreement['aco_name'] &&
      mentorAgreement['aco_address'] &&
      mentorAgreement['aco_city'] &&
      mentorAgreement['aco_state'] &&
      mentorAgreement['aco_zip'] &&
      mentorAgreement['aco_email'] &&
      mentorAgreement['aco_tel']
      : true

  const caorequiredFields =
    mentorAgreement &&
      mentorAgreement['cao_selected'] && hasCheckedAdditionaPorintOfContacts
      ? mentorAgreement['cao_title'] &&
      mentorAgreement['cao_name'] &&
      mentorAgreement['cao_address'] &&
      mentorAgreement['cao_city'] &&
      mentorAgreement['cao_state'] &&
      mentorAgreement['cao_zip'] &&
      mentorAgreement['cao_email'] &&
      mentorAgreement['cao_tel']
      : true

  const pcorequiredFields =
    mentorAgreement &&
      mentorAgreement['pco_selected'] && hasCheckedAdditionaPorintOfContacts
      ? mentorAgreement['pco_title'] &&
      mentorAgreement['pco_name'] &&
      mentorAgreement['pco_address'] &&
      mentorAgreement['pco_city'] &&
      mentorAgreement['pco_state'] &&
      mentorAgreement['pco_zip'] &&
      mentorAgreement['pco_email'] &&
      mentorAgreement['pco_tel']
      : true

  const dcmarequiredFields =
    mentorAgreement &&
      mentorAgreement['dcma_selected'] && hasCheckedAdditionaPorintOfContacts
      ? mentorAgreement['dcma_title'] &&
      mentorAgreement['dcma_name'] &&
      mentorAgreement['dcma_address'] &&
      mentorAgreement['dcma_city'] &&
      mentorAgreement['dcma_state'] &&
      mentorAgreement['dcma_zip'] &&
      mentorAgreement['dcma_email'] &&
      mentorAgreement['dcma_tel']
      : true

  const optionalRequiredFields =
    mentorAgreement &&
      mentorAgreement['mentor_signee_poc'] === 'new_mentor_signee_poc'
      ? mentorAgreement['signee_title'] &&
      mentorAgreement['signee_name'] &&
      mentorAgreement['signee_address'] &&
      mentorAgreement['signee_city'] &&
      mentorAgreement['signee_state'] &&
      mentorAgreement['signee_zip'] &&
      mentorAgreement['signee_email'] &&
      mentorAgreement['signee_tel']
      : true



  const pcoTel =
    mentorAgreement && mentorAgreement['pco_tel']
      ? setPhoneFormat(mentorAgreement['pco_tel']).length === 10
      : true
  const dcmaTel =
    mentorAgreement && mentorAgreement['dcma_tel']
      ? setPhoneFormat(mentorAgreement['dcma_tel']).length === 10
      : true
  const pcoFax =
    mentorAgreement && mentorAgreement['pco_fax']
      ? setPhoneFormat(mentorAgreement['pco_fax']).length === 10
      : true
  const dcmaFax =
    mentorAgreement && mentorAgreement['dcma_fax']
      ? setPhoneFormat(mentorAgreement['dcma_fax']).length === 10
      : true
  const acoTel =
    mentorAgreement && mentorAgreement['aco_tel']
      ? setPhoneFormat(mentorAgreement['aco_tel']).length === 10
      : true
  const acoFax =
    mentorAgreement && mentorAgreement['aco_fax']
      ? setPhoneFormat(mentorAgreement['aco_fax']).length === 10
      : true
  const caoTel =
    mentorAgreement && mentorAgreement['cao_tel']
      ? setPhoneFormat(mentorAgreement['cao_tel']).length === 10
      : true
  const caoFax =
    mentorAgreement && mentorAgreement['cao_fax']
      ? setPhoneFormat(mentorAgreement['cao_fax']).length === 10
      : true

  const acoZip =
    mentorAgreement && mentorAgreement['aco_zip']
      ? (mentorAgreement['aco_zip']).length === 5
      : true
  const dcmaZip =
    mentorAgreement && mentorAgreement['dcma_zip']
      ? (mentorAgreement['dcma_zip']).length === 5
      : true
  const caoZip =
    mentorAgreement && mentorAgreement['cao_zip']
      ? (mentorAgreement['cao_zip']).length === 5
      : true

  const pcoZip =
    mentorAgreement && mentorAgreement['pco_zip']
      ? (mentorAgreement['pco_zip']).length === 5
      : true

  const signeeZip =
    mentorAgreement && mentorAgreement['signee_zip']
      ? (mentorAgreement['signee_zip']).length === 5
      : true

  const pcoEmail =
    mentorAgreement && mentorAgreement['pco_email']
      ? validateEmail(mentorAgreement['pco_email'])
      : true
  const dcmaEmail =
    mentorAgreement && mentorAgreement['dcma_email']
      ? validateEmail(mentorAgreement['dcma_email'])
      : true
  const acoEmail =
    mentorAgreement && mentorAgreement['aco_email']
      ? validateEmail(mentorAgreement['aco_email'])
      : true
  const caoEmail =
    mentorAgreement && mentorAgreement['cao_email']
      ? validateEmail(mentorAgreement['cao_email'])
      : true

  const signeeTel =
    mentorAgreement && mentorAgreement['signee_tel']
      ? setPhoneFormat(mentorAgreement['signee_tel']).length === 10
      : true
  const signeeFax =
    mentorAgreement && mentorAgreement['signee_fax']
      ? setPhoneFormat(mentorAgreement['signee_fax']).length === 10
      : true
  const signeeEmail =
    mentorAgreement && mentorAgreement['signee_email']
      ? validateEmail(mentorAgreement['signee_email'])
      : true

  const mentorSigneePOC = mentorAgreement && mentorAgreement['mentor_signee_poc'] !== null

  return (

    mentorAgreement && mentorAgreement['has_additional_point_of_contact'] !== null ?
      mentorSigneePOC &&
      acorequiredFields &&
      caorequiredFields &&
      pcorequiredFields &&
      dcmarequiredFields &&
      optionalRequiredFields &&
      acoZip &&
      dcmaZip &&
      caoZip &&
      pcoZip &&
      signeeZip &&
      pcoTel &&
      pcoFax &&
      acoTel &&
      acoFax &&
      caoTel &&
      caoFax &&
      pcoEmail &&
      acoEmail &&
      caoEmail &&
      dcmaTel &&
      dcmaFax &&
      dcmaEmail &&
      signeeTel &&
      signeeFax &&
      signeeEmail
      : mentorSigneePOC
  )
}

export default validatePointOfContacts
