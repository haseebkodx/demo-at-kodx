function setPhoneFormat(phone) {
  return phone && phone.toString().replace(/[\s()-]/g, '');
}
export default setPhoneFormat