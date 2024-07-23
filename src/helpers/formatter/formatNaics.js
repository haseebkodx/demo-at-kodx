/* eslint-disable no-self-assign */
function formatNaics(input) {
  input = input && input.toString()
  input = input && input.replace(/[^\w\s]/gi, '')
  // Strip all characters from the input except digits
  input = input && input.replace(/.{6}/g, '$&,');
  // Based upon the length of the string, we add formatting as necessary
  return input;
}


export default formatNaics