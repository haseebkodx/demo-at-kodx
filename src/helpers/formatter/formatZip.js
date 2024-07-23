/* eslint-disable no-self-assign */
function formatZip(input) {
  // Strip all characters from the input except digits
  input = input && input.toString()
  input = input && input.replace(/\D/g, '');

  // Trim the remaining input to ten characters, to preserve phone number format
  input = input && input.substring(0, 5);

  return input

}
export default formatZip