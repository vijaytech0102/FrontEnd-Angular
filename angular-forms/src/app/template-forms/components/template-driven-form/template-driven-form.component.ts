import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../../shared/models/form.model';
import { FormStorageService, NotificationService } from '../../../shared/services/form.service';

/**
 * TEMPLATE-DRIVEN FORMS EXPLANATION
 * ================================
 * Template-driven forms are:
 * - Built in the template using directives
 * - Two-way binding using ngModel
 * - Declarative validation rules
 * - Best for simple forms
 *
 * Key Directives:
 * - ngForm: Access form as a whole
 * - ngModel: Two-way data binding to form controls
 * - ngModelGroup: Group related form controls
 * - Required, minlength, pattern, etc.: Built-in validators
 *
 * When to use:
 * ✅ Simple forms
 * ✅ Minimal validation
 * ✅ Quick prototyping
 * ❌ Complex dynamic forms
 * ❌ Advanced validation logic
 * ❌ Testing requirements
 */

@Component({
  selector: 'app-template-driven-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './template-driven-form.component.html',
  styleUrl: './template-driven-form.component.css',
})
export class TemplateDrivenFormComponent implements OnInit {
  /**
   * Form data model
   * This object holds the form values bound via ngModel
   */
  user: User = {
    fullName: '',
    email: '',
    password: '',
    gender: '',
    skills: [],
    country: '',
    termsAccepted: false,
  };

  /**
   * Access form reference using @ViewChild
   * This allows us to access form state and methods programmatically
   */
  @ViewChild('registrationForm') form!: NgForm;

  // Available options for dropdowns and checkboxes
  countries: string[] = ['USA', 'UK', 'Canada', 'Australia', 'India', 'Germany'];
  availableSkills: string[] = ['JavaScript', 'TypeScript', 'Angular', 'React', 'Vue', 'Node.js'];

  // Track submitted state
  isSubmitted = false;
  isLoading = false;
  submittedData: User | null = null;

  constructor(
    private formStorageService: FormStorageService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadFormDataFromStorage();
  }

  /**
   * Handle form submission
   * Called when user clicks submit button
   */
  onSubmit(): void {
    this.isSubmitted = true;

    // Check if form is valid
    // Form validation is automatic through ngForm directive
    if (!this.form?.valid) {
      this.notificationService.error('Please fill out all required fields correctly');
      return;
    }

    this.isLoading = true;

    // Simulate API call
    setTimeout(() => {
      // Save to local storage
      this.formStorageService.saveFormSubmission(
        'template-driven',
        this.user,
        this.form?.valid ?? false
      );

      this.submittedData = { ...this.user };
      this.isLoading = false;

      this.notificationService.success('Registration successful! Data saved to local storage.');

      // Reset after 2 seconds
      setTimeout(() => {
        this.resetForm();
      }, 1500);
    }, 1000);
  }

  /**
   * Reset form to initial state
   * Clears all form fields and validation states
   */
  resetForm(): void {
    this.form.reset();
    this.user = {
      fullName: '',
      email: '',
      password: '',
      gender: '',
      skills: [],
      country: '',
      termsAccepted: false,
    };
    this.isSubmitted = false;
    this.submittedData = null;
    this.notificationService.info('Form reset successfully');
  }

  /**
   * Handle skill checkbox changes
   * Add/remove skill from skills array
   */
  onSkillChange(skill: string, event: any): void {
    const isChecked = event.target.checked;

    if (isChecked) {
      this.user.skills.push(skill);
    } else {
      this.user.skills = this.user.skills.filter((s) => s !== skill);
    }
  }

  /**
   * Check if a skill is selected (for two-way binding)
   */
  isSkillSelected(skill: string): boolean {
    return this.user.skills.includes(skill);
  }

  /**
   * Load previously saved form data from local storage
   */
  loadFormDataFromStorage(): void {
    const submissions = this.formStorageService.getSubmissionsByType('template-driven');
    if (submissions.length > 0) {
      const lastSubmission = submissions[0];
      this.user = { ...lastSubmission.data };
    }
  }

  /**
   * Get form state for display
   * Shows which form controls have been touched/modified
   */
  getFormState(): string {
    if (!this.form) return '';

    const states: string[] = [];
    if (this.form.touched) states.push('touched');
    if (this.form.dirty) states.push('dirty');
    if (this.form.valid) states.push('valid');
    else if (this.form.invalid) states.push('invalid');

    return states.join(' • ');
  }

  /**
   * Display validation error for a field
   * Used in template to show specific validation error messages
   */
  getFieldError(fieldName: string): string {
    const field = this.form?.controls?.[fieldName];

    if (!field || !field.errors || !this.isSubmitted) {
      return '';
    }

    // Return appropriate error message based on validator
    if (field.errors['required']) {
      return `${this.formatFieldName(fieldName)} is required`;
    }
    if (field.errors['email']) {
      return 'Please enter a valid email address';
    }
    if (field.errors['minlength']) {
      return `${this.formatFieldName(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters`;
    }
    if (field.errors['pattern']) {
      return `${this.formatFieldName(fieldName)} format is invalid`;
    }

    return 'This field is invalid';
  }

  /**
   * Format field name for display (convert camelCase to Title Case)
   */
  private formatFieldName(name: string): string {
    return name.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
  }
}
