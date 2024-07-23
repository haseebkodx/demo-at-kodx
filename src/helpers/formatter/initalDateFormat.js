const initialDateFormat = (date) => {
  return date && `${date.substring(5, 7)}/${date.substring(8, 10)}/${date.substring(0, 4)}`
}

export default initialDateFormat