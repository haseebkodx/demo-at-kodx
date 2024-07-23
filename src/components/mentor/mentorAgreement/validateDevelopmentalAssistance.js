import validUploadFile from '../../commonComponents/forms/validations/validUploadFile';

// const validateDevelopmentalAssistance = (mentorAgreement, developmentalAssistanceFile) => {
//   return ((mentorAgreement && mentorAgreement['eligibility_explanation'])
//     || (mentorAgreement && developmentalAssistanceFile && validUploadFile(developmentalAssistanceFile.name)))
//     && (developmentalAssistanceFile ? validUploadFile(developmentalAssistanceFile.name) : true)

// }

const validateDevelopmentalAssistance = (
  mentorAgreement,
  developmentAssistanceFile
) => {
  return (
    (mentorAgreement && mentorAgreement['eligibility_explanation']) ||
    (mentorAgreement && developmentAssistanceFile)
  );
};

export default validateDevelopmentalAssistance;
