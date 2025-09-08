// Core system types for Alberta Pharmacy Management System

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  licenseNumber?: string; // For pharmacists
  phoneNumber?: string;
  isActive: boolean;
  createdAt: Date;
  lastLogin?: Date;
}

export enum UserRole {
  ADMIN = 'admin',
  PHARMACIST = 'pharmacist',
  TECHNICIAN = 'technician',
  MANAGER = 'manager',
  CASHIER = 'cashier'
}

export interface Patient {
  id: string;
  albertaHealthNumber: string; // Alberta Health Card Number
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  phoneNumber: string;
  email?: string;
  address: Address;
  allergies: Allergy[];
  insuranceInfo: InsuranceInfo[];
  emergencyContact?: EmergencyContact;
  notes?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phoneNumber: string;
}

export interface Allergy {
  id: string;
  allergen: string;
  reaction: string;
  severity: 'mild' | 'moderate' | 'severe';
  dateReported: Date;
}

export interface InsuranceInfo {
  id: string;
  provider: string;
  policyNumber: string;
  groupNumber?: string;
  coverageType: 'primary' | 'secondary';
  isActive: boolean;
}

export interface Prescription {
  id: string;
  prescriptionNumber: string;
  patientId: string;
  doctorName: string;
  doctorPhone?: string;
  medication: Medication;
  instructions: string;
  quantity: number;
  refillsRemaining: number;
  originalRefills: number;
  datePrescribed: Date;
  dateExpires: Date;
  status: PrescriptionStatus;
  dispensedBy?: string;
  dispensedAt?: Date;
  interactions: DrugInteraction[];
  notes?: string;
  isControlled: boolean;
  priority: 'normal' | 'urgent' | 'stat';
}

export enum PrescriptionStatus {
  PENDING = 'pending',
  URGENT = 'urgent',
  IN_PROGRESS = 'in_progress',
  READY = 'ready',
  DISPENSED = 'dispensed',
  CANCELLED = 'cancelled',
  ON_HOLD = 'on_hold'
}

export interface Medication {
  id: string;
  din: string; // Drug Identification Number (Canada)
  name: string;
  genericName: string;
  manufacturer: string;
  strength: string;
  dosageForm: string;
  routeOfAdministration: string;
  therapeuticClass: string;
  isControlled: boolean;
  controlledSubstanceSchedule?: string;
  cost: number;
  sellingPrice: number;
  stockQuantity: number;
  minimumStock: number;
  expiryDate?: Date;
  batchNumber?: string;
  supplierInfo?: SupplierInfo;
}

export interface SupplierInfo {
  id: string;
  name: string;
  contactInfo: string;
  accountNumber?: string;
}

export interface DrugInteraction {
  id: string;
  interactingMedication: string;
  severity: 'minor' | 'moderate' | 'major' | 'contraindicated';
  description: string;
  recommendation: string;
}

export interface Transaction {
  id: string;
  transactionNumber: string;
  patientId?: string;
  items: TransactionItem[];
  subtotal: number;
  gst: number; // 5% in Alberta
  pst: number; // 0% in Alberta
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  insuranceClaim?: InsuranceClaim;
  cashierId: string;
  timestamp: Date;
  receiptNumber: string;
}

export interface TransactionItem {
  id: string;
  type: 'prescription' | 'otc' | 'service';
  itemId: string; // Prescription ID or Product ID
  itemName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  taxable: boolean;
}

export enum PaymentMethod {
  CASH = 'cash',
  DEBIT = 'debit',
  CREDIT = 'credit',
  INSURANCE = 'insurance',
  MIXED = 'mixed'
}

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded'
}

export interface InsuranceClaim {
  id: string;
  provider: string;
  claimNumber: string;
  submittedAmount: number;
  approvedAmount: number;
  patientPortion: number;
  status: ClaimStatus;
  submittedAt: Date;
  processedAt?: Date;
  rejectionReason?: string;
}

export enum ClaimStatus {
  SUBMITTED = 'submitted',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  PENDING = 'pending'
}

export interface InventoryItem {
  id: string;
  medication: Medication;
  currentStock: number;
  reservedStock: number; // Stock allocated to pending prescriptions
  availableStock: number; // currentStock - reservedStock
  reorderLevel: number;
  maxStock: number;
  avgMonthlySales: number;
  lastRestockDate?: Date;
  expiryAlerts: ExpiryAlert[];
}

export interface ExpiryAlert {
  batchNumber: string;
  quantity: number;
  expiryDate: Date;
  daysUntilExpiry: number;
  alertLevel: 'info' | 'warning' | 'critical';
}

export interface Report {
  id: string;
  type: ReportType;
  title: string;
  description?: string;
  generatedBy: string;
  generatedAt: Date;
  parameters: Record<string, any>;
  data: any;
  format: 'pdf' | 'excel' | 'csv';
}

export enum ReportType {
  DAILY_SALES = 'daily_sales',
  INVENTORY_STATUS = 'inventory_status',
  PRESCRIPTION_VOLUME = 'prescription_volume',
  PATIENT_ACTIVITY = 'patient_activity',
  CONTROLLED_SUBSTANCES = 'controlled_substances',
  FINANCIAL_SUMMARY = 'financial_summary',
  COMPLIANCE_AUDIT = 'compliance_audit'
}

// Dashboard and Analytics Types
export interface DashboardStats {
  todaySales: number;
  todayPrescriptions: number;
  pendingPrescriptions: number;
  lowStockItems: number;
  patientVisits: number;
  insuranceClaims: {
    pending: number;
    approved: number;
    rejected: number;
  };
  expiryAlerts: number;
  controlledSubstanceAlerts: number;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  date?: Date;
  category?: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface PatientForm {
  firstName: string;
  lastName: string;
  albertaHealthNumber: string;
  dateOfBirth: string;
  phoneNumber: string;
  email?: string;
  address: Address;
}

export interface PrescriptionForm {
  patientId: string;
  medicationId: string;
  doctorName: string;
  doctorPhone?: string;
  instructions: string;
  quantity: number;
  refills: number;
  priority: 'normal' | 'urgent' | 'stat';
  notes?: string;
}