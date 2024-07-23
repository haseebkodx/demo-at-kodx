const getDateFormat = (date) => {
  return date && date.substring(8, 10) + '/' + date.substring(5, 7) + '/' + date.substring(0, 4)
}

export default getDateFormat