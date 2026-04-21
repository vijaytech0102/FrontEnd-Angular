import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../../service/student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  totalStudents: number = 0;
  passedStudents: number = 0;
  failedStudents: number = 0;
  topStudents: number = 0;

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    const students = this.studentService.getStudents();
    this.totalStudents = students.length;
    this.passedStudents = students.filter(s => s.status === 'passed').length;
    this.failedStudents = students.filter(s => s.status === 'failed').length;
    this.topStudents = this.studentService.getTopStudents().length;
  }

  goToStudents(): void {
    this.router.navigate(['/students']);
  }

  goToAddStudent(): void {
    this.router.navigate(['/add-student']);
  }
}
