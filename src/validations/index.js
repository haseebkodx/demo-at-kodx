import * as yup from "yup";

export const GovernmentProfileSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(
      /^[a-zA-Z]+$/,
      "First name must contain only alphabetic characters"
    )
    .required("* First Name is required"),
  lastName: yup
    .string()
    .matches(/^[a-zA-Z]+$/, "Last name must contain only alphabetic characters")
    .required("* Last Name is required"),
  preferredName: yup
    .string()
    .matches(
      /^[a-zA-Z]+$/,
      "Preferred name must contain only alphabetic characters"
    ),
  title: yup
    .string()
    .matches(/^[a-zA-Z]+$/, "Title must contain only alphabetic characters"),
  emailAddress: yup
    .string()
    .email("Enter a valid email address")
    .required("* Email Address is required"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Phone number must contain only numeric characters")
    .required("* Phone Number is required"),
});

export const ContractorProfileSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(
      /^[a-zA-Z]+$/,
      "First name must contain only alphabetic characters"
    )
    .required("* First Name is required"),
  lastName: yup
    .string()
    .matches(/^[a-zA-Z]+$/, "Last name must contain only alphabetic characters")
    .required("* Last Name is required"),
  preferredName: yup
    .string()
    .matches(
      /^[a-zA-Z]+$/,
      "Preferred name must contain only alphabetic characters"
    ),
  title: yup
    .string()
    .matches(/^[a-zA-Z]+$/, "Title must contain only alphabetic characters"),
  emailAddress: yup
    .string()
    .email("Enter a valid email address")
    .required("* Email Address is required"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Phone number must contain only numeric characters")
    .required("* Phone Number is required"),
  branch: yup.string(),
  affiliation: yup.string().required("* Affiliation is required"),
});

export const ContractorInformationSchema = yup.object().shape({
  orgName: yup
    .string()
    .matches(
      /^[a-zA-Z]+$/,
      "Organization name must contain only alphabetic characters"
    )
    .required("* Organization Name is required"),
  orgWebsite: yup.string().url("Organization Website must be a valid URL"),
  samID: yup
    .string()
    .matches(/^[0-9]+$/, "SAM ID must contain only numeric characters"),
  cageCode: yup
    .string()
    .matches(/^[0-9]+$/, "Cage Code must contain only numeric characters"),
  orgAddress: yup.string().required("* Organization Address is required"),
  orgState: yup
    .string()
    .matches(
      /^[A-Za-z]{2}$/,
      "State must contain only two alphabetic characters"
    ),
  orgZipCode: yup
    .string()
    .matches(/^\d{5}(-\d{4})?$/, "Zip Code must be a valid US zip code"),
  orgMission: yup
    .string()
    .matches(
      /^[a-zA-Z0-9\s]+$/,
      "Organization Mission must contain only alphanumeric characters"
    )
    .required("* Organization Mission is required"),
  orgVision: yup
    .string()
    .matches(
      /^[a-zA-Z0-9\s]+$/,
      "Organization Vision must contain only alphanumeric characters"
    )
    .required("* Organization Vision is required"),
  orgCustomer: yup
    .string()
    .matches(
      /^[a-zA-Z0-9\s]+$/,
      "This field must contain only alphanumeric characters"
    ),
  orgService: yup
    .string()
    .matches(
      /^[a-zA-Z0-9\s]+$/,
      "This field must contain only alphanumeric characters"
    ),
  orgLinkedin: yup.string().url("LinkedIn URL must be a valid URL"),
  orgFacebook: yup.string().url("Facebook URL must be a valid URL"),
  orgYoutube: yup.string().url("Youtube URL must be a valid URL"),
  orgInstagram: yup.string().url("Instagram URL must be a valid URL"),
});
