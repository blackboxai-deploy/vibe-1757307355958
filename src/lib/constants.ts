// Constants for Alberta Pharmacy Management System

export const CANADIAN_PROVINCES = [
  { value: 'AB', label: 'Alberta' },
  { value: 'BC', label: 'British Columbia' },
  { value: 'MB', label: 'Manitoba' },
  { value: 'NB', label: 'New Brunswick' },
  { value: 'NL', label: 'Newfoundland and Labrador' },
  { value: 'NS', label: 'Nova Scotia' },
  { value: 'NT', label: 'Northwest Territories' },
  { value: 'NU', label: 'Nunavut' },
  { value: 'ON', label: 'Ontario' },
  { value: 'PE', label: 'Prince Edward Island' },
  { value: 'QC', label: 'Quebec' },
  { value: 'SK', label: 'Saskatchewan' },
  { value: 'YT', label: 'Yukon' }
];

// Alberta Tax Rates (as of 2024)
export const ALBERTA_TAX_RATES = {
  GST: 0.05, // 5% GST
  PST: 0.0,  // No PST in Alberta
  TOTAL: 0.05
};

// Alberta Health Card Number Format
export const ALBERTA_HEALTH_CARD_REGEX = /^\d{9}-\d{4}$/;

// Drug Identification Number (DIN) Format - Canada
export const DIN_REGEX = /^\d{8}$/;

// Controlled Substance Schedules (Health Canada)
export const CONTROLLED_SUBSTANCE_SCHEDULES = [
  { value: 'I', label: 'Schedule I - Narcotics' },
  { value: 'II', label: 'Schedule II - Controlled Drugs' },
  { value: 'III', label: 'Schedule III - Controlled Drugs' },
  { value: 'IV', label: 'Schedule IV - Controlled Drugs' },
  { value: 'V', label: 'Schedule V - Controlled Drugs' },
  { value: 'VI', label: 'Schedule VI - Precursors' },
  { value: 'VII', label: 'Schedule VII - Precursors' },
  { value: 'VIII', label: 'Schedule VIII - Precursors' }
];

// Common Drug Dosage Forms
export const DOSAGE_FORMS = [
  'Tablet', 'Capsule', 'Liquid', 'Injection', 'Topical', 
  'Inhaler', 'Drops', 'Cream', 'Ointment', 'Patch',
  'Suppository', 'Powder', 'Spray', 'Gel', 'Lotion'
];

// Routes of Administration
export const ROUTES_OF_ADMINISTRATION = [
  'Oral', 'Topical', 'Injection', 'Inhalation', 
  'Sublingual', 'Rectal', 'Vaginal', 'Ophthalmic',
  'Otic', 'Nasal', 'Transdermal'
];

// Common Insurance Providers in Alberta
export const ALBERTA_INSURANCE_PROVIDERS = [
  'Alberta Blue Cross',
  'Manulife',
  'Sun Life',
  'Great-West Life',
  'Green Shield Canada',
  'Pacific Blue Cross',
  'Desjardins Insurance',
  'SSQ Insurance',
  'Industrial Alliance',
  'Other'
];

// Prescription Priorities
export const PRESCRIPTION_PRIORITIES = [
  { value: 'normal', label: 'Normal', color: 'text-blue-600' },
  { value: 'urgent', label: 'Urgent', color: 'text-orange-600' },
  { value: 'stat', label: 'STAT', color: 'text-red-600' }
];

// Drug Interaction Severity Levels
export const INTERACTION_SEVERITY = [
  { value: 'minor', label: 'Minor', color: 'text-green-600', bgColor: 'bg-green-50' },
  { value: 'moderate', label: 'Moderate', color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
  { value: 'major', label: 'Major', color: 'text-orange-600', bgColor: 'bg-orange-50' },
  { value: 'contraindicated', label: 'Contraindicated', color: 'text-red-600', bgColor: 'bg-red-50' }
];

// User Roles and Permissions
export const USER_ROLES = {
  ADMIN: {
    label: 'Administrator',
    permissions: ['all']
  },
  PHARMACIST: {
    label: 'Pharmacist',
    permissions: ['prescriptions', 'patients', 'inventory', 'reports', 'pos']
  },
  TECHNICIAN: {
    label: 'Pharmacy Technician',
    permissions: ['prescriptions', 'patients', 'inventory', 'pos']
  },
  MANAGER: {
    label: 'Manager',
    permissions: ['reports', 'inventory', 'pos', 'patients']
  },
  CASHIER: {
    label: 'Cashier',
    permissions: ['pos', 'patients']
  }
};

// Report Types with Descriptions
export const REPORT_TYPES = [
  {
    value: 'daily_sales',
    label: 'Daily Sales Report',
    description: 'Summary of daily transactions and revenue'
  },
  {
    value: 'inventory_status',
    label: 'Inventory Status Report',
    description: 'Current stock levels and reorder recommendations'
  },
  {
    value: 'prescription_volume',
    label: 'Prescription Volume Report',
    description: 'Prescription filling statistics and trends'
  },
  {
    value: 'patient_activity',
    label: 'Patient Activity Report',
    description: 'Patient visit patterns and medication adherence'
  },
  {
    value: 'controlled_substances',
    label: 'Controlled Substances Report',
    description: 'Tracking and reporting for regulated medications'
  },
  {
    value: 'financial_summary',
    label: 'Financial Summary Report',
    description: 'Comprehensive financial performance analysis'
  },
  {
    value: 'compliance_audit',
    label: 'Compliance Audit Report',
    description: 'Regulatory compliance status and requirements'
  }
];

// Dashboard Refresh Intervals (in milliseconds)
export const DASHBOARD_REFRESH_INTERVALS = {
  STATS: 60000, // 1 minute
  ALERTS: 30000, // 30 seconds
  CHARTS: 300000 // 5 minutes
};

// Alert Thresholds
export const ALERT_THRESHOLDS = {
  LOW_STOCK_DAYS: 7, // Alert when stock will run out in 7 days
  EXPIRY_WARNING_DAYS: 90, // Alert when medication expires within 90 days
  EXPIRY_CRITICAL_DAYS: 30, // Critical alert when medication expires within 30 days
  HIGH_INTERACTION_COUNT: 3 // Alert when patient has 3+ major interactions
};

// Common Therapeutic Classes
export const THERAPEUTIC_CLASSES = [
  'Analgesics', 'Antibiotics', 'Antihistamines', 'Antihypertensives',
  'Antidiabetics', 'Antidepressants', 'Anticonvulsants', 'Bronchodilators',
  'Cardiovascular', 'Dermatological', 'Gastrointestinal', 'Hormonal',
  'Immunosuppressants', 'Neurological', 'Ophthalmological', 'Respiratory',
  'Vitamins & Minerals', 'Other'
];

// Standard Measurement Units
export const MEASUREMENT_UNITS = [
  'mg', 'g', 'mcg', 'mL', 'L', 'IU', 'units',
  'tablets', 'capsules', 'doses', 'applications'
];

// Business Hours (default for Alberta pharmacy)
export const DEFAULT_BUSINESS_HOURS = {
  monday: { open: '09:00', close: '18:00', closed: false },
  tuesday: { open: '09:00', close: '18:00', closed: false },
  wednesday: { open: '09:00', close: '18:00', closed: false },
  thursday: { open: '09:00', close: '18:00', closed: false },
  friday: { open: '09:00', close: '18:00', closed: false },
  saturday: { open: '09:00', close: '17:00', closed: false },
  sunday: { open: '11:00', close: '16:00', closed: false }
};

// Navigation Menu Items
export const NAVIGATION_ITEMS = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: 'BarChart3',
    description: 'Overview and analytics'
  },
  {
    title: 'Patients',
    url: '/patients',
    icon: 'Users',
    description: 'Patient management'
  },
  {
    title: 'Prescriptions',
    url: '/prescriptions',
    icon: 'FileText',
    description: 'Prescription processing'
  },
  {
    title: 'Inventory',
    url: '/inventory',
    icon: 'Package',
    description: 'Stock management'
  },
  {
    title: 'Point of Sale',
    url: '/pos',
    icon: 'CreditCard',
    description: 'Transaction processing'
  },
  {
    title: 'Reports',
    url: '/reports',
    icon: 'FileBarChart',
    description: 'Analytics and reporting'
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: 'Settings',
    description: 'System configuration'
  }
];

// System Configuration Defaults
export const SYSTEM_DEFAULTS = {
  CURRENCY: 'CAD',
  LANGUAGE: 'en',
  DATE_FORMAT: 'YYYY-MM-DD',
  TIME_FORMAT: '24h',
  TIMEZONE: 'America/Edmonton', // Alberta timezone
  PAGINATION_SIZE: 25,
  SESSION_TIMEOUT: 3600000 // 1 hour in milliseconds
};