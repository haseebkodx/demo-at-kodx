/* eslint-disable no-self-assign */
function formatUei(input) {
  // Strip all characters from the input except digits
  input = input && input.toString() && input.replace(/\W/g, '');

  // Trim the remaining input to 9 characters
  input = input && input.substring(0, 12);

  // Based upon the length of the string, we add formatting as necessary
  return input;
}


export default formatUei