import React from 'react'
import InputField from '../../commonComponents/forms/InputField'
import SelectField from '../../commonComponents/forms/SelectField'
import { zipMask } from '../../../helpers/formatter/masks'
import formatPhone from '../../../helpers/formatter/formatPhone'

const MentorFirm = ({
  mentorAgreement,
  reviewer = true,
  stateOptions,
  mentorProtegeAgreementStatus,
}) => {

  return (
    <div className="mb-5 col-md-12">
      {reviewer
        ? <h2 className={`page-title ${reviewer && 'reviewer-section-title'} section-header`}>Mentor Company</h2>
        : <div className="col-12 col-sm-12 col-md-2">
          <h4 className="form-section-title">Company <br className="d-none d-md-block" />Information</h4>
        </div>}

      <p className="mr-5 mt-2 mb-3"> Note: Some of the information below has been automatically filled based
      on the information retrieved from SAM. If you need to make edits then you will need to edit your company
      information in SAM
      </p>

      <div className="col-md-12">

        <div className="row">
          <div className="col-md-8 border-box py-2">
            <div className="row">
              <div className="col-md-3 bold-label">Company Name</div>
              <div className="col-md-1">:</div>
              <div className="col-md-8">{mentorAgreement && mentorAgreement['legal_business_name']}</div>
            </div>

          </div>
          <div className="col-md-4 border-box py-2">
            <div className="row ">
              <div className="col-md-2 bold-label">Phone</div>
              <div className="col-md-1">:</div>
              <div className="col-md-8">{mentorAgreement && mentorAgreement['company_phone']
                && formatPhone(mentorAgreement['company_phone'])}</div>
            </div>
          </div>

        </div>

        <div className="row">
          <div className="col-md-8 border-box py-2">
            <div className="row">
              <div className="col-md-3 bold-label"> Address</div>
              <div className="col-md-1">:</div>
              <div className="col-md-8">{`${mentorAgreement && mentorAgreement['company_address']}  
                  ${mentorAgreement && mentorAgreement['company_city']}
                  ${mentorAgreement && mentorAgreement['company_state']},
                  ${mentorAgreement && mentorAgreement['company_zip']}`}
              </div>
            </div>

          </div>
          <div className="col-md-4 border-box py-2">
            <div className="row">
              <div className="col-md-2 bold-label">Fax</div>
              <div className="col-md-1">:</div>
              <div className="col-md-8">{mentorAgreement && mentorAgreement['company_fax']
                && formatPhone(mentorAgreement['company_fax'])}</div>
            </div>
          </div>

        </div>


        <div className="row">
          <div className="col-md-8 border-box">
            <div className="row py-2">
              <div className="col-md-3 bold-label"> DUNS</div>
              <div className="col-md-1">:</div>
              <div className="col-md-8">{mentorAgreement && mentorAgreement['duns_number']}
              </div>
            </div>

          </div>
          <div className="col-md-4 border-box">
            <div className="row py-2">
              <div className="col-md-2 bold-label">CAGE</div>
              <div className="col-md-1">:</div>
              <div className="col-md-8">{mentorAgreement && mentorAgreement['cage_code']}</div>
            </div>
          </div>

        </div>
      </div>

      {/* <div>
        <div className="row">
          <div className="col-md-12">
            <span className="agreement-sub-header">Firm Information</span>
          </div>
          <div className="col-12 mt-2" data-test-id='Company and/or Division Name'>
            <InputField
              name='legal_business_name'
              placeholder='Company or Division Name'
              id='company-name'
              required={true}
              disabled={true}
              value={mentorAgreement && mentorAgreement['legal_business_name']}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-8" data-test-id='Company Address'>
            <InputField
              name='company_address'
              placeholder='Company Address'
              id='company-address'
              required={true}
              disabled={true}
              value={mentorAgreement && mentorAgreement['company_address']}
            />
          </div>
          <div className="col-12 col-md-4" data-test-id='Company Phone Number'>
            <InputField
              name='company_phone'
              placeholder='Phone'
              id='company-phone'
              required={true}
              format={formatPhone}
              disabled={true}
              value={mentorAgreement && mentorAgreement['company_phone']}
              min={10}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6 col-sm-12 col-lg-4" data-test-id='Company City'>
            <InputField
              name='company_city'
              placeholder='City'
              id='company-city'
              required={true}
              disabled={true}
              value={mentorAgreement && mentorAgreement['company_city']}
            />
          </div>
          <div className="col-3 col-sm-6 col-lg-2" data-test-id='Company State'>
            <SelectField
              name='company_state'
              placeholder='State'
              id='company-state'
              required={true}
              options={stateOptions}
              disabled={true}
              value={mentorAgreement && mentorAgreement['company_state']}
              defaultValue='State'
            />
          </div>
          <div className="col-3 col-sm-6 col-lg-2" data-test-id='Company Zip Code'>
            <InputField
              name='company_zip'
              placeholder='Zip'
              id='company-zip'
              required={true}
              mask={zipMask}
              disabled={true}
              value={mentorAgreement && mentorAgreement['company_zip']}
              min={5}
            />

          </div>
          <div className="col-12 col-lg-4" data-test-id='Company Fax Number'>
            <InputField
              name='company_fax'
              placeholder='Fax'
              id='company-fax'
              format={formatPhone}
              disabled={true}
              value={mentorAgreement && mentorAgreement['company_fax']}
              min={10}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6" data-test-id='Company DUNS'>
            <InputField
              name='duns_number'
              placeholder='DUNS'
              id='company-duns'
              required={true}
              disabled={true}
              value={mentorAgreement && mentorAgreement['duns_number']}
            />
          </div>
          <div className="col-12 col-md-6" data-test-id='Company CAGE Code'>
            <InputField
              name='cage_code'
              placeholder='CAGE Code'
              id='company-cage'
              required={true}
              disabled={true}
              value={mentorAgreement && mentorAgreement['cage_code']}
            />
          </div>
          {/* <div className="col-12 col-sm-12 col-lg-6" data-test-id='Company Website Address'>
            <InputField
              name='company_website'
              placeholder='Website'
              id='company-web'
              required={true}
              disabled={true}
              value={mentorAgreement && mentorAgreement['company_website']}
              validation={validateWebsite}
              view={mentorAgreementData}
            />
          </div> */}
      {/* </div>
      </div > * /} */}
    </div >
  )
}



export default MentorFirm