import { Component } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-reactive-example',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reactive-example.component.html',
  styleUrl: './reactive-example.component.css'
})
export class ReactiveExampleComponent {

  constructor(private fb: FormBuilder) {}

  registerForm = this.fb.group({

    name: ['', [
      Validators.required,
      Validators.minLength(3)
    ]],

    email: ['', [
      Validators.required,
      Validators.email
    ]],

    password: ['', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(24)
    ]]

  });

  onSubmit() {

    if (this.registerForm.valid) {

      console.log('Reactive Form Data:', this.registerForm.value);

      this.registerForm.reset();

    }

  }

  get f() {
    return this.registerForm.controls;
  }

}