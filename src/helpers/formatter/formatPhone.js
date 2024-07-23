/* eslint-disable no-self-assign */
/*eslint-disable eqeqeq*/
function formatPhone(input) {
  // Strip all characters from the input except digits
  input = input && input.toString()
  input = input && input.replace(/\D/g, '');

  // Trim the remaining input to ten characters, to preserve phone number format
  input = input && input.substring(0, 10);

  // Based upon the length of the string, we add formatting as necessary
  var size = input && input.length;
  if (size == 0) {
    input = input;
  } else if (size < 4) {
    input = input;
  } else if (size < 7) {
    input = input && input.substring(0, 3) + '-' + input.substring(3, 6);
  } else {
    input = input && '(' + input.substring(0, 3) + ') ' + input.substring(3, 6) + '-' + input.substring(6, 10);
  }
  return input;
}


export default formatPhone