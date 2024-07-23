const setDateFormat = (date) => {
  return date && date.substring(0, 2) + '/' + date.substring(2, 4) + '/' + date.substring(4, 8)
}

export default setDateFormat