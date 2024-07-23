import React, { useEffect } from 'react'
import FileUploadComponent from '../multifileUpload/FileUploadComponent'

function DevelopmentAssistance({
  reviewer = true,
  mentorAgrUuid,
  allMentorAgreementData,
  agreementId,
  protegeAgreement,
  allProtegeAgreementData,
  UpdateHistoricalFiles
}) {

  useEffect(() => {
    if (agreementId) {
      UpdateHistoricalFiles()
    }
  }, [agreementId])

  return (
    <div className='col-md-12'>
      {reviewer && (
        <h2 className='page-title reviewer-section-title section-header'>
          Developmental Assistance
        </h2>
      )}
      <div className='row mb-2'>
        <div className='col-md-12' data-test-id='Certified Small Business'>
          <p className='left-align mt-2'>
            The Mentor-Protege Program office requires all Mentor and Proteges
            to describe the development program for the protege firm specifying
            the type of assistance planned describing how this plan will address
            the protege&apos;s identified needs to enhance their ability to
            perform successfully under contracts or subcontracts within the DoD
            and other federal agencies.
          </p>
        </div>
      </div>

      <div>
        <h3 className='agreement-sub-header mb-n1'>Review Completed Document</h3>
        <p>
          Work with your mentor for all necessary documentation.
          <br />
          Your Mentor is required to upload the completed document to the
          agreement. You will be able to view the document here once it has been
          uploaded
        </p>
      </div>
      {allMentorAgreementData &&
        allMentorAgreementData['developmental_assistance_file'] ? (
        <>
          <div className='mb-0'>
            <h3 className='agreement-sub-header mb-n1'>View Upload(s) from Mentor:</h3>
          </div>

          <div className='row'>
            <div
              className='col-md-12 pt-0 mt-0'
              data-test-id='Certified Small Business'
            >
              <FileUploadComponent
                agreement_type={`mentor`}
                field_name='developmental_assistance'
                agreement_id={mentorAgrUuid}
                initialFiles={
                  allMentorAgreementData['developmental_assistance_file']
                }
                reviewMode={true}
                fileUploadComponentAddBtnId={'protege-agr-developmental-assistance'}
              />
            </div>
          </div>
        </>
      ) : null}
      <div className="mb-3">
        <h3 className='agreement-sub-header mb-n1'>
          Upload files by protege:
        </h3>
        <p>
          Please upload a needs assessment. This should describe your company&apos;s needs to
          enhance your ability to perform successfully under contracts or subcontracts within
          DoD and other Federal agencies.
        </p>
      </div>

      <div className='row'>
        <div
          className='col-md-12 pt-0 mt-0'
          data-test-id='Certified Small Business'
        >
          <p className='mb-1'>
            Acceptable formats are: PDF, Word, or Excel. Maximum file size
            is 5MB.
              </p>


        </div>
      </div>
      <FileUploadComponent
        agreement_type={`protege`}
        field_name='developmental_assistance_protege_file'
        agreement_id={agreementId}
        initialFiles={
          allProtegeAgreementData &&
            allProtegeAgreementData['developmental_assistance_protege_file']
            ? allProtegeAgreementData[
            'developmental_assistance_protege_file'
            ]
            : protegeAgreement &&
            protegeAgreement['developmental_assistance_protege_file']
        }
        isMentorApplication={false}
        reviewMode={false}
        fileUploadComponentAddBtnId={'protege-agr-developmental-assistance'}
      />
    </div >
  )
}

export default DevelopmentAssistance
