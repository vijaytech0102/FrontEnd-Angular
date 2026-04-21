import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Student } from '../../model/student.model';
import { StudentService } from '../../service/student.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.students = this.studentService.getStudents();
  }

  viewDetails(id: number): void {
    this.router.navigate(['/student', id]);
  }

  isTopPerformer(student: Student): boolean {
    return student.marks >= 85;
  }

  getMarksStyle(marks: number): any {
    const percentage = (marks / 100) * 100;
    return {
      background: this.getGradient(marks)
    };
  }

  private getGradient(marks: number): string {
    if (marks >= 90) {
      return 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
    } else if (marks >= 80) {
      return 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)';
    } else if (marks >= 70) {
      return 'linear-gradient(135deg, #ffa726 0%, #fb8c00 100%)';
    } else if (marks >= 60) {
      return 'linear-gradient(135deg, #ffc107 0%, #FBC02D 100%)';
    } else {
      return 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)';
    }
  }
}
