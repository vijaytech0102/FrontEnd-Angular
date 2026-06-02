import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-multi-step-registration-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './multi-step-registration-form.component.html',
  styleUrls: ['./multi-step-registration-form.component.css']
})
export class MultiStepRegistrationFormComponent {
  step1Form: FormGroup;
  step2Form: FormGroup;
  step3Form: FormGroup;
  currentStep = 1;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.step1Form = this.createStep1Form();
    this.step2Form = this.createStep2Form();
    this.step3Form = this.createStep3Form();
  }

  createStep1Form(): FormGroup {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  createStep2Form(): FormGroup {
    return this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required]
    });
  }

  createStep3Form(): FormGroup {
    return this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  nextStep() {
    if (this.currentStep === 1 && this.step1Form.valid) {
      this.currentStep++;
    } else if (this.currentStep === 2 && this.step2Form.valid) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSubmit() {
    if (this.step1Form.valid && this.step2Form.valid && this.step3Form.valid) {
      this.submitted = true;
      console.log('Multi-Step Form Submitted:', {
        personalDetails: this.step1Form.value,
        address: this.step2Form.value,
        accountDetails: this.step3Form.value
      });
    }
  }

  onReset() {
    this.step1Form.reset();
    this.step2Form.reset();
    this.step3Form.reset();
    this.currentStep = 1;
    this.submitted = false;
  }

  get allData() {
    return {
      personalDetails: this.step1Form.value,
      address: this.step2Form.value,
      accountDetails: this.step3Form.value
    };
  }
}
