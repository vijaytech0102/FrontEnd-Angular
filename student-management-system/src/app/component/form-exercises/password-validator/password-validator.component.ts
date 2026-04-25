import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

// Custom validator function
export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) {
    return null;
  }

  if (password.value === confirmPassword.value) {
    return null;
  } else {
    confirmPassword.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true };
  }
}

@Component({
  selector: 'app-password-validator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './password-validator.component.html',
  styleUrls: ['./password-validator.component.css']
})
export class PasswordValidatorComponent {
  signupForm!: FormGroup;
  submitted = false;
  signupSuccess = false;
  showPassword = false;
  showConfirmPassword = false;

  constructor(private fb: FormBuilder) {
    this.initializeForm();
  }

  initializeForm() {
    this.signupForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]]
      },
      {
        validators: passwordMatchValidator
      }
    );
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    console.log('Signup Successful!');
    console.log('Form Data:', {
      email: this.signupForm.get('email')?.value,
      password: '***'
    });

    this.signupSuccess = true;

    setTimeout(() => {
      this.resetForm();
    }, 3000);
  }

  resetForm() {
    this.signupForm.reset();
    this.submitted = false;
    this.signupSuccess = false;
  }

  togglePasswordVisibility(field: 'password' | 'confirmPassword') {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  getEmailError(): string {
    if (this.email?.hasError('required')) {
      return 'Email is required';
    }
    if (this.email?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    return '';
  }

  getPasswordError(): string {
    if (this.password?.hasError('required')) {
      return 'Password is required';
    }
    if (this.password?.hasError('minlength')) {
      return 'Password must be at least 6 characters';
    }
    return '';
  }

  getConfirmPasswordError(): string {
    if (this.confirmPassword?.hasError('required')) {
      return 'Please confirm your password';
    }
    if (this.confirmPassword?.hasError('passwordMismatch')) {
      return 'Passwords do not match!';
    }
    return '';
  }

  isPasswordMatch(): boolean {
    const pwd = this.signupForm.get('password')?.value;
    const confirmPwd = this.signupForm.get('confirmPassword')?.value;
    return pwd && confirmPwd && pwd === confirmPwd;
  }
}
