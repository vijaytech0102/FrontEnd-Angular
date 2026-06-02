import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile-form.component.html',
  styleUrls: ['./user-profile-form.component.css']
})
export class UserProfileFormComponent {
  profile = {
    firstName: '',
    lastName: '',
    phone: '',
    address: ''
  };

  submitted = false;

  onSubmit() {
    this.submitted = true;
    console.log('User Profile Submitted:', this.profile);
  }

  onReset() {
    this.profile = {
      firstName: '',
      lastName: '',
      phone: '',
      address: ''
    };
    this.submitted = false;
  }

  get fullName(): string {
    return `${this.profile.firstName} ${this.profile.lastName}`.trim();
  }
}
