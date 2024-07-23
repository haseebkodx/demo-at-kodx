function validateNaics(naics) {
  const newNaics = naics && naics.replace(/[^\w\s]/gi, '')
  return (newNaics && newNaics.length % 6) === 0
}

export default validateNaics