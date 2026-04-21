/**
 * User Model
 * Represents the structure of user data in template-driven forms
 */
export interface User {
  fullName: string;
  email: string;
  password: string;
  gender: string;
  skills: string[];
  country: string;
  termsAccepted: boolean;
}

/**
 * Login Model
 * Represents login credentials for reactive forms
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Profile Model
 * Represents user profile with nested address and dynamic skills
 */
export interface UserProfile {
  name: string;
  phone: string;
  address: {
    street: string;
    city: string;
    zipCode: string;
  };
  skills: string[];
}

/**
 * Submitted Form Data Model
 * For storing and displaying submitted form data
 */
export interface SubmittedFormData {
  timestamp: Date;
  formType: 'template-driven' | 'reactive';
  data: any;
  isValid: boolean;
}
