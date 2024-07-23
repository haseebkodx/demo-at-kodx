function cleanFormatDollar(value) {
  // return value && value[0] === '$' ? value.toString().substring(1, value.length) : value
  return value && value?.toString().replaceAll("$", "").replaceAll(",","")
}
export default cleanFormatDollar