import React, { useState, useEffect } from 'react'
import InputField from '../commonComponents/forms/InputField'
import { formatDollar, formatNumbers, formatPhone } from '../../helpers/formatter/format'
import OptionField from '../commonComponents/forms/OptionField'
import FileUploadComponent from '../multifileUpload/FileUploadComponent'

const getYears = () => {
  let yearsList = []
  const currentYear = new Date().getFullYear()
  for (let i = currentYear; i > 1900; i--) {
    yearsList.push({ abbreviation: i, name: i })
  }
  return yearsList
}




const normalizeEstablishedYear = value => {
  const newData = new Date()
  if (value && value.toString() && value.toString().length === 4 && value < 1752) {
    return 1752
  } else if (value > newData.getFullYear()) {
    return newData.getFullYear()
  } else {
    return value
  }
}

const percentOwnedOptions = [
  {
    name: 'Percent Owned Options',
    label: 'Yes',
    value: 'true',
    id: 'Yes',
  },
  {
    name: 'Percent Owned Options',
    label: 'No',
    value: 'false',
    id: 'No',
  },
]

const percentLimit = (val) => {
  return val > 100 ? 100 : val
}

const radioButtonKeydownHandler = e => {
  const keycode = e.key
  if (keycode === 'Enter') {
    e.currentTarget.click()
    e.preventDefault()
    e.stopPropagation()
  }
}

function FirmInformation({
  handleHistoricalBackgroundFile,
  UpdateHistoricalFiles,
  protegeAgreement,
  capabilitySectionFile,
  protegeAgreementData,
  allProtegeAgreementData,
  mentorProtegeAgrStatus,
  stateOptions,
  agreementId,
  reviewer = true,
  submitted,
  // showErrorPercentOwned,
}) {
  useEffect(() => {
    if (agreementId) {
      UpdateHistoricalFiles()
    }
  }, [agreementId])

  const [showDetails, setShowDetails] = useState(false)

  const showNiacsDetails = () => {
    setShowDetails(!showDetails)
  }

  const noEditingFiles = true

  const handleUploadedFiles = (uploadedFiles) => {
    handleHistoricalBackgroundFile(uploadedFiles)
  }

  useEffect(() => {
    if (agreementId) {
      UpdateHistoricalFiles()
    }
  }, [agreementId])


  return (
    <div className='col-md-12'>
      {reviewer && (
        <h2 className='page-title reviewer-section-title section-header'>
          Company Information
        </h2>
      )}
      <div className='row ml-1 mx-1'>
        <div className='col-md-10 mb-3'>
          <span className='agreement-mini-sub-header'>Note: </span>
          <span>
            Some of the information below has been automatically filled based on
            the information retrieved from the SAM database. If you need to make
            edits then you will need to edit your company information in SAM.
          </span>
        </div>

        <div className='col-md-12'>
          <div className='row'>
            <div className='col-md-8 border-box py-2'>
              <div className='row'>
                <div className='col-md-3 bold-label'>Company Name</div>
                <div className='col-md-1'>:</div>
                <div className='col-md-8'>
                  {protegeAgreement && protegeAgreement['legal_business_name']}
                </div>
              </div>
            </div>
            <div className='col-md-4 border-box py-2'>
              <div className='row '>
                <div className='col-md-2 bold-label'>Phone</div>
                <div className='col-md-1'>:</div>
                <div className='col-md-8'>
                  {protegeAgreement && protegeAgreement['company_phone']
                    && formatPhone(protegeAgreement['company_phone'])}
                </div>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-8 border-box py-2'>
              <div className='row'>
                <div className='col-md-3 bold-label'> Address</div>
                <div className='col-md-1'>:</div>
                <div className='col-md-8'>
                  {`${protegeAgreement && protegeAgreement['company_address']}  
                  ${protegeAgreement && protegeAgreement['company_city']}
                  ${protegeAgreement && protegeAgreement['company_state']}
                  ${protegeAgreement && protegeAgreement['company_zip']}`}
                </div>
              </div>
            </div>
            <div className='col-md-4 border-box py-2'>
              <div className='row'>
                <div className='col-md-2 bold-label'>Fax</div>
                <div className='col-md-1'>:</div>
                <div className='col-md-8'>
                  {protegeAgreement && protegeAgreement['company_fax']
                    && formatPhone(protegeAgreement['company_fax'])}
                </div>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-8 border-box'>
              <div className='row py-2'>
                <div className='col-md-3 bold-label'> DUNS</div>
                <div className='col-md-1'>:</div>
                <div className='col-md-8'>
                  {protegeAgreement && protegeAgreement['duns_number']}
                </div>
              </div>
            </div>
            <div className='col-md-4 border-box'>
              <div className='row py-2'>
                <div className='col-md-2 bold-label'>CAGE</div>
                <div className='col-md-1'>:</div>
                <div className='col-md-8'>
                  {protegeAgreement && protegeAgreement['cage_code']}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12 mt-4'>
          <span className='agreement-sub-header'>Year Established</span>
          <span> (not to include 1099&apos;s)</span>
        </div>
        <div className='col-md-2 mt-2' data-test-id='Year Established'>
          <InputField
            name='firm_year_established'
            placeholder='Year Established'
            id='firm-year-established'
            required={true}
            format={formatNumbers}
            disabled={protegeAgreementData}
            normalizeValues={normalizeEstablishedYear}
            value={
              protegeAgreement && protegeAgreement['firm_year_established']
            }
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12 mt-4'>
          <span className='agreement-sub-header'>Number of Employees</span>
          <span> (not to include 1099&apos;s)</span>
        </div>
        <div className='col-md-3 mt-2' data-test-id='Number of Employees'>
          <InputField
            name='firm_number_of_employees'
            placeholder='Number of Employees'
            id='firm-number-of-employees'
            required={true}
            format={formatNumbers}
            value={
              protegeAgreement && protegeAgreement['firm_number_of_employees']
            }
            disabled={protegeAgreementData}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12 mt-4'>
          <span className='agreement-sub-header'>Annual Gross Revenue</span>
          <span> (for Previous fiscal year)</span>
        </div>
        <div className='col-md-3 mt-2' data-test-id='Annual Gross Revenue'>
          <InputField
            name='firm_annual_gross_revenue'
            placeholder='Annual Gross Revenue'
            id='firm-annual-gross-revenue'
            required={true}
            format={formatDollar}
            value={
              protegeAgreement && protegeAgreement['firm_annual_gross_revenue']
            }
            disabled={protegeAgreementData}
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-md-3 mt-4'>
          <span className='agreement-sub-header'>NAICS</span>
        </div>
        <div className='col-md-12 mt-2 mb-3' data-test-id='NAICS codes'>
          <div>
            <span className='left-header'> NAICS Code </span> :{' '}
            {protegeAgreement && protegeAgreement['naics_codes']}
          </div>
          <details className='col-md-8'>
            <summary>Details</summary>
            <p>
              Note: This is the NAICS code retrieved for your company and is
              non-editable. In order to update it you need to make the update in
              SAM. <br />
              The NAICS code which represents the contemplated supplies or
              services to be provided by the protégé firm and a statement that
              at the time of agreement is submitted for approval, the protégé
              firm, if an SDB or a woman-owned small business concern, does not
              exceed the size standard for appropriate NAICS code.
            </p>
          </details>
        </div>
      </div>

      <div className='row'>
        <div className='col-md-3 mt-4'>
          <span className='agreement-sub-header'>Capability Statement</span>
        </div>
        <div className='col-md-12'>
          <p>
            Important: You must provide information with at least one option
            (explanation and/or document upload)
        </p>
          <fieldset>
            <div className='mb-2' data-test-id='Historical Background'>
              <p className='mb-n3'>*Please provide a capability statement. If your company doesn&apos;t have a capability statement,
                 please describe the services and/or products your company provides in your industry.</p>
              <InputField
                name='capability_statement'
                type='textarea'
                placeholder=''
                id='historical-background'
                required={true}
                value={
                  protegeAgreement &&
                  protegeAgreement['capability_statement']
                }
                rows='3'
                errorMessage='Explanation is required or upload document'
                dependent={capabilitySectionFile}
                disabled={
                  protegeAgreementData
                }
              />
            </div>
            <div data-test-id='capability_statement_file'></div>
            {/* adding an input field to save the file object */}
            {!noEditingFiles ? (
              <p className='mb-1'>
                Acceptable formats are: PDF, Word, or Excel. Maximum file size
                is 5MB.
              </p>
            ) : (
              <div className='mb-3'>
                <span className='agreement-mini-sub-header'>
                  View Upload(s):
                </span>
              </div>
            )}
            <FileUploadComponent
              agreement_type='protege'
              field_name='capability_section_file'
              agreement_id={agreementId}
              handleUploadedFiles={handleUploadedFiles}
              initialFiles={
                allProtegeAgreementData &&
                  allProtegeAgreementData['capability_section_file']
                  ? allProtegeAgreementData['capability_section_file']
                  : protegeAgreement &&
                  protegeAgreement['capability_section_file']
              }
              isMentorApplication={false}
              reviewMode={false}
              fileUploadComponentAddBtnId={'protege-agr-historical-background'}
            />
          </fieldset>
        </div>
      </div>



      <div className='row'>
        <div className='col-md-3 mt-4'>
          <span className='agreement-sub-header'>Percent(%) Owned</span>
        </div>
        <div className='col-md-12'>
          <fieldset>
            <legend>
              <div className='left-align mt-2 mb-2'>
                <span aria-hidden='true'>*</span>Does the Mentor Company
                currently own a percentage of the Protégé&apos;s company?
                <span className='sr-only'>This is a required question.</span>
              </div>
            </legend>

            <OptionField
              name='is_firm_percent_owned'
              placeholder=''
              options={percentOwnedOptions}
              value={
                protegeAgreement &&
                protegeAgreement['is_firm_percent_owned'] !== null &&
                protegeAgreement['is_firm_percent_owned'].toString()
              }
              required={true}
              submitted={submitted}
              disabled={protegeAgreementData}
              onKeyDown={radioButtonKeydownHandler}
            />
          </fieldset>
        </div>
        {protegeAgreement &&
          protegeAgreement['is_firm_percent_owned'] &&
          protegeAgreement['is_firm_percent_owned'].toString() === 'true' && (
            <>
              <label
                htmlFor='firm-percentage-owned'
                className='col-md-12 percent-owned-label pt-3'
              >
                <span aria-hidden='true'>*</span>Percent(%) Owned
              </label>
              <div className='col-md-2 mt-n4' data-test-id='Percent(%) Owned'>
                <InputField
                  name='firm_percent_owned'
                  placeholder=''
                  label={'no-show'}
                  id='firm-percentage-owned'
                  required={true}
                  value={
                    percentLimit(protegeAgreement && protegeAgreement['firm_percent_owned'])
                  }
                  format={formatNumbers}
                  disabled={protegeAgreementData}
                  errorMessage={'This field is required.'}
                />
              </div>
              <div className='col-md-1 ml-n4 mt-n2 bold-label'>%</div>
            </>
          )}
      </div>
    </div>
  )
}
export default FirmInformation
