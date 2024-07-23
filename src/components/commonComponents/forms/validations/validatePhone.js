export default function validatePhone({ phone }) {
  let digitsFound = phone.match(/\d/g);
  digitsFound = digitsFound?.join("");
  return digitsFound?.length !== 10 ? false : true;
}

const phoneRegex = /^\((\d{3})\) (\d{3})-(\d{4})$/;

export function validatePhoneFormatted(phone){
  return phoneRegex.test(phone);
}