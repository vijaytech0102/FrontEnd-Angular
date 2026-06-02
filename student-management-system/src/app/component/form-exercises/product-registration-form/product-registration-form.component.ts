import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-registration-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-registration-form.component.html',
  styleUrls: ['./product-registration-form.component.css']
})
export class ProductRegistrationFormComponent {
  productForm: FormGroup;
  categories = ['Electronics', 'Clothing', 'Food', 'Books', 'Home & Garden'];
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.productForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      productName: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0.01)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      category: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.productForm.valid) {
      console.log('Product Registration Form Submitted:', this.productForm.value);
    }
  }

  onReset() {
    this.productForm.reset();
    this.submitted = false;
  }
}
