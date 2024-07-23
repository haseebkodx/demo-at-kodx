/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import InputField from '../../commonComponents/forms/InputField'
import formatDollar from '../../../helpers/formatter/formatDollar'

function DODSubContracts({
  mentorApp,
  mentorApplicationInfo,
}) {
  const dollarMask = ''

  const currentYear = new Date().getFullYear()
  const prevYear = `Fiscal year - ${currentYear - 2}`
  const twoPrevYear = `Fiscal year - ${currentYear - 1}`

  return (
    <div className='left-align'>
      <div className='row mb-5'>
        <div className='col-12 col-sm-12 col-md-4'>
          <h4 className='form-section-title'>
            DoD Subcontract <br className='d-none d-md-block' />
            Awards to SDB
          </h4>
        </div>
        <div className='col-12 col-sm-12 col-md-8'>
          <p>
            Total dollars of DoD contracts received by the company during the 2
            preceding fiscal years.
          </p>
          <p className=''>
            <em>
              (If presently required to submit SF 295, provide copies of the
              previous 2 years end reports.)
            </em>
          </p>
        </div>
      </div>

      <div className='row mb-5'>
        <div className='col-12 col-sm-12 col-md-4'>
          <h4 className='form-sub-section-title'>
            DoD SDBs Subcontracts Awarded
          </h4>
        </div>
        <div className='col-12 col-sm-12 col-md-6'>
          <div className='row'>
            <div className='col-12'>
              <span>Subcontract Awards</span>
            </div>
            <div
              className='col-12 col-md-6'
              data-test-id='dod-sc-sdb-prev-year'
            >
              <InputField
                name='prev_year_revenue_dod_sdb_awarded_sub'
                placeholder={prevYear}
                id='dod-sc-sdb-prev-year'
                required={true}
                value={
                  mentorApp &&
                  mentorApp['prev_year_revenue_dod_sdb_awarded_sub']
                }
                mask={
                  mentorApp &&
                  mentorApp['prev_year_revenue_dod_sdb_awarded_sub'] &&
                  dollarMask
                }
                format={formatDollar}
                maxlength='19'
                view={mentorApplicationInfo}
              />
            </div>
            <div
              className='col-12 col-md-6'
              data-test-id='dod-sc-sdb-two-prev-year'
            >
              <InputField
                name='two_prev_year_revenue_dod_sdb_awarded_sub'
                placeholder={twoPrevYear}
                id='dod-sc-sdb-two-prev-year'
                required={true}
                value={
                  mentorApp &&
                  mentorApp['two_prev_year_revenue_dod_sdb_awarded_sub']
                }
                mask={
                  mentorApp &&
                  mentorApp['two_prev_year_revenue_dod_sdb_awarded_sub'] &&
                  dollarMask
                }
                format={formatDollar}
                maxlength='19'
                view={mentorApplicationInfo}
              />
            </div>
          </div>
        </div>
      </div>

      <div className='row mb-5'>
        <div className='col-12 col-sm-12 col-md-4'>
          <h4 className='form-sub-section-title'>
            Total SDBs Subcontracts Awarded
          </h4>
          <p className='addt-sub-section-text'>(Other Federal Agencies)</p>
        </div>
        <div className='col-12 col-sm-12 col-md-6'>
          <div className='row'>
            <div className='col-12'>
              <span>Subcontract Awards</span>
            </div>
            <div
              className='col-12 col-md-6'
              data-test-id='dod-sc-sdb-prev-year'
            >
              <InputField
                name='prev_year_revenue_total_sdb_awarded_sub'
                placeholder={prevYear}
                id='total-dod-sc-sdb-prev-year'
                required={true}
                value={
                  mentorApp &&
                  mentorApp['prev_year_revenue_total_sdb_awarded_sub']
                }
                mask={
                  mentorApp &&
                  mentorApp['prev_year_revenue_total_sdb_awarded_sub'] &&
                  dollarMask
                }
                format={formatDollar}
                maxlength='19'
                view={mentorApplicationInfo}
              />
              <div className='mb-4'>
                <p>SF295</p>
              </div>
            </div>
            <div
              className='col-12 col-md-6'
              data-test-id='dod-sc-sdb-two-prev-year'
            >
              <InputField
                name='two_prev_year_revenue_total_sdb_awarded_sub'
                placeholder={twoPrevYear}
                id='total-dod-sc-sdb-two-prev-year'
                required={true}
                value={
                  mentorApp &&
                  mentorApp['two_prev_year_revenue_total_sdb_awarded_sub']
                }
                mask={
                  mentorApp &&
                  mentorApp['two_prev_year_revenue_total_sdb_awarded_sub'] &&
                  dollarMask
                }
                format={formatDollar}
                maxlength='19'
                view={mentorApplicationInfo}
              />
              <div className='mb-4'>
                <p>SF295</p>
              </div>
              {/* <InputFileField
                id='dod-sc-sdb-file-two-prev-year'
                name='two_prev_year_revenue_total_sdb_awarded_sub_upload_file'
                viewFile={ViewFile}
                fileId='two_prev_year_revenue_total_sdb_awarded_sub_upload_id'
                onChange={ChangeFile2}
                file={subContractFile2}
                view={mentorApplicationInfo}
                fileError={fileError2}
              /> */}
              {/* <FileUploadComponent
                agreement_type={agreement_type}
                field_name={
                  field_name.two_prev_year_revenue_total_sdb_awarded_sub
                }
                agreement_id={agreement_id}
                handleUploadedFiles={handleUploadedFiles}
                initialFiles={initialFiles.twoPrevYearRevenueFile}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DODSubContracts
