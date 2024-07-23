/* eslint-disable no-self-assign */
function formatNumbers(input) {
  // Strip all characters from the input except digits
  input = input && input.toString()
  input = input && input.replace(/\D/g, '');

  // Trim the remaining input to 20 characters, to preserve phone number format
  input = input && input.substring(0, 20);

  // Based upon the length of the string, we add formatting as necessary
  return input;
}


export default formatNumbers