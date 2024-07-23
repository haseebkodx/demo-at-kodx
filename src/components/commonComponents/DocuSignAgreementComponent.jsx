import React from 'react';
import '../commonComponents/commonComponents.scss';
import '../protegeAgreement/protegeAgreement.scss';
import pdf from '../../assets/images/pdf.png'

const DocuSignAgreementComponent = ({
  docusignEnvelope_id,
  openDocusignPdfFile
}) => {
  return (
    <>
      {docusignEnvelope_id ? (
        <div className='col-md-12 mt-5 docusign-container'>
          <div className='row '>
            <div className='docusign-header col-md-12 pl-0'>
              <h2 className='agreement-sub-header'>
                DocuSign - Signed Agreement
              </h2>
            </div>
          </div>
          <div className='row my-3'>
            <div className='col-md-12 p-0'>
              <p className='m-0 p-0'>
                Click below to view the completed agreement signed by all
                parties.
              </p>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-12 pb-4'>
              <div
                style={{ height: '100%', width: 150 }}
                className='float-left'
              >
                <img
                  id='docusign-pdf-id'
                  src={pdf}
                  className='mr-3'
                  alt='DocuSign Pdf'
                  title='docusign-pdf'
                />
                <label htmlFor='docusign-pdf-id'>docusign.pdf</label>
              </div>
              <button
                type='button'
                className='protege-agreement-docusign view-docusign-button btn ml-5 px-5 py-2 bottom-back-button'
                onClick={() => openDocusignPdfFile(docusignEnvelope_id)}
              >
                View
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DocuSignAgreementComponent;
