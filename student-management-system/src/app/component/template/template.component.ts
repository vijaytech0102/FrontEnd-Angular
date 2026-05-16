import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { count } from 'rxjs';

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './template.component.html',
  styleUrl: './template.component.css'
})
export class TemplateComponent {

  user: any = {
    name: '',
    email: '',
    mobile: '',
    country: '',
    agree: false
  };
  
  formData: NgForm=this.user;  

  onSubmit() {
    // Handle form submission logic here
    console.log('Form submitted!');
  }
  mobileValidator(mobile: string): boolean {
    const mobileRegex = /^\d{10}$/; 
    return mobileRegex.test(mobile);  
  }

}
