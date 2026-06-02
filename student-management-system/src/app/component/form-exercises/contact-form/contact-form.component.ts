import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
  contact = {
    name: '',
    email: '',
    message: ''
  };

  submitted = false;

  onSubmit() {
    this.submitted = true;
    console.log('Contact Form Submitted:', this.contact);
  }

  onReset() {
    this.contact = {
      name: '',
      email: '',
      message: ''
    };
    this.submitted = false;
  }
}
