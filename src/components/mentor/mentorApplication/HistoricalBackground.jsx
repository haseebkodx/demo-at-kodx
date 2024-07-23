// import React from 'react'
// import OptionField from '../../commonComponents/forms/OptionField'
// import InputDatePicker from '../../commonComponents/forms/InputDatePickert'
// import formatDate from '../../../helpers/formatter/formatDate'
// import { keydownHandler } from '../../commonComponents/utility'

// function HistoricalBackground({
//   mentorApp,
//   mentorApplicationInfo,
//   submitted,
//   summary,
//   isGraduation8aProgramDateProvided
// }) {
//   const SDB = [
//     {
//       name: 'was_small_disadvantaged_business',
//       label: 'Yes',
//       value: 'true',
//       id: `Yes - was small disadvantaged business`
//     },
//     {
//       name: 'was_small_disadvantaged_business',
//       label: 'No',
//       value: 'false',
//       id: `No - was small disadvantaged business`
//     }
//   ]

//   const WOSB = [
//     {
//       name: 'was_woman_owned_small_business',
//       label: 'Yes',
//       value: 'true',
//       id: `Yes - was woman owned small business`
//     },
//     {
//       name: 'was_woman_owned_small_business',
//       label: 'No',
//       value: 'false',
//       id: `No - was woman owned small business`
//     }
//   ]
//   const EightAProgram = [
//     {
//       name: 'company_graduated_8a_program',
//       label: 'Yes',
//       value: 'true',
//       id: `Yes - company graduated 8a program`
//     },
//     {
//       name: 'company_graduated_8a_program',
//       label: 'No',
//       value: 'false',
//       id: `No - company graduated 8a program`
//     }
//   ]

//   return (
//     <div
//       id='history-questions'
//       className={`row left-align ${summary ? 'mt-5' : 'mb-3'}`}
//     >
//       {!summary && (
//         <div className='col-md-10'>
//           <h2 className='reviewer-section-title mentor-application-header col-md-12 p-3'>
//             Historical Background
//           </h2>
//         </div>
//       )}
//       <div className='col-md-10'>
//         {summary && (
//           <h2 className='mb-1 my-3 mentor-summary-section-heading'>
//             Historical Background
//           </h2>
//         )}
//         <div className='row mb-3' data-test-id='SDB'>
//           <fieldset className='col-12'>
//             <legend>
//               <p className='mb-1'>
//                 <span aria-hidden='true'>*</span>Has your company ever been a
//                 small disadvantaged business (SDB)?
//                 <i className='sr-only'>This is a required field.</i>
//               </p>
//             </legend>
//             <div>
//               <OptionField
//                 name='was_small_disadvantaged_business'
//                 placeholder='SDB'
//                 options={SDB}
//                 value={
//                   mentorApp && mentorApp['was_small_disadvantaged_business']
//                 }
//                 view={mentorApplicationInfo || summary}
//                 onKeyDown={keydownHandler}
//               />
//             </div>
//             <div className='col-md-10'>
//               <div className='row'>
//                 <div className='col-md-12 pl-0'>
//                   {submitted &&
//                     mentorApp &&
//                     !mentorApp['was_small_disadvantaged_business'] && (
//                       <p className='erorr-red my-2'>
//                         This is a required field.
//                       </p>
//                     )}
//                 </div>
//               </div>
//             </div>
//           </fieldset>
//         </div>
//         <div className='row mb-3' data-test-id='WOSB'>
//           <fieldset className='col-12'>
//             <legend>
//               <p className='mb-1'>
//                 <span aria-hidden='true'>*</span>Has your company ever been a
//                 woman-owned small business (WOSB)?
//                 <i className='sr-only'>This is a required field.</i>
//               </p>
//             </legend>
//             <div>
//               <OptionField
//                 name='was_woman_owned_small_business'
//                 placeholder='WOSB'
//                 options={WOSB}
//                 value={mentorApp && mentorApp['was_woman_owned_small_business']}
//                 view={mentorApplicationInfo || summary}
//                 onKeyDown={keydownHandler}
//               />
//             </div>
//             <div className='col-md-10'>
//               <div className='row'>
//                 <div className='col-md-12 pl-0'>
//                   {submitted &&
//                     mentorApp &&
//                     !mentorApp['was_woman_owned_small_business'] && (
//                       <p className='erorr-red my-2'>
//                         This is a required field.
//                       </p>
//                     )}
//                 </div>
//               </div>
//             </div>
//           </fieldset>
//         </div>
//         <div id="graduation-eighta-program-on" className='row mb-3' data-test-id='EightAProgram'>
//           <fieldset className='col-12'>
//             <legend>
//               <p className='mb-1'>
//                 <span aria-hidden='true'>*</span>Has your company graduated from
//                 the 8(a) program?
//                 <i className='sr-only'>This is a required field.</i>
//               </p>
//             </legend>
//             <div>
//               <OptionField
//                 name='company_graduated_8a_program'
//                 placeholder='EightAProgram'
//                 options={EightAProgram}
//                 value={mentorApp && mentorApp['company_graduated_8a_program']}
//                 view={mentorApplicationInfo || summary}
//                 onKeyDown={keydownHandler}
//               />
//             </div>
//             <div className='col-md-10'>
//               <div className='row'>
//                 <div className='col-md-12 pl-0'>
//                   {submitted &&
//                     mentorApp &&
//                     !mentorApp['company_graduated_8a_program'] && (
//                       <p className='erorr-red my-2'>
//                         This is a required field.
//                       </p>
//                     )}
//                 </div>
//               </div>
//             </div>
//           </fieldset>
//           <div
//             className='col-12 col-lg-5 pl-3'
//             data-test-id='Company Phone Number'
//           >
//             {((mentorApp && (mentorApp['company_graduated_8a_program'] === 'true' || mentorApp['company_graduated_8a_program'] === true))
//               || (mentorApplicationInfo && mentorApplicationInfo['graduated_8a_program_on'])) &&
//               <>
//                 <div>
//                   <label>Graduated 8(a) program on</label>
//                 </div>
//                 <InputDatePicker
//                   name='graduated_8a_program_on'
//                   value={mentorApp && mentorApp['graduated_8a_program_on']}
//                   disabled={mentorApplicationInfo || summary}
//                   clearAriaLabel={'graduated_8a_program_on'}
//                   calendarAriaLabel={'graduated_8a_program_on'}
//                   maxDate={new Date(4102349083000)}
//                 />
//                 <div className='col-md-10'>
//                   <div className='row'>
//                     <div className='col-md-12 pl-0'>
//                       {isGraduation8aProgramDateProvided && (
//                         <p className='erorr-red my-2'>
//                           If you do not have a graduation date, select &apos;No&apos;.
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </>}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default HistoricalBackground
import React, { useEffect } from "react";
import InputCheckbox from "../../commonComponents/forms/InputCheckbox";
import InputDatePicker from "../../commonComponents/forms/InputDatePickert";
import InputField from "../../commonComponents/forms/InputField";
import OptionField from "../../commonComponents/forms/OptionField";
import { keydownHandler } from "../../commonComponents/utility";

function HistoricalBackground({
  mentorApp,
  mentorProtegeAgrStatus,
  submitted,
  protegeAgreementData,
  reviewer = true,
  mentorApplicationInfo,
  summary,
}) {
  const certificationOptions = [
    {
      name: "Certified Small Business",
      label: "Small Business",
      value: "true",
      id: "Yes",
    },
    {
      name: "Certified Small Business",
      label: "Other than a Small Business",
      value: "false",
      id: "No",
    },
  ];

  const getCheckFieldError = () => {
    return mentorApp &&
      ((mentorApp["app_sba_8a"] &&
        mentorApp["app_sba_8a"]?.toString() === "true") ||
        (mentorApp["app_sba_hz"] &&
          mentorApp["app_sba_hz"]?.toString() === "true") ||
        (mentorApp["app_sba_vosb"] &&
          mentorApp["app_sba_vosb"]?.toString() === "true") ||
        (mentorApp["app_sba_wosb"] &&
          mentorApp["app_sba_wosb"]?.toString() === "true") ||
        (mentorApp["app_sba_sde"] &&
          mentorApp["app_sba_sde"]?.toString() === "true") ||
        (mentorApp["app_sba_sdb"] &&
          mentorApp["app_sba_sdb"]?.toString() === "true") ||
        (mentorApp["app_sba_nog"] &&
          mentorApp["app_sba_nog"]?.toString() === "true") ||
        (mentorApp["app_sba_it"] &&
          mentorApp["app_sba_it"]?.toString() === "true") ||
        (mentorApp["app_sba_ndc"] &&
          mentorApp["app_sba_ndc"]?.toString() === "true") ||
        (mentorApp["app_sba_dod_needs"] &&
          mentorApp["app_sba_dod_needs"]?.toString() === "true"))
      ? false
      : true;
  };

  useEffect(() => {
    if (mentorApp && mentorApp["app_certified_small_business"] !== null) {
      if (mentorApp["app_certified_small_business"] === false)
        mentorApp.app_certified_small_business = "false";
      if (mentorApp["app_certified_small_business"] === true)
        mentorApp.app_certified_small_business = "true";
    }
  }, [mentorApp]);

  return (
    <div className="col-md-12 ml-n3 mt-4">
      {reviewer && (
        <h1 className="page-title reviewer-section-title section-header">
          Historical Background
        </h1>
      )}
      <div className="row mb-4">
        <div className="col-md-12" data-test-id="Certified Small Business">
          <fieldset>
            <legend>
              <div className="left-align mt-2 mb-2">
                <span aria-hidden="true">
                  1. How is your company classified?
                </span>
                <span className="sr-only">This is a required question.</span>
              </div>
            </legend>
            {
              <OptionField
                name="app_certified_small_business"
                placeholder="Certified Small Business"
                options={certificationOptions}
                value={
                  mentorApp &&
                  mentorApp["app_certified_small_business"]?.toString()
                }
                submitted={submitted}
                required={true}
                view={mentorApplicationInfo || summary}
                onKeyDown={keydownHandler}
              />
            }
          </fieldset>
        </div>

        {mentorApp &&
          mentorApp["app_certified_small_business"]?.toString() === "false" && (
            <div
              className="mt-3 mx-4 p-4 rounded font-italic"
              style={{ background: "#f3f3f3" }}
            >
              In accordance with DFARS Appendix I-102, a company must be an
              other than small business concern, unless approved by the Director
              of the Office of Small Business Programs (OSBP), Office of the
              Under Secretary of Defense, Acquisition and Sustainment
              (OUSD(A&S)) (Note: Potential waivers will be provided after the
              review of this application.)
            </div>
            // <div
            //   className="mb-2 mt-4 ml-3"
            //   data-test-id="Historical Background"
            // >
            //   <InputField
            //     name="app_sba_cgp"
            //     type="textarea"
            //     placeholder="Please provide a description of the goods/services your company provides that
            //    are critical to enhancing the DOD supplier base"
            //     id="sba-cgp"
            //     required={true}
            //     value={mentorApp && mentorApp["app_sba_cgp"]}
            //     rows="3"
            //     errorMessage="This field is required"
            //     view={mentorApplicationInfo || summary}
            //   />
            // </div>
          )}
      </div>
      {((mentorApp &&
        mentorApp["app_certified_small_business"] &&
        mentorApp["app_certified_small_business"]?.toString() === "true") ||
        (mentorApplicationInfo &&
          mentorApplicationInfo["app_certified_small_business"] &&
          mentorApplicationInfo["app_certified_small_business"]?.toString() ===
            "true")) && (
        <div
          className="row"
          data-test-id="Small Disadvantaged Business Details"
        >
          <div className="col-md-12 mt-2">
            <fieldset>
              <legend>
                <p className="left-align mb-2">
                  <span aria-hidden="true">
                    Check at least one of the following:
                  </span>
                  <span className="sr-only">
                    You must select at least one option.
                  </span>
                </p>
              </legend>

              <InputCheckbox
                name="app_sba_hz"
                placeholder="(i) A qualified HUBZone small business convern (HUBZone)"
                value={mentorApp && mentorApp["app_sba_hz"]}
                label={`(i) A qualified HUBZone small business convern (HUBZone)`}
                id={`(i) A qualified HUBZone small business convern (HUBZone)`}
                view={mentorApplicationInfo || summary}
                checked={
                  protegeAgreementData &&
                  protegeAgreementData["app_sba_hz"] &&
                  protegeAgreementData["app_sba_hz"]?.toString() === "true"
                    ? true
                    : mentorApp &&
                      mentorApp["app_sba_hz"] &&
                      mentorApp["app_sba_hz"]?.toString() === "true"
                    ? true
                    : false
                }
                disabled={summary}
                onKeyDown={keydownHandler}
              />

              <InputCheckbox
                name="app_sba_wosb"
                placeholder="(ii) A women-owned small business concern (WOSB)"
                value={mentorApp && mentorApp["app_sba_wosb"]}
                label={`(ii) A women-owned small business concern (WOSB)`}
                id={`(ii) A women-owned small business concern (WOSB)`}
                view={mentorApplicationInfo || summary}
                checked={
                  mentorApplicationInfo &&
                  mentorApplicationInfo["app_sba_wosb"] &&
                  mentorApplicationInfo["app_sba_wosb"]?.toString() === "true"
                    ? true
                    : mentorApp &&
                      mentorApp["app_sba_wosb"] &&
                      mentorApp["app_sba_wosb"]?.toString() === "true"
                    ? true
                    : false
                }
                disabled={summary}
                onKeyDown={keydownHandler}
              />

              <InputCheckbox
                name="app_sba_vosb"
                placeholder="(iii) A service-disabled veteran-owned small business concern"
                value={mentorApp && mentorApp["app_sba_vosb"]}
                label={`(iii) A service-disabled veteran-owned small business concern`}
                id={`(iii) A service-disabled veteran-owned small business concern`}
                view={mentorApplicationInfo || summary}
                checked={
                  protegeAgreementData &&
                  protegeAgreementData["app_sba_vosb"] &&
                  protegeAgreementData["app_sba_vosb"]?.toString() === "true"
                    ? true
                    : mentorApp &&
                      mentorApp["app_sba_vosb"] &&
                      mentorApp["app_sba_vosb"]?.toString() === "true"
                    ? true
                    : false
                }
                disabled={summary}
                onKeyDown={keydownHandler}
              />

              <InputCheckbox
                name="app_sba_it"
                placeholder="(iv) An entity owned and controlled by an Indian tribe"
                value={mentorApp && mentorApp["app_sba_it"]}
                label={`(iv) An entity owned and controlled by an Indian tribe`}
                id={`(iv) An entity owned and controlled by an Indian tribe`}
                view={mentorApplicationInfo || summary}
                checked={
                  protegeAgreementData &&
                  protegeAgreementData["app_sba_it"] &&
                  protegeAgreementData["app_sba_it"]?.toString() === "true"
                    ? true
                    : mentorApp &&
                      mentorApp["app_sba_it"] &&
                      mentorApp["app_sba_it"]?.toString() === "true"
                    ? true
                    : false
                }
                disabled={summary}
                onKeyDown={keydownHandler}
              />

              <InputCheckbox
                name="app_sba_nog"
                placeholder="(v) An entity owned and controlled by a Native Hawaiian organization"
                value={mentorApp && mentorApp["app_sba_nog"]}
                label={`(v) An entity owned and controlled by a Native Hawaiian organization`}
                id={`(v) An entity owned and controlled by a Native Hawaiian organization`}
                view={mentorApplicationInfo || summary}
                checked={
                  protegeAgreementData &&
                  protegeAgreementData["app_sba_nog"] &&
                  protegeAgreementData["app_sba_nog"]?.toString() === "true"
                    ? true
                    : mentorApp &&
                      mentorApp["app_sba_nog"] &&
                      mentorApp["app_sba_nog"]?.toString() === "true"
                    ? true
                    : false
                }
                disabled={summary}
                onKeyDown={keydownHandler}
              />

              <InputCheckbox
                name="app_sba_sdb"
                placeholder="(vi) An entity owned and controlled by socially and economically disadvantaged individuals"
                value={mentorApp && mentorApp["app_sba_sdb"]}
                label={`(vi) An entity owned and controlled by socially and economically disadvantaged individuals`}
                id={`(vi) An entity owned and controlled by socially and economically disadvantaged individuals`}
                view={mentorApplicationInfo || summary}
                disabled={summary}
                checked={
                  mentorApplicationInfo &&
                  mentorApplicationInfo["app_sba_sdb"] &&
                  mentorApplicationInfo["app_sba_sdb"]?.toString() === "true"
                    ? true
                    : mentorApp &&
                      mentorApp["app_sba_sdb"] &&
                      mentorApp["app_sba_sdb"]?.toString() === "true"
                    ? true
                    : false
                }
                onKeyDown={keydownHandler}
              />

              <InputCheckbox
                name="app_sba_sde"
                placeholder="(vii) A qualified organization employing severely disabled individuals"
                value={mentorApp && mentorApp["app_sba_sde"]}
                label={`(vii) A qualified organization employing severely disabled individuals`}
                id={`(vii) A qualified organization employing severely disabled individuals`}
                view={mentorApplicationInfo || summary}
                disabled={summary}
                checked={
                  mentorApplicationInfo &&
                  mentorApplicationInfo["app_sba_sde"] &&
                  mentorApplicationInfo["app_sba_sde"]?.toString() === "true"
                    ? true
                    : mentorApp &&
                      mentorApp["app_sba_sde"] &&
                      mentorApp["app_sba_sde"]?.toString() === "true"
                    ? true
                    : false
                }
                onKeyDown={keydownHandler}
              />

              <InputCheckbox
                name="app_sba_8a"
                placeholder="(viii) 8(a) program"
                value={mentorApp && mentorApp["app_sba_8a"]}
                label={`(viii) 8(a) program`}
                id={`(viii) 8(a) program`}
                view={mentorApplicationInfo || summary}
                checked={
                  protegeAgreementData &&
                  protegeAgreementData["app_sba_8a"] &&
                  protegeAgreementData["app_sba_8a"]?.toString() === "sba_8a"
                    ? true
                    : mentorApp &&
                      mentorApp["app_sba_8a"] &&
                      mentorApp["app_sba_8a"]?.toString() === "true"
                    ? true
                    : false
                }
                disabled={summary}
                onKeyDown={keydownHandler}
              />
            </fieldset>

            {mentorApp &&
              mentorApp["app_sba_8a"] &&
              mentorApp["app_sba_8a"]?.toString() === "true" && (
                <>
                  <label>8(a) graduated program Date (Optional)</label>
                  <div>
                    <InputDatePicker
                      name="app_sba_8a_graduated_date"
                      value={
                        mentorApp && mentorApp["app_sba_8a_graduated_date"]
                      }
                      disabled={summary}
                      clearAriaLabel={"app_sba_8a_graduated_date"}
                      calendarAriaLabel={"app_sba_8a_graduated_date"}
                      maxDate={new Date(4102349083000)}
                    />
                  </div>
                </>
              )}

            <InputCheckbox
              name="app_sba_ndc"
              placeholder="(ix) A nontraditional defense contractor"
              value={mentorApp && mentorApp["app_sba_ndc"]}
              label={`(ix) A nontraditional defense contractor`}
              id={`(ix) A nontraditional defense contractor`}
              view={mentorApplicationInfo || summary}
              disabled={summary}
              checked={
                mentorApplicationInfo &&
                mentorApplicationInfo["app_sba_ndc"] &&
                mentorApplicationInfo["app_sba_ndc"]?.toString() === "true"
                  ? true
                  : mentorApp &&
                    mentorApp["app_sba_ndc"] &&
                    mentorApp["app_sba_ndc"]?.toString() === "true"
                  ? true
                  : false
              }
              onKeyDown={keydownHandler}
            />

            <InputCheckbox
              name="app_sba_dod_needs"
              placeholder="(x) An entity that currently provides goods or services in the private sector that are critical to enhancing the capabilities of the defense supplier base and fulfilling key DoD needs"
              value={mentorApp && mentorApp["app_sba_dod_needs"]}
              label={`(x) An entity that currently provides goods or services in the private sector that are critical to enhancing the capabilities of the defense supplier base and fulfilling key DoD needs`}
              id={`(x) An entity that currently provides goods or services in the private sector that are critical to enhancing the capabilities of the defense supplier base and fulfilling key DoD needs`}
              view={mentorApplicationInfo || summary}
              disabled={summary}
              checked={
                mentorApplicationInfo &&
                mentorApplicationInfo["app_sba_dod_needs"] &&
                mentorApplicationInfo["app_sba_dod_needs"]?.toString() ===
                  "true"
                  ? true
                  : mentorApp &&
                    mentorApp["app_sba_dod_needs"] &&
                    mentorApp["app_sba_dod_needs"]?.toString() === "true"
                  ? true
                  : false
              }
              onKeyDown={keydownHandler}
              labelStyle={{ width: "80%", marginTop: "5px" }}
            />

            {getCheckFieldError() && (
              <div className="erorr-red">
                You must select at least one option if your company is certified
                as SBA
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default HistoricalBackground;
