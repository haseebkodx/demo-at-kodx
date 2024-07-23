/* eslint-disable no-self-assign */
function formatDuns(input) {
  // Strip all characters from the input except digits
  input = input && input.toString() && input.replace(/\D/g, '');

  // Trim the remaining input to 9 characters, to preserve phone number format
  input = input && input.substring(0, 9);

  // Based upon the length of the string, we add formatting as necessary
  return input;
}


export default formatDuns