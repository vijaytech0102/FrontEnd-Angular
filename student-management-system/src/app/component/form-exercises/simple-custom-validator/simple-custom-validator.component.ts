import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-simple-custom-validator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './simple-custom-validator.component.html',
  styleUrls: ['./simple-custom-validator.component.css']
})
export class SimpleCustomValidatorComponent {
  // FormGroup instance for the reactive form
  customForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    // Build the form and apply validators to both username and mobile fields
    this.customForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3),
        forbiddenUsernameValidator(/admin|root/i)
      ]],
      mobile: ['', [
        Validators.required,
        mobileNumberValidator()
      ]]
    });
  }

  // Getter makes template access cleaner and easier to read
  get username() {
    return this.customForm.get('username')!;
  }

  get mobile() {
    return this.customForm.get('mobile')!;
  }

  onSubmit(): void {
    this.submitted = false;

    // If the form passes all validation rules, show the submitted state
    if (this.customForm.valid) {
      this.submitted = true;
    } else {
      // Mark all controls as touched so errors appear immediately
      this.customForm.markAllAsTouched();
    }
  }
}

// Custom validator factory: blocks usernames that match the provided pattern
export function forbiddenUsernameValidator(forbiddenName: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // Do not validate empty values here; required validator handles that
    }

    const forbidden = forbiddenName.test(control.value);
    return forbidden ? { forbiddenUsername: { value: control.value } } : null;
  };
}

// Custom validator factory: checks mobile number format (exactly 10 digits)
export function mobileNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // Required validator handles empty values
    }

    const isValidMobile = /^[0-9]{10}$/.test(control.value);
    return isValidMobile ? null : { invalidMobile: { value: control.value } };
  };
}
