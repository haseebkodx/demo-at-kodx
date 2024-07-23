/* eslint-disable no-unused-vars */
import React from 'react'
import FileUploadComponent from '../../multifileUpload/FileUploadComponent'

function DevelopmentalAssistance({
  developmentalAssistanceFile,
  reviewer = true,
  handleDevAssistFiles,
  agreementId,
  agreement_type = 'mentor',
  noEditingFiles,
  latestMentorAgreementData,
  protegeAgreementData,
  completeMentorAgreement
}) {
  const field_name = 'developmental_assistance'

  return (
    <div className='col-md-12'>
      {reviewer && (
        <h2 className='page-title reviewer-section-title section-header'>
          Developmental Assistance
        </h2>
      )}
      <div className='row mb-4'>
        <div className='col-md-12'>
          <h3 className='agreement-sub-header mb-0'>
            Complete Developmental Assistance Form
          </h3>
        </div>
        <div className='col-md-12 mt-2' data-test-id='Certified Small Business'>
          <p className='left-align'>
            The Mentor-Protégé Program office requires all Mentor and Protégés
            to describe the developmental Program for the protégé firm
            specifying the type of assistance planned. Describing how this plan
            will address the protégé identified needs to enchance their ability
            to perform successfullly under contracts or subcontracts within DoD
            and other federal agencies. <br />
            Please download the provided templates and work with your protégé to
            address the following areas in question.
          </p>
          <ul>
            <li>Developmental Assistance</li>
            <li>Value to the Department of Defense</li>
            <li>Milestones</li>
            <li>Metrics</li>
            <li>Termination Procedures(Mentor)</li>
            <li>Voluntary Termination Procedures(Protégé)</li>
            <li>Joint Venture and/or Affiliation</li>
            <li>Additional Terms and Conditions</li>
          </ul>
        </div>
      </div>
      <div className='row mb-5'>
        <div className='col-md-12'>
          <h3 className='agreement-sub-header mb-0'>Completed Document</h3>
        </div>
        {/* @dev the data-test-id looks incorrect */}
        <div className='col-md-12 mt-2' data-test-id='Certified Small Business'>
          {!noEditingFiles ? (
            <>
              <p className='left-align'>
                *Required: Upload form(s) to this agreement.
              </p>
              <p className='mb-4'>
                Acceptable formats are: PDF, Word, or Excel. Maximum file size
                is 5MB.
              </p>
            </>
          ) : null}
          <FileUploadComponent
            agreement_type={agreement_type}
            field_name={field_name}
            agreement_id={agreementId}
            handleUploadedFiles={handleDevAssistFiles}
            initialFiles={
              latestMentorAgreementData &&
              latestMentorAgreementData['developmental_assistance_file']
            }
            developmentalAssistanceFile={developmentalAssistanceFile}
            reviewMode={noEditingFiles}
            fileUploadComponentAddBtnId={'mentor-agr-development-assistance'}
          />

          <p className='mt-2'>Documents uploaded by Protege :</p>

          <FileUploadComponent
            agreement_type={'protege'}
            agreement_id={protegeAgreementData.uuid}
            initialFiles={
              protegeAgreementData &&
              protegeAgreementData['developmental_assistance_protege_file']
            }
            reviewMode={true}
            fileUploadComponentAddBtnId={'developmental_assistance_protege_file'}
          />
        </div>



      </div>
    </div>
  )
}

export default DevelopmentalAssistance
