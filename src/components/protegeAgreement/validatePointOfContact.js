import { setPhoneFormat } from '../../helpers/formatter/format'
import validateEmail from '../commonComponents/forms/validations/validateEmail'


const validatePointOfContact = (protegeAgreement) => {
  const hasAdditionalPointOfContact = protegeAgreement && protegeAgreement['has_additional_point_of_contract'] !== null
  const requiredFields = protegeAgreement
    && protegeAgreement['protege_signee_poc'] && hasAdditionalPointOfContact

  const acorequiredFields =
    protegeAgreement &&
      protegeAgreement['aco_selected'] && protegeAgreement['aco_selected'].toString() === 'true'
      ? protegeAgreement['aco_title'] &&
      protegeAgreement['aco_name'] &&
      protegeAgreement['aco_address'] &&
      protegeAgreement['aco_city'] &&
      protegeAgreement['aco_state'] &&
      protegeAgreement['aco_zip'] &&
      protegeAgreement['aco_email'] &&
      protegeAgreement['aco_tel']
      : true

  const caorequiredFields =
    protegeAgreement &&
      protegeAgreement['cao_selected'] && protegeAgreement['cao_selected'].toString() === 'true'
      ? protegeAgreement['cao_title'] &&
      protegeAgreement['cao_name'] &&
      protegeAgreement['cao_address'] &&
      protegeAgreement['cao_city'] &&
      protegeAgreement['cao_state'] &&
      protegeAgreement['cao_zip'] &&
      protegeAgreement['cao_email'] &&
      protegeAgreement['cao_tel']
      : true

  const dcmarequiredFields =
    protegeAgreement &&
      protegeAgreement['dcma_selected'] && protegeAgreement['dcma_selected'].toString() === 'true'
      ? protegeAgreement['dcma_contact_title'] &&
      protegeAgreement['dcma_primary_contact'] &&
      protegeAgreement['dcma_contact_address'] &&
      protegeAgreement['dcma_contact_city'] &&
      protegeAgreement['dcma_contact_state'] &&
      protegeAgreement['dcma_contact_zip'] &&
      protegeAgreement['dcma_contact_email'] &&
      protegeAgreement['dcma_contact_phone']
      : true

  const optionalRequiredFields =
    protegeAgreement &&
      protegeAgreement['protege_signee_poc'] === 'new_protege_signee_poc'
      ? protegeAgreement['signee_contact_title'] &&
      protegeAgreement['signee_primary_contact'] &&
      protegeAgreement['signee_contact_address'] &&
      protegeAgreement['signee_contact_city'] &&
      protegeAgreement['signee_contact_state'] &&
      protegeAgreement['signee_contact_zip'] &&
      protegeAgreement['signee_contact_email'] &&
      protegeAgreement['signee_contact_phone']
      : true



  const acoPhone = protegeAgreement && protegeAgreement['aco_tel'] ? setPhoneFormat(protegeAgreement['aco_tel'].toString()).length === 10 : true
  const acoZip = protegeAgreement && protegeAgreement['aco_zip'] ? protegeAgreement['aco_zip'].toString().length === 5 : true
  const acoEmail = protegeAgreement && protegeAgreement['aco_email'] ? validateEmail(protegeAgreement && protegeAgreement['aco_email']) : true
  const acoFax = protegeAgreement && protegeAgreement['aco_fax'] ? setPhoneFormat(protegeAgreement['aco_fax'].toString()).length === 10 : true

  const caoPhone = protegeAgreement && protegeAgreement['cao_tel'] ? setPhoneFormat(protegeAgreement['cao_tel'].toString()).length === 10 : true
  const caoZip = protegeAgreement && protegeAgreement['cao_zip'] ? protegeAgreement['cao_zip'].toString().length === 5 : true
  const caoEmail = protegeAgreement && protegeAgreement['cao_email'] ? validateEmail(protegeAgreement && protegeAgreement['cao_email']) : true
  const caoFax = protegeAgreement && protegeAgreement['cao_fax'] ? setPhoneFormat(protegeAgreement['cao_fax'].toString()).length === 10 : true

  const dcmaContactPhone = protegeAgreement && protegeAgreement['dcma_contact_phone'] ? setPhoneFormat(protegeAgreement['dcma_contact_phone'].toString()).length === 10 : true
  const dcmaContactZip = protegeAgreement && protegeAgreement['dcma_contact_zip'] ? protegeAgreement['dcma_contact_zip'].toString().length === 5 : true
  const dcmaContactEmail = protegeAgreement && protegeAgreement['dcma_contact_email'] ? validateEmail(protegeAgreement && protegeAgreement['dcma_contact_email']) : true

  const signeePhone = protegeAgreement && protegeAgreement['signee_contact_phone'] ? setPhoneFormat(protegeAgreement['signee_contact_phone'].toString()).length === 10 : true
  const signeeZip = protegeAgreement && protegeAgreement['signee_zip'] ? protegeAgreement['signee_zip'].toString().length === 5 : true
  const singneeEmail = protegeAgreement && protegeAgreement['signee_email'] ? validateEmail(protegeAgreement && protegeAgreement['signee_email']) : true
  const signeeFax = protegeAgreement && protegeAgreement['signee_contact_fax'] ? setPhoneFormat(protegeAgreement['signee_contact_fax'].toString()).length === 10 : true


  return requiredFields
    && dcmaContactPhone
    && dcmaContactZip
    && dcmaContactEmail
    && acorequiredFields
    && caorequiredFields
    && dcmarequiredFields
    && acoPhone
    && acoZip
    && acoEmail
    && caoPhone
    && caoZip
    && caoEmail
    && dcmaContactPhone
    && dcmaContactZip
    && dcmaContactEmail
    && signeePhone
    && signeeZip
    && singneeEmail
    && optionalRequiredFields
    && acoFax
    && caoFax
    && signeeFax

}

export default validatePointOfContact