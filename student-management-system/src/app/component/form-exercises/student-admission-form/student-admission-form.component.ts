import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-admission-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-admission-form.component.html',
  styleUrls: ['./student-admission-form.component.css']
})
export class StudentAdmissionFormComponent {
  student = {
    name: '',
    age: null,
    course: '',
    gender: ''
  };

  courses = ['Computer Science', 'Engineering', 'Business', 'Arts'];
  submitted = false;
  submittedData: any = null;

  onSubmit() {
    this.submitted = true;
    this.submittedData = { ...this.student };
    console.log('Student Admission Form Submitted:', this.submittedData);
  }

  onReset() {
    this.student = {
      name: '',
      age: null,
      course: '',
      gender: ''
    };
    this.submitted = false;
    this.submittedData = null;
  }
}
