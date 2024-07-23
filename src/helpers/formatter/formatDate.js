/* eslint-disable no-self-assign */
/*eslint-disable eqeqeq*/
function formatDate(input) {
  // Strip all characters from the input except digits
  input = input && input.replace(/\D/g, '');

  // Trim the remaining input to ten characters, to preserve phone number format
  input = input && input.substring(0, 8);

  // Based upon the length of the string, we add formatting as necessary
  var size = input && input.length;
  if (size == 0) {
    input = input;
  } else if (size < 3) {
    input = input;
  } else if (size < 5) {
    input = input && input.substring(0, 2) + '/' + input.substring(2, 4);
  } else {
    input = input && input.substring(0, 2) + '/' + input.substring(2, 4) + '/' + input.substring(4, 8);
  }
  return input;
}


export default formatDate