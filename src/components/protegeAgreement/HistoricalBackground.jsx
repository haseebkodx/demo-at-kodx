/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import InputField from '../commonComponents/forms/InputField'
import FileUploadComponent from '../multifileUpload/FileUploadComponent'

function HistoricalBackground({
  protegeAgreement,
  mentorProtegeAgrStatus,
  historicalBackgroundFile,
  handleHistoricalBackgroundFile,
  protegeAgreementData,
  agreementId,
  reviewer = true,
  UpdateHistoricalFiles,
  noEditingFiles,
  allProtegeAgreementData,
}) {
  useEffect(() => {
    if (agreementId) {
      UpdateHistoricalFiles()
    }
  }, [agreementId])

  const handleUploadedFiles = (uploadedFiles) => {
    handleHistoricalBackgroundFile(uploadedFiles)
  }

  return (
    <div className='col-md-12 mb-5'>
      {reviewer && (
        <h2 className='page-title reviewer-section-title section-header'>
          Historical Background
        </h2>
      )}
      <div className='row'>
        <div className='col-md-12'>
          <fieldset>
            <legend>
              <p className='left-align mt-2 mb-2'>
                Please provide a (brief) summary about your company.
              </p>
              <h3 className='agreement-mini-sub-header mb-n2'>Examples:</h3>
              <ul className='mt-2 ml-n3'>
                <li>
                  Company Profile: Historical or recent activities, including
                  any accomplishments.
                </li>
                <li>
                  {`Describe how the company's participation  in the DoD Mentor-Protege Program will/ will not
              impact the day-to-day operations of the business (i.e., business management, revenue stream)`}
                </li>
              </ul>
              <p>
                Important: You must provide information with at least one option
                (explanation and/or document upload)
              </p>
            </legend>
            <div className='mb-2' data-test-id='Historical Background'>
              <InputField
                name='historical_background_explanation'
                type='textarea'
                placeholder='Summary about your company'
                id='historical-background'
                required={true}
                value={
                  protegeAgreement &&
                  protegeAgreement['historical_background_explanation']
                }
                rows='3'
                errorMessage='Explanation is required or upload document'
                dependent={historicalBackgroundFile}
                disabled={
                  protegeAgreementData
                }
              />
            </div>

            <div data-test-id='Historical Background File'></div>
            {/* adding an input field to save the file object */}
            {!noEditingFiles ? (
              <p className='mb-1'>
                Acceptable formats are: PDF, Word, or Excel. Maximum file size
                is 5MB.
              </p>
            ) : (
              <div className='mb-3 mt-5 pt-4'>
                <span className='agreement-mini-sub-header'>
                  View Upload(s):
                </span>
              </div>
            )}
            <FileUploadComponent
              agreement_type='protege'
              field_name='historical_agreement_background_file'
              agreement_id={agreementId}
              handleUploadedFiles={handleUploadedFiles}
              initialFiles={
                allProtegeAgreementData &&
                  allProtegeAgreementData['historical_agreement_background_file']
                  ? allProtegeAgreementData[
                  'historical_agreement_background_file'
                  ]
                  : protegeAgreement &&
                  protegeAgreement['historical_agreement_background_file']
              }
              isMentorApplication={false}
              reviewMode={noEditingFiles}
              fileUploadComponentAddBtnId={'protege-agr-historical-background'}
            />
          </fieldset>
        </div>
      </div>
    </div>
  )
}

export default HistoricalBackground
