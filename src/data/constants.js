export const ENTITY_TYPES = [
  {
    id: 'llc',
    name: 'LLC',
    fullName: 'Limited Liability Company',
    description: 'Flexible structure with personal liability protection. Best for small businesses and startups.',
    memberLabel: 'Members',
    icon: 'shield',
  },
  {
    id: 'corporation',
    name: 'Corporation',
    fullName: 'C Corporation',
    description: 'Separate legal entity ideal for raising capital. Allows issuing stock to investors.',
    memberLabel: 'Directors & Officers',
    icon: 'building',
  },
]

export const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'Washington D.C.', 'West Virginia', 'Wisconsin', 'Wyoming',
]

export const INDUSTRIES = [
  'Other',
  'Construction',
  'Consulting / Freelance',
  'E-Commerce / Retail',
  'Food & Beverage',
  'Real Estate',
  'Rideshare / Delivery',
  'Technology',
  'Trucking',
]

export const MANAGEMENT_TYPES = {
  llc: [
    { id: 'member-managed', label: 'Member-Managed', description: 'All members participate in daily operations' },
    { id: 'manager-managed', label: 'Manager-Managed', description: 'Designated manager(s) handle daily operations' },
  ],
}

export const INITIAL_FORM_DATA = {
  // Step 1 - Personal info
  owners: [
    { firstName: '', lastName: '', email: '', phone: '' },
  ],

  // Step 2 - Side hustle
  isOperating: '',
  annualRevenue: '',

  // Step 3 - Location & industry
  businessState: '',
  purpose: '',

  // Step 4 - Entity question + business name/timeline
  hasEntity: '',
  startTimeline: '',

  // Step 5 - Entity type & formation state
  entityType: '',
  formationState: '',

  // Step 4 - Company info
  entityName: '',
  altName1: '',
  altName2: '',
  customPurpose: '',
  managementType: '',
  fiscalYearEnd: '12',
  address: {
    street: '',
    suite: '',
    city: '',
    state: '',
    zip: '',
  },

  // Step 5 - People
  members: [
    { firstName: '', lastName: '', title: '', email: '', ownership: '' },
  ],

  // Step 6 - Package
  selectedPackage: 'covered',

  // Step 7 - Review

  // Step 8 - Registered Agent
  registeredAgent: {
    useOurs: true,
    name: '',
    street: '',
    suite: '',
    city: '',
    state: '',
    zip: '',
  },

  // Contact / billing
  contact: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  },
}
