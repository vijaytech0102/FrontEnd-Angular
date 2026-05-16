import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface StudentData {
  name: string;
  email: string;
  age: number;
  course: string;
}

@Component({
  selector: 'app-student-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.css']
})
export class StudentRegistrationComponent {
  submitted = false;
  studentData: StudentData | null = null;

  student = {
    name: '',
    email: '',
    age: '',
    course: ''
  };

  courses = ['Computer Science', 'Engineering', 'Business', 'Arts', 'Science'];

  onSubmit() {
    this.submitted = true;
    
    // Validate all fields
    if (this.isFormValid()) {
      this.studentData = {
        name: this.student.name,
        email: this.student.email,
        age: parseInt(this.student.age),
        course: this.student.course
      };
    }
  }

  isFormValid(): boolean {
    return (
      this.student.name.length >= 3 &&
      this.isEmailValid(this.student.email) &&
      parseInt(this.student.age) >= 18 &&
      this.student.course !== ''
    );
  }

  isEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  resetForm() {
    this.student = {
      name: '',
      email: '',
      age: '',
      course: ''
    };
    this.submitted = false;
    this.studentData = null;
  }

  getNameError(): string {
    if (this.student.name.length === 0) 
      return 'Name is required';
    if(this.student.name.startsWith(' ')) 
      return 'Name cannot start with a space';
    if (this.student.name.length < 3) 
      return 'Name must be at least 3 characters';
    for (let char of this.student.name) {
      if (!/[a-zA-Z\s]/.test(char)) {
        return 'Name can only contain letters and spaces';
      }
    }
    if(this.student.name.length > 50) return 'Name cannot exceed 50 characters';
    return '';
  }

  getEmailError(): string {
    if (this.student.email.length === 0) return 'Email is required';
    if (!this.isEmailValid(this.student.email)) return 'Invalid email format';
    return '';
  }

  getAgeError(): string {
    if (this.student.age === '') return 'Age is required';
    if (parseInt(this.student.age) < 18) return 'Age must be at least 18';
    return '';
  }

  getCourseError(): string {
    if (this.student.course === '') return 'Course selection is required';
    return '';
  }
}
