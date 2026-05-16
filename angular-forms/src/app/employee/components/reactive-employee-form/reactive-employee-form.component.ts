/**
 * Reactive Employee Form Component
 * Demonstrates advanced reactive forms with FormBuilder, FormArray, and custom validators
 * 
 * @component
 * @description Industrial-grade reactive form for employee management
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  CommonModule,
  NgFor,
  NgIf,
  NgClass,
} from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeFormData, Address, Skill, EmergencyContact } from '../../models/employee.model';
import {
  indianPhoneValidator,
  ageValidator,
  asyncEmailValidator,
  endDateAfterStartDateValidator,
  addressValidator,
  skillProficiencyValidator,
  salaryValidator,
} from '../../validators/employee.validators';

@Component({
  selector: 'app-reactive-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgFor, NgIf, NgClass],
  templateUrl: './reactive-employee-form.component.html',
  styleUrl: './reactive-employee-form.component.css',
})
export class ReactiveEmployeeFormComponent implements OnInit, OnDestroy {
  /**
   * Form Group - Main form for employee data
   * Grouped into logical sections for better organization
   */
  employeeForm!: FormGroup;

  // State variables
  isSubmitting = false;
  showSuccessMessage = false;
  successMessage = '';
  errorMessage = '';
  currentStep = 1;
  totalSteps = 4;

  // Dropdown options
  departments: string[] = [];
  designations: string[] = [];
  genders = ['male', 'female', 'other', 'prefer-not-to-say'];
  employmentTypes = ['permanent', 'contract', 'temporary', 'freelance'];
  employmentStatuses = ['active', 'inactive', 'on-leave', 'terminated'];
  addressTypes = ['residential', 'office', 'other'];
  skillCategories = ['technical', 'soft', 'language', 'other'];
  proficiencyLevels = ['beginner', 'intermediate', 'advanced', 'expert'];
  paymentFrequencies = ['monthly', 'bi-weekly', 'weekly'];
  currencies = ['INR', 'USD', 'EUR'];

  // Subscriptions
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {}

  /**
   * Angular Lifecycle - Initialize form
   */
  ngOnInit(): void {
    this.initializeForm();
    this.loadDropdownData();
    this.setupFormListeners();
  }

  /**
   * Initialize the main employee form with all sections
   */
  private initializeForm(): void {
    this.employeeForm = this.fb.group(
      {
        // ========== PERSONAL INFORMATION SECTION ==========
        personalInfo: this.fb.group(
          {
            firstName: ['', [Validators.required, Validators.minLength(2)]],
            lastName: ['', [Validators.required, Validators.minLength(2)]],
            email: [
              '',
              [Validators.required, Validators.email],
              [asyncEmailValidator()], // Async validator
            ],
            dateOfBirth: [
              '',
              [
                Validators.required,
                ageValidator(18, 65), // Validate age between 18-65
              ],
            ],
            gender: ['', Validators.required],
            nationality: ['', Validators.required],
            phone: ['', [Validators.required, indianPhoneValidator()]],
            alternatePhone: ['', [indianPhoneValidator()]],
            personalEmail: ['', [Validators.email]],
          },
          {
            validators: [
              // Cross-field validator
              endDateAfterStartDateValidator('dateOfBirth', 'dateOfBirth'),
            ],
          }
        ),

        // ========== EMPLOYMENT DETAILS SECTION ==========
        employmentDetails: this.fb.group(
          {
            employeeId: ['', [Validators.required]],
            department: ['', Validators.required],
            designation: ['', Validators.required],
            reportingManager: [''],
            employmentType: ['permanent', Validators.required],
            dateOfJoining: ['', Validators.required],
            dateOfTermination: [''],
            employmentStatus: ['active', Validators.required],
            workLocation: ['', Validators.required],
          },
          {
            validators: [
              endDateAfterStartDateValidator('dateOfJoining', 'dateOfTermination'),
            ],
          }
        ),

        // ========== ADDRESSES SECTION (FormArray) ==========
        addresses: this.fb.array([], [Validators.required]), // At least one address

        // ========== EMERGENCY CONTACTS SECTION (FormArray) ==========
        emergencyContacts: this.fb.array([], [Validators.required]),

        // ========== EDUCATION SECTION (FormArray) ==========
        educations: this.fb.array([]),

        // ========== CERTIFICATIONS SECTION (FormArray) ==========
        certifications: this.fb.array([]),

        // ========== SKILLS SECTION (FormArray) ==========
        skills: this.fb.array([], [Validators.minLength(1)]),

        // ========== SALARY INFORMATION SECTION ==========
        salaryInfo: this.fb.group(
          {
            baseSalary: [
              '',
              [Validators.required, Validators.pattern(/^[0-9]+$/)],
            ],
            currency: ['INR', Validators.required],
            paymentFrequency: ['monthly', Validators.required],
            bonus: [''],
            benefits: this.fb.array([]),
          },
          { validators: [salaryValidator()] }
        ),

        // ========== CONSENT SECTION ==========
        consents: this.fb.group({
          termsAndConditions: [false, Validators.requiredTrue],
          dataPrivacyConsent: [false, Validators.requiredTrue],
          backgroundCheckConsent: [false],
        }),
      }
    );
  }

  /**
   * Load dropdown data from service
   */
  private loadDropdownData(): void {
    this.employeeService
      .getDepartments()
      .pipe(takeUntil(this.destroy$))
      .subscribe((departments) => {
        this.departments = departments;
      });

    this.employeeService
      .getDesignations()
      .pipe(takeUntil(this.destroy$))
      .subscribe((designations) => {
        this.designations = designations;
      });
  }

  /**
   * Setup form listeners for dynamic behaviors
   */
  private setupFormListeners(): void {
    // Listen to employment status changes to conditionally require termination date
    this.employeeForm
      .get('employmentDetails.employmentStatus')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((status) => {
        const terminationDate = this.employeeForm.get(
          'employmentDetails.dateOfTermination'
        );
        if (status === 'terminated') {
          terminationDate?.setValidators([Validators.required]);
        } else {
          terminationDate?.clearValidators();
        }
        terminationDate?.updateValueAndValidity();
      });
  }

  /**
   * ========== FORM ARRAY MANAGEMENT ==========
   */

  /**
   * Get addresses FormArray
   */
  get addressesArray(): FormArray {
    return this.employeeForm.get('addresses') as FormArray;
  }

  /**
   * Get emergency contacts FormArray
   */
  get emergencyContactsArray(): FormArray {
    return this.employeeForm.get('emergencyContacts') as FormArray;
  }

  /**
   * Get educations FormArray
   */
  get educationsArray(): FormArray {
    return this.employeeForm.get('educations') as FormArray;
  }

  /**
   * Get certifications FormArray
   */
  get certificationsArray(): FormArray {
    return this.employeeForm.get('certifications') as FormArray;
  }

  /**
   * Get skills FormArray
   */
  get skillsArray(): FormArray {
    return this.employeeForm.get('skills') as FormArray;
  }

  /**
   * Get benefits FormArray
   */
  get benefitsArray(): FormArray {
    return this.employeeForm.get('salaryInfo.benefits') as FormArray;
  }

  /**
   * Add address
   */
  addAddress(): void {
    const addressForm = this.fb.group(
      {
        street: ['', [Validators.required, Validators.minLength(5)]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        zipCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
        country: ['', [Validators.required]],
        isCurrentAddress: [false],
        addressType: ['residential', Validators.required],
      },
      { validators: [addressValidator()] }
    );

    this.addressesArray.push(addressForm);
  }

  /**
   * Remove address
   */
  removeAddress(index: number): void {
    this.addressesArray.removeAt(index);
  }

  /**
   * Add emergency contact
   */
  addEmergencyContact(): void {
    const contactForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      relationship: ['', [Validators.required]],
      contactNumber: ['', [Validators.required, indianPhoneValidator()]],
      email: ['', [Validators.email]],
      address: [''],
    });

    this.emergencyContactsArray.push(contactForm);
  }

  /**
   * Remove emergency contact
   */
  removeEmergencyContact(index: number): void {
    this.emergencyContactsArray.removeAt(index);
  }

  /**
   * Add education
   */
  addEducation(): void {
    const educationForm = this.fb.group({
      degree: ['', Validators.required],
      institution: ['', [Validators.required, Validators.minLength(3)]],
      fieldOfStudy: ['', Validators.required],
      graduationYear: [
        new Date().getFullYear(),
        [
          Validators.required,
          Validators.pattern(/^\d{4}$/),
        ],
      ],
      gpa: ['', [Validators.pattern(/^[0-4](\.[0-9]{1,2})?$/)]],
      certificateNumber: [''],
    });

    this.educationsArray.push(educationForm);
  }

  /**
   * Remove education
   */
  removeEducation(index: number): void {
    this.educationsArray.removeAt(index);
  }

  /**
   * Add certification
   */
  addCertification(): void {
    const certForm = this.fb.group({
      name: ['', Validators.required],
      issuer: ['', Validators.required],
      issueDate: ['', Validators.required],
      expiryDate: [''],
      credentialId: [''],
      credentialUrl: ['', [Validators.pattern(/^https?:\/\/.+/)]],
      isActive: [true],
    });

    this.certificationsArray.push(certForm);
  }

  /**
   * Remove certification
   */
  removeCertification(index: number): void {
    this.certificationsArray.removeAt(index);
  }

  /**
   * Add skill
   */
  addSkill(): void {
    const skillForm = this.fb.group(
      {
        name: ['', Validators.required],
        category: ['technical', Validators.required],
        proficiencyLevel: ['intermediate', Validators.required],
        yearsOfExperience: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        lastUsedDate: [''],
      },
      { validators: [skillProficiencyValidator()] }
    );

    this.skillsArray.push(skillForm);
  }

  /**
   * Remove skill
   */
  removeSkill(index: number): void {
    this.skillsArray.removeAt(index);
  }

  /**
   * Add benefit
   */
  addBenefit(): void {
    this.benefitsArray.push(this.fb.control('', Validators.required));
  }

  /**
   * Remove benefit
   */
  removeBenefit(index: number): void {
    this.benefitsArray.removeAt(index);
  }

  /**
   * ========== FORM NAVIGATION & VALIDATION ==========
   */

  /**
   * Navigate to next step
   */
  nextStep(): void {
    if (this.isCurrentStepValid()) {
      this.currentStep++;
    }
  }

  /**
   * Navigate to previous step
   */
  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  /**
   * Check if current step form group is valid
   */
  isCurrentStepValid(): boolean {
    const steps = [
      'personalInfo',
      'employmentDetails',
      'addresses',
      'salaryInfo',
    ];
    return this.employeeForm.get(steps[this.currentStep - 1])?.valid ?? false;
  }

  /**
   * ========== FORM SUBMISSION ==========
   */

  /**
   * Submit form
   */
  submitForm(): void {
    if (!this.employeeForm.valid) {
      this.errorMessage = 'Please fill all required fields correctly';
      this.scrollToTop();
      return;
    }

    this.isSubmitting = true;
    const formData = this.buildFormData();

    this.employeeService
      .createEmployee(formData)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isSubmitting = false;
        })
      )
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.successMessage = response.message;
            this.showSuccessMessage = true;
            this.resetForm();
            this.scrollToTop();
            setTimeout(() => {
              this.showSuccessMessage = false;
            }, 5000);
          } else {
            this.errorMessage =
              response.message || 'Error submitting form';
            this.scrollToTop();
          }
        },
        error: (error) => {
          this.errorMessage = 'Error submitting form. Please try again.';
          this.scrollToTop();
        },
      });
  }

  /**
   * Build form data from form values
   */
  private buildFormData(): EmployeeFormData {
    const formValue = this.employeeForm.getRawValue();

    return {
      firstName: formValue.personalInfo.firstName,
      lastName: formValue.personalInfo.lastName,
      email: formValue.personalInfo.email,
      phone: formValue.personalInfo.phone,
      dateOfBirth: formValue.personalInfo.dateOfBirth,
      gender: formValue.personalInfo.gender,
      nationality: formValue.personalInfo.nationality,
      employeeId: formValue.employmentDetails.employeeId,
      department: formValue.employmentDetails.department,
      designation: formValue.employmentDetails.designation,
      employmentType: formValue.employmentDetails.employmentType,
      dateOfJoining: formValue.employmentDetails.dateOfJoining,
      employmentStatus: formValue.employmentDetails.employmentStatus,
      workLocation: formValue.employmentDetails.workLocation,
      addresses: formValue.addresses,
      emergencyContacts: formValue.emergencyContacts,
      educations: formValue.educations,
      certifications: formValue.certifications,
      skills: formValue.skills,
      salaryInfo: formValue.salaryInfo,
      termsAndConditions: formValue.consents.termsAndConditions,
      dataPrivacyConsent: formValue.consents.dataPrivacyConsent,
      backgroundCheckConsent: formValue.consents.backgroundCheckConsent,
    };
  }

  /**
   * Reset form to initial state
   */
  resetForm(): void {
    this.employeeForm.reset();
    this.currentStep = 1;
    this.addressesArray.clear();
    this.emergencyContactsArray.clear();
    this.educationsArray.clear();
    this.certificationsArray.clear();
    this.skillsArray.clear();
    this.benefitsArray.clear();
  }

  /**
   * Get error message for field
   */
  getErrorMessage(
    controlPath: string
  ): string {
    const control = this.employeeForm.get(controlPath);

    if (!control || !control.errors || !control.touched) {
      return '';
    }

    const errors = control.errors;

    if (errors['required']) return 'This field is required';
    if (errors['email']) return 'Invalid email format';
    if (errors['minLength'])
      return `Minimum length is ${errors['minLength'].requiredLength}`;
    if (errors['pattern']) return 'Invalid format';
    if (errors['invalidPhone']) return 'Invalid phone number';
    if (errors['minAge'])
      return `Minimum age is ${errors['minAge'].requiredAge}`;
    if (errors['emailExists']) return 'Email already exists';
    if (errors['invalidDateRange'])
      return 'End date must be after start date';

    return 'Invalid input';
  }

  /**
   * Scroll to top of page
   */
  private scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Angular Lifecycle - Cleanup
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
