import React from 'react'

const SelectFilesInput = ({ isLoading, children }) => {
  return (
    <div>
      {/* <p>
        {' '}
        Acceptable formats are: PDF, Word, or Excel. Maximum file size is 5MB.
      </p> */}
      {isLoading()}
      {children()}
    </div>
  )
}

export default SelectFilesInput
