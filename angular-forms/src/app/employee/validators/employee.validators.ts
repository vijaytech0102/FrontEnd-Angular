/**
 * Custom Validators for Employee Forms
 * Provides reusable validators for complex validation scenarios
 * 
 * @module employee.validators
 * @description Industrial-grade custom validators with async support
 */

import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap, debounceTime } from 'rxjs/operators';

/**
 * Email domain whitelist validator
 * Validates email belongs to specific domains
 */
export function emailDomainValidator(allowedDomains: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const email = control.value.toLowerCase();
    const domain = email.split('@')[1];

    if (allowedDomains.includes(domain)) {
      return null;
    }

    return {
      emailDomain: {
        value: control.value,
        allowedDomains: allowedDomains,
      },
    };
  };
}

/**
 * Indian phone number validator
 * Validates phone numbers according to Indian format
 */
export function indianPhoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    // Allows +91, 0, or direct 10 digits
    const phoneRegex =
      /^(\+91[-\s]?)?[0]?(91)?[6789]\d{9}$|^\d{10}$/;

    if (phoneRegex.test(control.value.replace(/\D/g, ''))) {
      return null;
    }

    return {
      invalidPhone: {
        value: control.value,
      },
    };
  };
}

/**
 * Date range validator
 * Validates that a date is within specified range
 */
export function dateRangeValidator(
  minDate?: Date,
  maxDate?: Date
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const date = new Date(control.value);

    if (minDate && date < minDate) {
      return {
        minDate: {
          value: control.value,
          min: minDate,
        },
      };
    }

    if (maxDate && date > maxDate) {
      return {
        maxDate: {
          value: control.value,
          max: maxDate,
        },
      };
    }

    return null;
  };
}

/**
 * Age validator
 * Validates person is of legal working age
 */
export function ageValidator(minAge: number = 18, maxAge?: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const birthDate = new Date(control.value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    if (age < minAge) {
      return {
        minAge: {
          requiredAge: minAge,
          actualAge: age,
        },
      };
    }

    if (maxAge && age > maxAge) {
      return {
        maxAge: {
          maxAge: maxAge,
          actualAge: age,
        },
      };
    }

    return null;
  };
}

/**
 * Cross-field validator
 * Validates end date is after start date
 */
export function endDateAfterStartDateValidator(
  startFieldName: string,
  endFieldName: string
) {
  return (form: AbstractControl): ValidationErrors | null => {
    const startControl = form.get(startFieldName);
    const endControl = form.get(endFieldName);

    if (!startControl || !endControl) {
      return null;
    }

    if (!startControl.value || !endControl.value) {
      return null;
    }

    const startDate = new Date(startControl.value);
    const endDate = new Date(endControl.value);

    if (endDate > startDate) {
      return null;
    }

    return {
      invalidDateRange: {
        startField: startFieldName,
        endField: endFieldName,
      },
    };
  };
}

/**
 * Match field validator
 * Validates two fields match (e.g., password confirmation)
 */
export function matchFieldsValidator(
  fieldName1: string,
  fieldName2: string
) {
  return (form: AbstractControl): ValidationErrors | null => {
    const field1 = form.get(fieldName1);
    const field2 = form.get(fieldName2);

    if (!field1 || !field2) {
      return null;
    }

    if (field1.value === field2.value) {
      return null;
    }

    return {
      fieldsNotMatching: {
        field1: fieldName1,
        field2: fieldName2,
      },
    };
  };
}

/**
 * At least one required validator
 * Validates at least one field from a group has value
 */
export function atLeastOneRequired(fieldNames: string[]): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const fields = fieldNames.map((name) => form.get(name));

    const hasValue = fields.some((field) => field && field.value);

    if (hasValue) {
      return null;
    }

    return {
      atLeastOneRequired: {
        fields: fieldNames,
      },
    };
  };
}

/**
 * Async email validator
 * Checks if email already exists (simulated)
 */
export function asyncEmailValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }

    // Simulate API call with debounce
    return timer(500).pipe(
      switchMap(() => {
        // Mock check - in real app, call HTTP service
        const existingEmails = [
          'admin@company.com',
          'hr@company.com',
        ];

        if (existingEmails.includes(control.value.toLowerCase())) {
          return of({
            emailExists: {
              value: control.value,
            },
          });
        }

        return of(null);
      })
    );
  };
}

/**
 * Async employee ID validator
 * Checks if employee ID is unique
 */
export function asyncEmployeeIdValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }

    return timer(400).pipe(
      switchMap(() => {
        // Mock check
        const existingIds = ['EMP0001', 'EMP0002', 'EMP0003'];

        if (
          existingIds.includes(
            control.value.toUpperCase()
          )
        ) {
          return of({
            employeeIdExists: {
              value: control.value,
            },
          });
        }

        return of(null);
      })
    );
  };
}

/**
 * Skill proficiency validator
 * Validates skill proficiency level based on years of experience
 */
export function skillProficiencyValidator(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const yearsControl = form.get('yearsOfExperience');
    const proficiencyControl = form.get('proficiencyLevel');

    if (!yearsControl || !proficiencyControl) {
      return null;
    }

    const years = yearsControl.value;
    const proficiency = proficiencyControl.value;

    // Rules
    if (years < 1 && proficiency !== 'beginner') {
      return {
        invalidSkillProficiency: {
          message: 'Less than 1 year experience requires beginner level',
        },
      };
    }

    if (years >= 1 && years < 3 && proficiency === 'expert') {
      return {
        invalidSkillProficiency: {
          message: 'Expert level requires at least 3 years experience',
        },
      };
    }

    return null;
  };
}

/**
 * Salary validator
 * Validates salary range and consistency
 */
export function salaryValidator(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const baseSalary = form.get('baseSalary')?.value;
    const bonus = form.get('bonus')?.value;

    if (!baseSalary) {
      return null;
    }

    if (baseSalary <= 0) {
      return {
        invalidSalary: {
          message: 'Salary must be greater than 0',
        },
      };
    }

    if (bonus && bonus > baseSalary * 0.5) {
      return {
        bonusExceedsLimit: {
          message: 'Bonus cannot exceed 50% of base salary',
        },
      };
    }

    return null;
  };
}

/**
 * Conditional required validator
 * Field is required only if condition is met
 */
export function conditionalRequired(
  condition: (form: AbstractControl) => boolean
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.parent) {
      return null;
    }

    if (!condition(control.parent)) {
      return null;
    }

    return Validators.required(control);
  };
}

/**
 * Address format validator
 * Validates address format
 */
export function addressValidator(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const street = form.get('street')?.value;
    const city = form.get('city')?.value;
    const zipCode = form.get('zipCode')?.value;

    if (!street || !city || !zipCode) {
      return null;
    }

    // Check zip code format (Indian format: 6 digits)
    if (!/^\d{6}$/.test(zipCode)) {
      return {
        invalidZipCode: {
          value: zipCode,
        },
      };
    }

    if (street.length < 5) {
      return {
        streetTooShort: {
          value: street,
        },
      };
    }

    return null;
  };
}
