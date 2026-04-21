import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { UserProfile } from '../../../shared/models/form.model';
import {
  FormStorageService,
  NotificationService,
  ApiSimulationService,
} from '../../../shared/services/form.service';
import { phoneValidator } from '../../../shared/validators/custom.validators';

/**
 * REACTIVE FORMS - PROFILE COMPONENT (Advanced)
 * =============================================
 * 
 * Advanced Reactive Form Concepts:
 * 
 * ✅ Nested FormGroups - Organize related fields
 * ✅ FormArray - Dynamic collection of controls
 * ✅ Custom Validators - phoneValidator()
 * ✅ Dynamic Field Management - Add/Remove fields
 * ✅ FormBuilder Groups - Hierarchical structure
 * ✅ Get/Set/Patch Values - Different update strategies
 * 
 * This component demonstrates professional form patterns
 * suitable for real-world applications.
 */

@Component({
  selector: 'app-reactive-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-profile.component.html',
  styleUrl: './reactive-profile.component.css',
})
export class ReactiveProfileComponent implements OnInit {
  /**
   * Main form group containing all profile fields
   * Uses nested structure for better organization
   */
  profileForm!: FormGroup;

  // UI state
  isSubmitted = false;
  isLoading = false;
  updateSuccess = false;
  submittedProfile: UserProfile | null = null;

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
   * Initialize form with nested structure
   * Demonstrates hierarchical form organization
   */
  private initializeForm(): void {
    this.profileForm = this.formBuilder.group({
      // Basic info controls
      name: ['', [Validators.required, Validators.minLength(2)]],

      // Custom validator for phone
      phone: ['', [Validators.required, phoneValidator()]],

      // Nested FormGroup for address
      // This groups related fields together
      address: this.formBuilder.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)]],
      }),

      // FormArray for dynamic skills
      // Allows adding/removing fields dynamically
      skills: this.formBuilder.array([
        this.createSkillControl(), // Start with one empty skill field
      ]),
    });
  }

  /**
   * Create a single skill FormControl
   * Used when adding new skills to the array
   */
  private createSkillControl(): AbstractControl {
    return this.formBuilder.control('', Validators.required);
  }

  /**
   * Get skills FormArray for use in template
   * FormArray provides methods to manage dynamic fields
   */
  get skillsArray(): FormArray {
    return this.profileForm.get('skills') as FormArray;
  }

  /**
   * Add new skill field to array
   * Users can dynamically add more skills
   */
  addSkill(): void {
    this.skillsArray.push(this.createSkillControl());
    this.notificationService.info('New skill field added');
  }

  /**
   * Remove skill from array by index
   * @param index - Index of skill to remove
   */
  removeSkill(index: number): void {
    if (this.skillsArray.length > 1) {
      this.skillsArray.removeAt(index);
      this.notificationService.info('Skill removed');
    } else {
      this.notificationService.error('You must have at least one skill');
    }
  }

  /**
   * Subscribe to form value changes
   * Demonstrates reactive programming patterns
   */
  private subscribeToFormChanges(): void {
    // Listen to name changes
    this.profileForm.get('name')?.valueChanges.subscribe((name) => {
      console.log('Name changed to:', name);
    });

    // Listen to address changes (nested)
    this.profileForm.get('address')?.valueChanges.subscribe((address) => {
      console.log('Address changed to:', address);
    });

    // Listen to skills array changes
    this.skillsArray.valueChanges.subscribe((skills) => {
      console.log('Skills changed to:', skills);
    });
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    this.isSubmitted = true;

    if (this.profileForm.invalid) {
      this.notificationService.error('Please fill out all fields correctly');
      return;
    }

    this.isLoading = true;

    // Extract form values into model
    const profile: UserProfile = {
      name: this.profileForm.get('name')?.value,
      phone: this.profileForm.get('phone')?.value,
      address: {
        street: this.profileForm.get('address.street')?.value,
        city: this.profileForm.get('address.city')?.value,
        zipCode: this.profileForm.get('address.zipCode')?.value,
      },
      skills: this.skillsArray.value.filter((skill: string) => skill), // Remove empty skills
    };

    // Simulate API call
    this.apiService.updateProfile(profile).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.updateSuccess = true;
        this.submittedProfile = profile;

        this.formStorageService.saveFormSubmission('reactive', profile, true);
        this.notificationService.success('Profile updated successfully!');

        setTimeout(() => {
          this.resetForm();
        }, 2000);
      },
      error: (error: any) => {
        this.isLoading = false;
        this.notificationService.error('Failed to update profile');
      },
    });
  }

  /**
   * Reset form to initial state
   */
  resetForm(): void {
    this.profileForm.reset();
    // Reset skills array to one empty control
    this.skillsArray.clear();
    this.skillsArray.push(this.createSkillControl());
    this.isSubmitted = false;
    this.updateSuccess = false;
    this.submittedProfile = null;
  }

  /**
   * Patch form values (partial update)
   * Unlike setValue, patchValue doesn't require all controls
   * Useful for loading existing data
   */
  loadExistingProfile(): void {
    this.profileForm.patchValue({
      name: 'John Doe',
      phone: '(555) 123-4567',
      address: {
        street: '123 Main St',
        city: 'New York',
        zipCode: '10001',
      },
    });

    // Clear and add existing skills
    this.skillsArray.clear();
    ['Angular', 'TypeScript', 'Node.js'].forEach((skill) => {
      this.skillsArray.push(this.formBuilder.control(skill, Validators.required));
    });

    this.notificationService.info('Profile data loaded');
  }

  /**
   * Get error message for control
   */
  getFieldError(controlName: string): string {
    const control = this.profileForm.get(controlName);

    if (!control || !control.errors || !this.isSubmitted) {
      return '';
    }

    if (control.errors['required']) {
      return `${this.formatFieldName(controlName)} is required`;
    }
    if (control.errors['minlength']) {
      return `${this.formatFieldName(controlName)} must be at least ${control.errors['minlength'].requiredLength} characters`;
    }
    if (control.errors['invalidPhone']) {
      return 'Please enter a valid phone number (e.g., (555) 123-4567)';
    }
    if (control.errors['pattern']) {
      return `${this.formatFieldName(controlName)} format is invalid`;
    }

    return `${this.formatFieldName(controlName)} is invalid`;
  }

  /**
   * Get error for nested form control
   */
  getAddressFieldError(fieldName: string): string {
    const control = this.profileForm.get(`address.${fieldName}`);

    if (!control || !control.errors || !this.isSubmitted) {
      return '';
    }

    if (control.errors['required']) {
      return `${this.formatFieldName(fieldName)} is required`;
    }
    if (control.errors['pattern']) {
      return 'Invalid format';
    }

    return 'Invalid';
  }

  /**
   * Format field name for display
   */
  private formatFieldName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  /**
   * Get form state for display
   */
  getFormState(): string {
    const states: string[] = [];
    if (this.profileForm.touched) states.push('touched');
    if (this.profileForm.dirty) states.push('dirty');
    if (this.profileForm.valid) states.push('valid');
    else if (this.profileForm.invalid) states.push('invalid');

    return states.join(' • ');
  }
}
