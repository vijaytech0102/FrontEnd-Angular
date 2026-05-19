/**
 * Employee Service
 * Manages employee data, CRUD operations, and business logic
 * Provides mock data for demonstration
 * 
 * @module employee.service
 * @description Industrial-grade service for employee management with data persistence
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, delay, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import {
  Employee,
  EmployeeFormData,
  FormSubmissionResponse,
  EmployeeSearchCriteria,
  PageResponse,
  ValidationError,
} from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly STORAGE_KEY = 'employees_db';
  private readonly SUBMITTED_FORMS_KEY = 'employee_form_submissions';

  // Observable streams
  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  private submittedFormsSubject = new BehaviorSubject<EmployeeFormData[]>([]);
  private currentEmployeeSubject = new BehaviorSubject<Employee | null>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  // Public observables
  public employees$ = this.employeesSubject.asObservable();
  public submittedForms$ = this.submittedFormsSubject.asObservable();
  public currentEmployee$ = this.currentEmployeeSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  public error$ = this.errorSubject.asObservable();

  private employeeIdCounter = 10001;

  constructor() {
    this.initializeData();
  }

  /**
   * Initialize service with mock data
   */
  private initializeData(): void {
    this.loadEmployees();
    this.loadSubmittedForms();
  }

  /**
   * Get all employees with optional filtering
   */
  getEmployees(): Observable<Employee[]> {
    return this.employees$.pipe(
      tap(() => this.clearError())
    );
  }

  /**
   * Search employees with pagination
   */
  searchEmployees(
    criteria: EmployeeSearchCriteria
  ): Observable<PageResponse<Employee>> {
    this.setLoading(true);

    return this.employees$.pipe(
      delay(500), // Simulate API call
      map((employees) => {
        let filtered = employees;

        // Apply filters
        if (criteria.searchText) {
          const text = criteria.searchText.toLowerCase();
          filtered = filtered.filter(
            (emp) =>
              emp.firstName.toLowerCase().includes(text) ||
              emp.lastName.toLowerCase().includes(text) ||
              emp.email.toLowerCase().includes(text) ||
              emp.employeeId.includes(text)
          );
        }

        if (criteria.department) {
          filtered = filtered.filter(
            (emp) => emp.department === criteria.department
          );
        }

        if (criteria.designation) {
          filtered = filtered.filter(
            (emp) => emp.designation === criteria.designation
          );
        }

        if (criteria.employmentStatus) {
          filtered = filtered.filter(
            (emp) => emp.employmentStatus === criteria.employmentStatus
          );
        }

        // Pagination
        const startIndex = (criteria.pageNumber - 1) * criteria.pageSize;
        const endIndex = startIndex + criteria.pageSize;
        const content = filtered.slice(startIndex, endIndex);
        const totalElements = filtered.length;
        const totalPages = Math.ceil(totalElements / criteria.pageSize);

        this.setLoading(false);
        return {
          content,
          totalElements,
          totalPages,
          currentPage: criteria.pageNumber,
          pageSize: criteria.pageSize,
          hasNext: criteria.pageNumber < totalPages,
          hasPrevious: criteria.pageNumber > 1,
        };
      }),
      catchError((error) => {
        this.setError('Error searching employees');
        this.setLoading(false);
        return throwError(() => error);
      })
    );
  }

  /**
   * Get employee by ID
   */
  getEmployeeById(id: string): Observable<Employee | null> {
    this.setLoading(true);

    return this.employees$.pipe(
      delay(300),
      map((employees) => {
        const employee = employees.find((emp) => emp.id === id) || null;
        this.setLoading(false);
        this.currentEmployeeSubject.next(employee);
        return employee;
      }),
      catchError((error) => {
        this.setError('Employee not found');
        this.setLoading(false);
        return of(null);
      })
    );
  }

  /**
   * Create new employee from form data
   */
  createEmployee(
    formData: EmployeeFormData
  ): Observable<FormSubmissionResponse> {
    this.setLoading(true);

    // Validate form data
    const validationErrors = this.validateEmployeeData(formData);
    if (validationErrors.length > 0) {
      this.setLoading(false);
      return of({
        success: false,
        message: 'Validation failed',
        errors: validationErrors,
      });
    }

    // Simulate server processing
    return of(null).pipe(
      delay(800),
      map(() => {
        const employee: Employee = {
          ...formData,
          id: this.generateEmployeeId(),
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: 'current-user',
          updatedBy: 'current-user',
          isActive: true,
          employmentHistory: [],
        };

        // Add to employees list
        const employees = this.employeesSubject.value;
        employees.push(employee);
        this.employeesSubject.next(employees);
        this.saveToStorage();

        // Save form submission
        this.saveFormSubmission(formData);

        this.setLoading(false);
        return {
          success: true,
          message: `Employee ${formData.firstName} ${formData.lastName} created successfully`,
          data: employee,
        };
      }),
      catchError((error) => {
        this.setError('Error creating employee');
        this.setLoading(false);
        return of({
          success: false,
          message: 'Error creating employee',
          errors: [{ field: 'general', code: 'SERVER_ERROR', message: error }],
        });
      })
    );
  }

  /**
   * Update existing employee
   */
  updateEmployee(
    id: string,
    formData: EmployeeFormData
  ): Observable<FormSubmissionResponse> {
    this.setLoading(true);

    const validationErrors = this.validateEmployeeData(formData);
    if (validationErrors.length > 0) {
      this.setLoading(false);
      return of({
        success: false,
        message: 'Validation failed',
        errors: validationErrors,
      });
    }

    return of(null).pipe(
      delay(600),
      map(() => {
        const employees = this.employeesSubject.value;
        const index = employees.findIndex((emp) => emp.id === id);

        if (index === -1) {
          throw new Error('Employee not found');
        }

        const updated: Employee = {
          ...employees[index],
          ...formData,
          id,
          updatedAt: new Date(),
          updatedBy: 'current-user',
        };

        employees[index] = updated;
        this.employeesSubject.next(employees);
        this.saveToStorage();
        this.saveFormSubmission(formData);

        this.setLoading(false);
        return {
          success: true,
          message: `Employee ${formData.firstName} ${formData.lastName} updated successfully`,
          data: updated,
        };
      }),
      catchError((error) => {
        this.setError('Error updating employee');
        this.setLoading(false);
        return of({
          success: false,
          message: 'Error updating employee',
        });
      })
    );
  }

  /**
   * Delete employee
   */
  deleteEmployee(id: string): Observable<FormSubmissionResponse> {
    this.setLoading(true);

    return of(null).pipe(
      delay(500),
      map(() => {
        const employees = this.employeesSubject.value;
        const index = employees.findIndex((emp) => emp.id === id);

        if (index === -1) {
          throw new Error('Employee not found');
        }

        const deleted = employees[index];
        employees.splice(index, 1);
        this.employeesSubject.next(employees);
        this.saveToStorage();

        this.setLoading(false);
        return {
          success: true,
          message: `Employee ${deleted.firstName} ${deleted.lastName} deleted successfully`,
        };
      }),
      catchError((error) => {
        this.setError('Error deleting employee');
        this.setLoading(false);
        return of({ success: false, message: 'Error deleting employee' });
      })
    );
  }

  /**
   * Validate employee data
   */
  validateEmployeeData(data: EmployeeFormData): ValidationError[] {
    const errors: ValidationError[] = [];

    // Validate email format
    if (!this.isValidEmail(data.email)) {
      errors.push({
        field: 'email',
        code: 'INVALID_EMAIL',
        message: 'Invalid email format',
      });
    }

    // Validate phone format
    if (!this.isValidPhone(data.phone)) {
      errors.push({
        field: 'phone',
        code: 'INVALID_PHONE',
        message: 'Invalid phone number',
      });
    }

    // Validate date of joining is not in future
    const joiningDate = new Date(data.dateOfJoining);
    if (joiningDate > new Date()) {
      errors.push({
        field: 'dateOfJoining',
        code: 'FUTURE_DATE',
        message: 'Date of joining cannot be in the future',
      });
    }

    // Validate minimum one address
    if (!data.addresses || data.addresses.length === 0) {
      errors.push({
        field: 'addresses',
        code: 'REQUIRED',
        message: 'At least one address is required',
      });
    }

    // Validate salary
    if (data.salaryInfo.baseSalary <= 0) {
      errors.push({
        field: 'salaryInfo.baseSalary',
        code: 'INVALID_SALARY',
        message: 'Salary must be greater than 0',
      });
    }

    return errors;
  }

  /**
   * Save form submission
   */
  saveFormSubmission(data: EmployeeFormData): void {
    const submissions = this.submittedFormsSubject.value;
    submissions.unshift({
      ...data,
      id: undefined, // Ensure form data doesn't have ID
    });

    // Keep only last 50 submissions
    if (submissions.length > 50) {
      submissions.pop();
    }

    this.submittedFormsSubject.next(submissions);
    this.saveSubmissionsToStorage();
  }

  /**
   * Get submitted forms
   */
  getSubmittedForms(): Observable<EmployeeFormData[]> {
    return this.submittedForms$;
  }

  /**
   * Get distinct departments
   */
  getDepartments(): Observable<string[]> {
    return this.employees$.pipe(
      map((employees) => {
        const departments = new Set(employees.map((emp) => emp.department));
        return Array.from(departments).sort();
      })
    );
  }

  /**
   * Get distinct designations
   */
  getDesignations(): Observable<string[]> {
    return this.employees$.pipe(
      map((employees) => {
        const designations = new Set(employees.map((emp) => emp.designation));
        return Array.from(designations).sort();
      })
    );
  }

  /**
   * Private helper methods
   */

  private generateEmployeeId(): string {
    return `EMP${this.employeeIdCounter++}`;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidPhone(phone: string): boolean {
    const phoneRegex = /^\+?[\d\s\-\(\)]{7,}$/;
    return phoneRegex.test(phone);
  }

  private setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }

  private setError(error: string | null): void {
    this.errorSubject.next(error);
  }

  private clearError(): void {
    this.errorSubject.next(null);
  }

  private saveToStorage(): void {
    try {
      const employees = this.employeesSubject.value;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(employees));
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  }

  private loadEmployees(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const employees = JSON.parse(stored);
        this.employeesSubject.next(employees);
      } else {
        // Load mock data
        const mockEmployees = this.getMockEmployees();
        this.employeesSubject.next(mockEmployees);
        this.saveToStorage();
      }
    } catch (error) {
      console.error('Error loading employees:', error);
      const mockEmployees = this.getMockEmployees();
      this.employeesSubject.next(mockEmployees);
    }
  }

  private saveSubmissionsToStorage(): void {
    try {
      const submissions = this.submittedFormsSubject.value;
      localStorage.setItem(this.SUBMITTED_FORMS_KEY, JSON.stringify(submissions));
    } catch (error) {
      console.error('Error saving submissions:', error);
    }
  }

  private loadSubmittedForms(): void {
    try {
      const stored = localStorage.getItem(this.SUBMITTED_FORMS_KEY);
      if (stored) {
        const submissions = JSON.parse(stored);
        this.submittedFormsSubject.next(submissions);
      }
    } catch (error) {
      console.error('Error loading submissions:', error);
    }
  }

  /**
   * Mock employee data for demonstration
   */
  private getMockEmployees(): Employee[] {
    return [
      {
        id: 'EMP0001',
        firstName: 'Rajesh',
        lastName: 'Kumar',
        email: 'rajesh.kumar@company.com',
        phone: '+91-9876543210',
        dateOfBirth: '1990-05-15',
        gender: 'male',
        nationality: 'Indian',
        employeeId: 'EMP0001',
        department: 'Software Engineering',
        designation: 'Senior Software Engineer',
        reportingManager: 'Amit Sharma',
        employmentType: 'permanent',
        dateOfJoining: '2020-01-15',
        employmentStatus: 'active',
        workLocation: 'Bangalore',
        addresses: [
          {
            id: '1',
            street: '123 Tech Street',
            city: 'Bangalore',
            state: 'Karnataka',
            zipCode: '560001',
            country: 'India',
            isCurrentAddress: true,
            addressType: 'residential',
          },
        ],
        emergencyContacts: [
          {
            id: '1',
            fullName: 'Priya Kumar',
            relationship: 'Spouse',
            contactNumber: '+91-9876543211',
          },
        ],
        educations: [
          {
            id: '1',
            degree: 'Bachelor of Engineering',
            institution: 'IIT Bombay',
            fieldOfStudy: 'Computer Science',
            graduationYear: 2012,
            gpa: 8.5,
          },
        ],
        certifications: [
          {
            id: '1',
            name: 'AWS Solutions Architect',
            issuer: 'Amazon',
            issueDate: '2022-03-15',
            isActive: true,
          },
        ],
        skills: [
          {
            id: '1',
            name: 'Java',
            category: 'technical',
            proficiencyLevel: 'expert',
            yearsOfExperience: 8,
          },
          {
            id: '2',
            name: 'Angular',
            category: 'technical',
            proficiencyLevel: 'advanced',
            yearsOfExperience: 5,
          },
        ],
        employmentHistory: [
          {
            id: '1',
            companyName: 'Tech Company',
            jobTitle: 'Junior Developer',
            department: 'Engineering',
            startDate: '2012-06-01',
            endDate: '2015-12-31',
            isCurrentEmployment: false,
            description: 'Developed web applications',
          },
        ],
        salaryInfo: {
          baseSalary: 1200000,
          currency: 'INR',
          paymentFrequency: 'monthly',
          bonus: 200000,
          benefits: ['Health Insurance', 'Stock Options'],
        },
        createdAt: new Date('2020-01-15'),
        updatedAt: new Date(),
        createdBy: 'admin',
        updatedBy: 'admin',
        isActive: true,
      },
      {
        id: 'EMP0002',
        firstName: 'Anita',
        lastName: 'Singh',
        email: 'anita.singh@company.com',
        phone: '+91-8765432109',
        dateOfBirth: '1992-07-20',
        gender: 'female',
        nationality: 'Indian',
        employeeId: 'EMP0002',
        department: 'Product Management',
        designation: 'Product Manager',
        reportingManager: 'CEO',
        employmentType: 'permanent',
        dateOfJoining: '2019-06-01',
        employmentStatus: 'active',
        workLocation: 'Mumbai',
        addresses: [
          {
            id: '1',
            street: '456 Innovation Avenue',
            city: 'Mumbai',
            state: 'Maharashtra',
            zipCode: '400001',
            country: 'India',
            isCurrentAddress: true,
            addressType: 'residential',
          },
        ],
        emergencyContacts: [
          {
            id: '1',
            fullName: 'Vikram Singh',
            relationship: 'Brother',
            contactNumber: '+91-8765432110',
          },
        ],
        educations: [
          {
            id: '1',
            degree: 'MBA',
            institution: 'IIM Ahmedabad',
            fieldOfStudy: 'Business Management',
            graduationYear: 2016,
            gpa: 8.8,
          },
        ],
        certifications: [
          {
            id: '1',
            name: 'Certified Scrum Product Owner',
            issuer: 'Scrum Alliance',
            issueDate: '2021-09-01',
            isActive: true,
          },
        ],
        skills: [
          {
            id: '1',
            name: 'Product Strategy',
            category: 'soft',
            proficiencyLevel: 'expert',
            yearsOfExperience: 6,
          },
        ],
        employmentHistory: [],
        salaryInfo: {
          baseSalary: 1500000,
          currency: 'INR',
          paymentFrequency: 'monthly',
          bonus: 300000,
          benefits: ['Health Insurance', 'Flexible Hours'],
        },
        createdAt: new Date('2019-06-01'),
        updatedAt: new Date(),
        createdBy: 'admin',
        updatedBy: 'admin',
        isActive: true,
      },
    ];
  }
}
