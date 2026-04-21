import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginCredentials } from '../../../shared/models/form.model';
import { FormStorageService, NotificationService, ApiSimulationService } from '../../../shared/services/form.service';
import { emailAvailabilityValidator } from '../../../shared/validators/custom.validators';

/**
 * REACTIVE FORMS - LOGIN COMPONENT
 * ================================
 * 
 * Reactive Forms are:
 * - Built programmatically in the component class
 * - Strong typing and control
 * - Better for complex scenarios
 * - Easier to test
 * 
 * Key Building Blocks:
 * - FormControl: Single input control
 * - FormGroup: Collection of controls
 * - FormArray: Dynamic collection of controls
 * - FormBuilder: Helper to create forms easily
 * 
 * Key Concepts Demonstrated:
 * ✅ FormBuilder for creating FormGroup
 * ✅ Built-in validators (required, email, minlength)
 * ✅ Async validators (email availability check)
 * ✅ valueChanges observable for reactive updates
 * ✅ Form submission and loading states
 */

@Component({
  selector: 'app-reactive-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-login.component.html',
  styleUrl: './reactive-login.component.css',
})
export class ReactiveLoginComponent implements OnInit {
  /**
   * FormGroup: Contains the login form structure
   * Created using FormBuilder for cleaner syntax
   */
  loginForm!: FormGroup;

  // UI state management
  isSubmitted = false;
  isLoading = false;
  loginSuccess = false;
  loginError: string | null = null;
  submittedCredentials: LoginCredentials | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiSimulationService,
    private formStorageService: FormStorageService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.subscribeToFormChanges();
  }

  /**
   * Initialize the form with FormBuilder
   * FormBuilder simplifies form creation with validators
   */
  private initializeForm(): void {
    /**
     * FormBuilder.group() creates a FormGroup with multiple controls
     * Each control is defined with:
     * - Default value
     * - Validators (can be single or array)
     * - Async validators (if needed)
     */
    this.loginForm = this.formBuilder.group({
      // Email control with built-in validators and async validator
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
          asyncValidators: [emailAvailabilityValidator()],
          updateOn: 'blur', // Trigger validation on blur for async validators
        },
      ],
      // Password control with minimum length validator
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  /**
   * Subscribe to form value changes
   * Demonstrates reactive programming with observables
   */
  private subscribeToFormChanges(): void {
    /**
     * valueChanges: Observable that emits whenever form value changes
     * This is useful for:
     * - Triggering searches
     * - Enabling/disabling fields conditionally
     * - Real-time validation feedback
     */
    this.loginForm.get('email')?.valueChanges.subscribe((email) => {
      console.log('Email changed to:', email);
    });

    this.loginForm.statusChanges.subscribe((status) => {
      console.log('Form status:', status); // VALID, INVALID, PENDING (for async validators)
    });
  }

  /**
   * Handle form submission
   * Demonstrates form validation and data submission
   */
  onSubmit(): void {
    this.isSubmitted = true;
    this.loginError = null;

    // Validate form before submission
    if (this.loginForm.invalid) {
      this.notificationService.error('Please fill out all fields correctly');
      return;
    }

    this.isLoading = true;

    // Extract form values
    const credentials: LoginCredentials = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };

    /**
     * Simulate API call
     * In a real app, this would make an HTTP request
     */
    this.apiService.login(credentials.email, credentials.password).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.loginSuccess = true;
        this.submittedCredentials = credentials;

        // Save to local storage
        this.formStorageService.saveFormSubmission(
          'reactive',
          credentials,
          true
        );

        this.notificationService.success(`Welcome back! Token: ${response.token.substring(0, 20)}...`);

        // Reset form after 2 seconds
        setTimeout(() => {
          this.resetForm();
        }, 2000);
      },
      error: (error: any) => {
        this.isLoading = false;
        this.loginError = error;
        this.notificationService.error('Login failed: ' + error);
      },
    });
  }

  /**
   * Reset the form to initial state
   */
  resetForm(): void {
    this.loginForm.reset();
    this.isSubmitted = false;
    this.loginSuccess = false;
    this.loginError = null;
    this.submittedCredentials = null;
  }

  /**
   * Get error message for a specific form control
   */
  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);

    if (!field || !field.errors || !this.isSubmitted) {
      return '';
    }

    if (field.errors['required']) {
      return `${this.formatFieldName(fieldName)} is required`;
    }
    if (field.errors['email']) {
      return 'Please enter a valid email address';
    }
    if (field.errors['minlength']) {
      return `Password must be at least ${field.errors['minlength'].requiredLength} characters`;
    }
    if (field.errors['emailTaken']) {
      return 'This email is already registered';
    }

    return 'This field is invalid';
  }

  /**
   * Format field name for display
   */
  private formatFieldName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  /**
   * Check if field is validating (pending async validation)
   */
  isFieldValidating(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return field ? field.pending : false;
  }

  /**
   * Get form state information
   */
  getFormState(): string {
    const states: string[] = [];
    if (this.loginForm.touched) states.push('touched');
    if (this.loginForm.dirty) states.push('dirty');
    if (this.loginForm.valid) states.push('valid');
    else if (this.loginForm.invalid) states.push('invalid');
    if (this.loginForm.pending) states.push('validating...');

    return states.join(' • ');
  }
}
