import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from '../../model/student.model';
import { StudentService } from '../../service/student.service';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent {
  newStudent: Omit<Student, 'id' | 'status'> = {
    name: '',
    email: '',
    phone: '',
    marks: 0
  };

  successMessage: string = '';

  constructor(private studentService: StudentService, private router: Router) {}

  addStudent(): void {
    if (this.isFormValid()) {
      this.studentService.addStudent(this.newStudent);
      this.successMessage = `Student "${this.newStudent.name}" added successfully!`;
      
      setTimeout(() => {
        this.router.navigate(['/students']);
      }, 1500);
    }
  }

  isFormValid(): boolean {
    return (
      this.newStudent.name.trim() !== '' &&
      this.newStudent.email.trim() !== '' &&
      this.newStudent.phone.trim() !== '' &&
      this.newStudent.marks >= 0 &&
      this.newStudent.marks <= 100
    );
  }

  resetForm(): void {
    this.newStudent = {
      name: '',
      email: '',
      phone: '',
      marks: 0
    };
    this.successMessage = '';
  }

  goBack(): void {
    this.router.navigate(['/students']);
  }

  getStatusText(): string {
    const marks = this.newStudent.marks;
    if (marks >= 90) return '⭐ Excellent';
    if (marks >= 80) return '✨ Very Good';
    if (marks >= 70) return '👍 Good';
    if (marks >= 60) return '✓ Pass';
    return '📚 Fail';
  }

  getStatusClass(): string {
    const marks = this.newStudent.marks;
    if (marks >= 90) return 'excellent';
    if (marks >= 80) return 'very-good';
    if (marks >= 70) return 'good';
    if (marks >= 60) return 'pass';
    return 'fail';
  }
}
