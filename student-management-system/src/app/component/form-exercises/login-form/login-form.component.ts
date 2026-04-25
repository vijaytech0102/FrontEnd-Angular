import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  loginForm!: FormGroup;
  submitted = false;
  loginSuccess = false;
  showPassword = false;

  constructor(private fb: FormBuilder) {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    // Simulate successful login
    console.log('Login Successful!');
    console.log('Form Data:', this.loginForm.value);
    this.loginSuccess = true;

    // Reset after 3 seconds
    setTimeout(() => {
      this.resetForm();
    }, 3000);
  }

  resetForm() {
    this.loginForm.reset();
    this.submitted = false;
    this.loginSuccess = false;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  getUsernameError(): string {
    if (this.username?.hasError('required')) {
      return 'Username is required';
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
}
