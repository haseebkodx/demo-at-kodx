/* eslint-disable no-self-assign */
function formatCage(input) {
  // Strip all characters from the input except digits
  input = input && input.toString() && input.replace(/[^\w\s]/gi, '')

  // Trim the remaining input to 5 characters, to preserve phone number format
  input = input && input.substring(0, 5);

  // Based upon the length of the string, we add formatting as necessary
  return input;
}


export default formatCage