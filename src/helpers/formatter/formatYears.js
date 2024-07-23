/* eslint-disable no-self-assign */
function formatYears(input) {
  // Strip all characters from the input except digits
  input = input && input.toString()
  input = input && input.replace(/\D/g, '');

  // Trim the remaining input to 4 characters, to preserve phone number format
  input = input && input.substring(0, 4);

  // Based upon the length of the string, we add formatting as necessary
  return input;
}


export default formatYears