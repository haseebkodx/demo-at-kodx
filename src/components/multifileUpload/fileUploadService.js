import settings from '../../config/settings'
import authHeader from '../authHeader'
import FileSaver from 'file-saver'
import _ from 'lodash'

// upload mentor agreement files
export const postFiles = async ({
  validFiles,
  agreement_id,
  agreement_type,
  field_name
}) => {
  const url = settings.devUrl + `/file/upload/`

  const formData = new FormData()

  for (const file of validFiles) {
    formData.append('file_to_upload', file)
  }

  formData.append('agreement_id', agreement_id)
  formData.append('agreement_type', agreement_type)
  formData.append('field_name', field_name)

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: authHeader(),
      body: formData
    })

    const text = await res.text()
    const data = JSON.parse(text)

    return {
      message: 'Files uploaded successfully.',
      status: 'Success',
      data: data
    }
  } catch (err) {
    return {
      errorMessage: `There was an error. Please try again. ${err.message}`,
      status: 'Error'
    }
  }
}

// delete mentor agreement files
export const deleteFile = async ({ fileToDelete }) => {
  const url = settings.devUrl + `/file/remove/`

  let fileId = Object.prototype.hasOwnProperty.call(fileToDelete, 'uuid')
    ? fileToDelete.uuid
    : fileToDelete.fileId

  let urlencoded = new URLSearchParams()
  urlencoded.append('file_upload_id', fileId)

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...authHeader()
      },
      body: urlencoded
    })

    const data = await res.json()

    return {
      data: data,
      status: 'Success'
    }
  } catch (err) {
    return {
      status: 'Error',
      errorMessage: `There was an error. ${err.message}`
    }
  }
}

// get single file
export const getSingleFile = async (fileId) => {
  const url = settings.devUrl + `/file/${fileId}`

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: authHeader()
    })

    const data = await res.blob()

    return {
      status: 'Success',
      data: data
    }
  } catch (err) {
    return {
      status: 'Error',
      errorMessage: `There was an error. ${err}`
    }
  }
}

// get all files by agreement and agreement_type
export const getAllFilesByAgreementAndType = async (
  agreementId,
  agreement_type
) => {
  const url =
    settings.devUrl + `/file/agreement/${agreementId}/${agreement_type}`

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: authHeader()
    })

    const data = await res.json()

    const filesArray = data[0].json_agg

    return {
      status: 'Success',
      data: filesArray
    }
  } catch (err) {
    return {
      status: 'Error',
      errorMessage: `There was an error. ${err}`
    }
  }
}

// mentor application calls

// upload mentor application files
export const postMentorAppFiles = async ({
  mentor_app_id = '',
  field_name = '',
  validFiles = []
}) => {
  const url = settings.devUrl + `/file/upload/mentorapp/`

  const formData = new FormData()

  for (const file of validFiles) {
    formData.append('file_to_upload', file)
  }

  formData.append('mentor_app_id', mentor_app_id)
  formData.append('field_name', field_name)

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: authHeader(),
      body: formData
    })

    const text = await res.text()
    const data = JSON.parse(text)

    return {
      message: 'Files uploaded successfully',
      status: 'Success',
      data: data
    }
  } catch (err) {
    return {
      errorMessage: `There was an error. Please try again. ${err.message}`,
      status: 'Error'
    }
  }
}

export const deleteMentorAppFile = async ({ fileToDelete }) => {
  const url = settings.devUrl + `/file/remove/mentorapp/`

  let fileId = Object.prototype.hasOwnProperty.call(fileToDelete, 'uuid')
    ? fileToDelete.uuid
    : fileToDelete.fileId

  let urlencoded = new URLSearchParams()
  urlencoded.append('file_upload_id', fileId)

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...authHeader()
      },
      body: urlencoded
    })

    const data = await res.json()

    return {
      data: data,
      status: 'Success'
    }
  } catch (err) {
    return {
      status: 'Error',
      errorMessage: `There was an error. ${err.message}`
    }
  }
}

// get a single file
export const getSingleFileFromMentorApp = async (fileId) => {
  const url = settings.devUrl + `/file/mentorapp/doc/${fileId}`

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: authHeader()
    })

    const data = await res.blob()

    return {
      status: 'Success',
      data: data
    }
  } catch (err) {
    return {
      status: 'Error',
      errorMessage: `There was an error. ${err}`
    }
  }
}

// get all mentor files
export const getAllMentorFiles = async (mentor_app_id) => {
  const url = settings.devUrl + `/file/mentorapp/${mentor_app_id}`

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: authHeader()
    })

    const data = await res.json()

    const filesArray = data[0].json_agg

    return {
      status: 'Success',
      data: filesArray
    }
  } catch (err) {
    return {
      status: 'Error',
      errorMessage: `There was an error. ${err}`
    }
  }
}

// Display view file into browser
export const displayViewFile = async (fileId, fileName, showLoadingModalHook) => {
  showLoadingModalHook && showLoadingModalHook(true)

  let response = await getSingleFile(fileId)

  const newBlob = new Blob([response.data], {
    type: response.data && response.data.type
  })

  const pdfFiles = ['.pdf', 'application/pdf']

  if (_.includes(pdfFiles, response.data.type)) {
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(newBlob)
      showLoadingModalHook && showLoadingModalHook(false)
    } else {
      const url = window.URL.createObjectURL(newBlob)
      const win = window.open(url, '_blank')
      win.onload = function () {
        showLoadingModalHook && showLoadingModalHook(false)
        setTimeout(function () {
          window.URL.revokeObjectURL(url)
        }, 100)
      }
    }
  } else {
    const url = window.URL.createObjectURL(newBlob)
    showLoadingModalHook && showLoadingModalHook(false)
    FileSaver.saveAs(url, fileName)
  }
}

// trim file name for display
export const trimFileName = (file) => {
  const name = Object.prototype.hasOwnProperty.call(file, 'name')
    ? file.name
    : file.fileName

  if (name && name.length > 15) {
    const splitName = name.split('.')
    const fileName = splitName[0]
    const extension = splitName[splitName.length - 1]
    const trimedName = _.truncate(fileName, { 'length': 10, 'ommission': '[...]' }) + '.' + extension
    return trimedName
  } else {
    return name
  }
}

export const trimFileNamesForSelectFilesTable = (name) => {
  if (name && name.length > 50) {
    const splitName = name.split('.')
    const fileName = splitName[0]
    const extension = splitName[splitName.length - 1]
    const trimedName = fileName.substr(0, 40) + '.' + extension
    return trimedName
  } else {
    return name
  }
}

// mentor app field names to upload files
const field_name = {
  eligibility: 'eligibility_upload_file',
  historical_background: 'historical_background',
  developmental_assistance: 'developmental_assistance',
  reviewerFiles: 'reviewer_file_upload'
}

// mentor app field names to retrieve files
const get_field_name = {
  eligibility: 'eligibility_upload_file',
  historical_background: 'historical_background_upload_file',
  developmental_assistance: 'developmental_assistance_upload_file',
  reviewerFiles: 'reviewer_uploaded_file'
}

// mentor agreement field names to save files
const mentor_agr_field_name = {
  historical_background: 'historical_background',
  developmental_assistance: 'developmental_assistance'
}

// mentor agreement field names to retrieve files
const get_mentor_agr_field_name = {
  historical_background: 'mentor_app_historical_background_upload_file',
  developmental_assistance: 'developmental_assistance_file'
}

// protege app - field_name is historical_agreement_background_file - to upload files
const protege_field_name = {
  historical_background: 'historical_agreement_background_file',
  reviewerFiles: 'reviewer_file_upload'
}
