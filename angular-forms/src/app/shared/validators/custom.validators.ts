import { AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';

/**
 * CUSTOM VALIDATORS - Demonstrating how to create custom validation logic
 * 
 * Custom validators are functions that implement the ValidatorFn interface.
 * They take an AbstractControl and return ValidationErrors or null.
 */

/**
 * Phone Number Validator
 * Validates that the phone number matches a specific pattern
 * Pattern: (XXX) XXX-XXXX or 10 digits
 * 
 * @example
 * phoneValidator()  // Used in FormControl validators array
 */
export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // Don't validate empty values
    }

    // Phone pattern: (XXX) XXX-XXXX or 10 digits
    const phonePattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    const isValid = phonePattern.test(control.value);

    return isValid ? null : { invalidPhone: { value: control.value } };
  };
}

/**
 * Password Strength Validator
 * Validates that password contains uppercase, lowercase, number, and special character
 * 
 * @example
 * passwordStrengthValidator()  // Strong password required
 */
export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const password = control.value;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const isValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

    return isValid
      ? null
      : {
          weakPassword: {
            hasUpperCase,
            hasLowerCase,
            hasNumber,
            hasSpecialChar,
          },
        };
  };
}

/**
 * Confirm Password Validator
 * Validates that confirm password matches the original password
 * Must be applied to a parent FormGroup containing password and confirmPassword controls
 * 
 * @param passwordControl - Name of the original password control
 * @param confirmPasswordControl - Name of the confirm password control
 * 
 * @example
 * formGroup.setValidators(confirmPasswordValidator('password', 'confirmPassword'))
 */
export function confirmPasswordValidator(
  passwordControl: string,
  confirmPasswordControl: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(passwordControl);
    const confirmPassword = control.get(confirmPasswordControl);

    if (!password || !confirmPassword) {
      return null;
    }

    if (confirmPassword.errors && !confirmPassword.errors['passwordMismatch']) {
      return null;
    }

    return password.value === confirmPassword.value
      ? (confirmPassword.setErrors(null), null)
      : (confirmPassword.setErrors({ passwordMismatch: true }), null);
  };
}

/**
 * ASYNC VALIDATORS - Validators that perform asynchronous operations
 * These are useful for checking against a server or external API
 */

/**
 * Email Availability Validator (Async)
 * Simulates checking if email is already registered in the system
 * 
 * In real applications, this would make an HTTP request to check email availability
 * 
 * @example
 * asyncValidators: [emailAvailabilityValidator(emailService)]
 */
export function emailAvailabilityValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }

    // List of reserved/already registered emails
    const reservedEmails = [
      'admin@example.com',
      'test@example.com',
      'user@example.com',
    ];

    // Simulate API call with delay
    return of(reservedEmails.includes(control.value.toLowerCase())).pipe(
      delay(500), // Simulate network delay
      map((isReserved) =>
        isReserved ? { emailTaken: { value: control.value } } : null
      )
    );
  };
}

/**
 * Username Availability Validator (Async)
 * Simulates checking if username is available
 * 
 * @example
 * asyncValidators: [usernameAvailabilityValidator()]
 */
export function usernameAvailabilityValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }

    // Reserved usernames
    const reservedUsernames = ['admin', 'root', 'system', 'test'];

    return of(reservedUsernames.includes(control.value.toLowerCase())).pipe(
      delay(500),
      map((isReserved) =>
        isReserved ? { usernameTaken: { value: control.value } } : null
      )
    );
  };
}

/**
 * Conditional Validator
 * Validates control based on another control's value
 * 
 * Example: Require phone if contact preference is 'phone'
 */
export function conditionalRequiredValidator(dependentControl: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const dependent = control.parent?.get(dependentControl);

    if (!dependent) {
      return null;
    }

    // If dependent control's value matches condition, make this control required
    if (dependent.value === 'phone' && !control.value) {
      return { required: true };
    }

    return null;
  };
}

/**
 * Min Age Validator
 * Validates that the user is at least a certain age
 * 
 * @param minAge - Minimum age required
 */
export function minAgeValidator(minAge: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const birthDate = new Date(control.value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();

    return age >= minAge ? null : { minAge: { requiredAge: minAge, actualAge: age } };
  };
}
