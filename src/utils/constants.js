import BusinessDark from '../components/svg/BusinessDark';
import BusinessWhite from '../components/svg/BusinessWhite';
import OrganizationDark from '../components/svg/OrganizationDark';
import OrganizationWhite from '../components/svg/OrganizationWhite';
import SubContractorDark from '../components/svg/SubContractorDark';
import SubContractorWhite from '../components/svg/SubContractorWhite';

export const GovernmentProfileinitialValues = {
  firstName: '',
  lastName: '',
  preferredName: '',
  title: '',
  emailAddress: '',
  phoneNumber: '',
};

export const ContractorProfileinitialValues = {
  firstName: '',
  lastName: '',
  preferredName: '',
  title: '',
  emailAddress: '',
  phoneNumber: '',
  branch: '',
  affiliation: '',
};

export const ContractorInformationinitialValues = {
  orgName: '',
  orgWebsite: '',
  samID: '',
  cageCode: '',
  orgAddress: '',
  orgState: '',
  orgZipCode: '',
  orgMission: '',
  orgVision: '',
  orgCustomer: '',
  orgService: '',
  orgLinkedin: '',
  orgFacebook: '',
  orgYoutube: '',
  orgInstagram: '',
};

export const RoleInitialValues = {
  myBranch: '',
  myRole: '',
};

export const branchOptions = [
  "OSD",
  "Army",
  "Navy",
  "Air Force",
  "DCMA",
  "MDA",
  "NGA",
  "DLA",
  "DISA",
  "DIA",
  "USSOCOM",
  "DCSA",
];

export const subContractorBranchOptions = [
  "APEX Accelerators",
  "Historically Black Colleges & Universities",
  "Manufacturing Innovation Institutes",
  "Minority Institutions",
  "Small Business Development Centers",
  "Women's Business Centers",
];

export const affiliation =[
  "Illinois APEX Accelerator",
  "Illinois APEX Accelerator - Bradley University",
  "Illinois APEX Accelerator - College of DuPage",
  "Illinois APEX Accelerator - Joseph Center",
  "Illinois APEX Accelerator - Southern Illinois University - Carbondale",
  "Illinois APEX Accelerator - Women's Business Development Center",
]

export const allRoleOptions = {
  "OSD": ["Program Manager", "Program Analyst", "System Administrator"],
  "default": ["Program Manager", "Program Analyst"]
};

export const tooltipText = [
  {
    heading: 'Password minimum length',
    desc: ['8 character(s)'],
  },
  {
    heading: 'Password requirements',
    desc: [
      'Contains at least 1 number',
      'Contains at least 1 special character',
      'Contains at least 1 uppercase letter',
      'Contains at least 1 lowercase letter',
    ],
  },
];

const goveRepresentaionTooltip = [
  {
    heading: 'Government Organization',
    desc: [
      'When you represent a government organization you are representing a state, federal or tribal authority and or office of political influence funded by the government',
    ],
  },
];
const businessRepresentaionTooltip = [
  {
    heading: 'Business',
    desc: [
      'A Business is an organization ranging in scale from sole proprietorships to large international corporations interested in, or currently providing goods and services to the government and/or commercial spaces.',
    ],
  },
];
const subContractorRepresentaionTooltip = [
  {
    heading: 'Authorized Subcontractors',
    desc: [
      "Small Business Development Centers (SBDC) established pursuant to section 21 of the Small Business Act (15 U.S.C. 648)",
      "Procurement technical assistance pursuant to 10 U.S.C. Chapter 388 (APEX Accelerators)",
      "Historically Black Colleges and Universities (HBCU)",
      "Minority Institutions (MI) of higher education",
      "Women’s Business Centers (WBC) described in section 29 of the Small Business Act (15 U.S.C. 656)",
      "Manufacturing Innovation Institutes (MII)",
    ],
  },
];

export const associationItems = [
  {
    id: 0,
    DarkIcon: OrganizationDark,
    Icon: OrganizationWhite,
    desc: 'I am representing a government organization',
    value: 'GOVERNMENT',
    greenBackground: true,
    tooltipText: goveRepresentaionTooltip,
  },
  {
    id: 1,
    DarkIcon: BusinessDark,
    Icon: BusinessWhite,
    desc: 'I am representing a business',
    value: 'BUSINESS',
    greenBackground: true,
    tooltipText: businessRepresentaionTooltip,
  },
  {
    id: 2,
    DarkIcon: SubContractorDark,
    Icon: SubContractorWhite,
    desc: 'I am representing an Authorized Subcontractor',
    value: 'BUSINESS',
    greenBackground: true,
    tooltipText: subContractorRepresentaionTooltip,
  },
];
