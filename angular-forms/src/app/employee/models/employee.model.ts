/**
 * Employee Module - Models and Interfaces
 * Industrial-grade data structures for employee management system
 * 
 * @module employee.model
 * @description Defines all interfaces and types for employee management with forms
 */

/**
 * Address Interface
 * Represents residential or office address with complete location details
 */
export interface Address {
  id?: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isCurrentAddress: boolean;
  addressType: 'residential' | 'office' | 'other';
}

/**
 * Education Interface
 * Represents employee's educational background
 */
export interface Education {
  id?: string;
  degree: string;
  institution: string;
  fieldOfStudy: string;
  graduationYear: number;
  gpa?: number;
  certificateNumber?: string;
}

/**
 * Certification Interface
 * Represents professional certifications and qualifications
 */
export interface Certification {
  id?: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  isActive: boolean;
}

/**
 * Employment History Interface
 * Represents previous employment records
 */
export interface EmploymentHistory {
  id?: string;
  companyName: string;
  jobTitle: string;
  department: string;
  startDate: string;
  endDate?: string;
  isCurrentEmployment: boolean;
  description: string;
  reasonForLeaving?: string;
}

/**
 * Skill Interface
 * Represents professional skills with proficiency levels
 */
export interface Skill {
  id?: string;
  name: string;
  category: 'technical' | 'soft' | 'language' | 'other';
  proficiencyLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsOfExperience: number;
  lastUsedDate?: string;
}

/**
 * Emergency Contact Interface
 * Represents emergency contact information
 */
export interface EmergencyContact {
  id?: string;
  fullName: string;
  relationship: string;
  contactNumber: string;
  email?: string;
  address?: string;
}

/**
 * Salary Information Interface
 * Represents salary and compensation details
 */
export interface SalaryInfo {
  baseSalary: number;
  currency: string;
  paymentFrequency: 'monthly' | 'bi-weekly' | 'weekly';
  benefits?: string[];
  bonus?: number;
  allowances?: {
    [key: string]: number;
  };
}

/**
 * Employee Interface
 * Main employee entity - represents complete employee information
 * Industrial-grade structure with all necessary fields
 */
export interface Employee {
  id?: string;
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  nationality: string;
  profileImage?: string;

  // Employment Details
  employeeId: string;
  department: string;
  designation: string;
  reportingManager?: string;
  employmentType: 'permanent' | 'contract' | 'temporary' | 'freelance';
  dateOfJoining: string;
  dateOfTermination?: string;
  employmentStatus: 'active' | 'inactive' | 'on-leave' | 'terminated';

  // Location and Address
  addresses: Address[];
  workLocation: string;

  // Contact Details
  emergencyContacts: EmergencyContact[];
  alternatePhone?: string;
  personalEmail?: string;

  // Professional Information
  educations: Education[];
  certifications: Certification[];
  skills: Skill[];
  languages?: string[];
  employmentHistory: EmploymentHistory[];

  // Compensation
  salaryInfo: SalaryInfo;
  accountNumber?: string;
  bankName?: string;

  // System Information
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
  isActive: boolean;
  notes?: string;

  // Form Control
  formVersion?: number;
  lastModifiedField?: string;
}

/**
 * Employee Form DTO
 * Data Transfer Object for form submission
 * May differ from Employee entity for form processing
 */
export interface EmployeeFormData {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  employeeId: string;
  department: string;
  designation: string;
  employmentType: string;
  dateOfJoining: string;
  employmentStatus: string;
  workLocation: string;
  addresses: Address[];
  emergencyContacts: EmergencyContact[];
  educations: Education[];
  certifications: Certification[];
  skills: Skill[];
  salaryInfo: SalaryInfo;
  termsAndConditions: boolean;
  dataPrivacyConsent: boolean;
  backgroundCheckConsent: boolean;
}

/**
 * Validation Error Response
 * Represents field-level validation errors
 */
export interface ValidationError {
  field: string;
  code: string;
  message: string;
  params?: any;
}

/**
 * Form Submission Response
 * Response returned after form submission
 */
export interface FormSubmissionResponse {
  success: boolean;
  message: string;
  data?: Employee;
  errors?: ValidationError[];
  warnings?: string[];
}

/**
 * Employee Search Criteria
 * Used for filtering and searching employees
 */
export interface EmployeeSearchCriteria {
  searchText?: string;
  department?: string;
  designation?: string;
  employmentStatus?: string;
  dateRange?: {
    from: string;
    to: string;
  };
  skills?: string[];
  pageNumber: number;
  pageSize: number;
}

/**
 * Page Response
 * Generic pagination response
 */
export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
