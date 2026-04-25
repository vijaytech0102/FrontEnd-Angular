import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface FormData {
  personalInfo: {
    name: string;
    email: string;
  };
  addressInfo: {
    city: string;
    state: string;
  };
}

@Component({
  selector: 'app-multi-step-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './multi-step-form.component.html',
  styleUrls: ['./multi-step-form.component.css']
})
export class MultiStepFormComponent {
  currentStep = 1;
  totalSteps = 3;
  
  personalInfoForm!: FormGroup;
  addressInfoForm!: FormGroup;
  
  formData: FormData = {
    personalInfo: { name: '', email: '' },
    addressInfo: { city: '', state: '' }
  };

  submitted = false;
  formSubmitted = false;

  states = ['California', 'Texas', 'Florida', 'New York', 'Pennsylvania', 'Illinois'];

  constructor(private fb: FormBuilder) {
    this.initializeForms();
  }

  initializeForms() {
    this.personalInfoForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.addressInfoForm = this.fb.group({
      city: ['', [Validators.required, Validators.minLength(2)]],
      state: ['', Validators.required]
    });
  }

  // Personal Info Form getters
  get name() {
    return this.personalInfoForm.get('name');
  }

  get email() {
    return this.personalInfoForm.get('email');
  }

  // Address Info Form getters
  get city() {
    return this.addressInfoForm.get('city');
  }

  get state() {
    return this.addressInfoForm.get('state');
  }

  nextStep() {
    if (this.isCurrentStepValid()) {
      if (this.currentStep === 1) {
        this.formData.personalInfo = this.personalInfoForm.value;
      } else if (this.currentStep === 2) {
        this.formData.addressInfo = this.addressInfoForm.value;
      }
      this.currentStep++;
    } else {
      this.submitted = true;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.submitted = false;
      this.currentStep--;
    }
  }

  isCurrentStepValid(): boolean {
    if (this.currentStep === 1) {
      return this.personalInfoForm.valid;
    } else if (this.currentStep === 2) {
      return this.addressInfoForm.valid;
    }
    return true;
  }

  onSubmit() {
    this.submitted = true;
    
    if (this.currentStep === 2 && this.addressInfoForm.valid) {
      this.formData.addressInfo = this.addressInfoForm.value;
      this.formSubmitted = true;
      console.log('Form Submitted:', this.formData);
    }
  }

  resetForm() {
    this.currentStep = 1;
    this.submitted = false;
    this.formSubmitted = false;
    this.personalInfoForm.reset();
    this.addressInfoForm.reset();
    this.formData = {
      personalInfo: { name: '', email: '' },
      addressInfo: { city: '', state: '' }
    };
  }

  canGoToNextStep(): boolean {
    return this.isCurrentStepValid();
  }

  canGoToPreviousStep(): boolean {
    return this.currentStep > 1;
  }

  getNameError(): string {
    if (this.name?.hasError('required')) return 'Name is required';
    if (this.name?.hasError('minlength')) return 'Name must be at least 3 characters';
    return '';
  }

  getEmailError(): string {
    if (this.email?.hasError('required')) return 'Email is required';
    if (this.email?.hasError('email')) return 'Invalid email format';
    return '';
  }

  getCityError(): string {
    if (this.city?.hasError('required')) return 'City is required';
    if (this.city?.hasError('minlength')) return 'City must be at least 2 characters';
    return '';
  }

  getStateError(): string {
    if (this.state?.hasError('required')) return 'State selection is required';
    return '';
  }
}
