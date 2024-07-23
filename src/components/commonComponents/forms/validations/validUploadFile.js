const validateUploadFile = (name) => {
  let fileType = name.substring(name.length - 4, name.length)
  return fileType.includes('pdf') || fileType.includes('doc') || fileType.includes('xls') ||
    fileType.includes('xlsx') || fileType.includes('docx')
}

export default validateUploadFile