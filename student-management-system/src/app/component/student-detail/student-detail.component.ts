import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Student } from '../../model/student.model';
import { StudentService } from '../../service/student.service';

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.css'
})
export class StudentDetailComponent implements OnInit {
 
  student: Student | undefined;
  studentId: number | null = null;

  // dependency injection
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.studentId = +params['id'];
      this.student = this.studentService.getStudentById(this.studentId);
    });
  }

  isTopPerformer(): boolean {
    return this.student ? this.student.marks >= 85 : false;
  }

  getMarksStyle(): any {
    if (!this.student) return {};
    
    const marks = this.student.marks;
    let gradient = '';
    
    if (marks >= 90) {
      gradient = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
    } else if (marks >= 80) {
      gradient = 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)';
    } else if (marks >= 70) {
      gradient = 'linear-gradient(135deg, #ffa726 0%, #fb8c00 100%)';
    } else if (marks >= 60) {
      gradient = 'linear-gradient(135deg, #ffc107 0%, #FBC02D 100%)';
    } else {
      gradient = 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)';
    }
    
    return { background: gradient };
  }

  getPerformanceText(): string {
    if (!this.student) return '';
    
    const marks = this.student.marks;
    if (marks >= 90) return 'Excellent Performance! 🌟';
    if (marks >= 80) return 'Very Good Performance! ✨';
    if (marks >= 70) return 'Good Performance 👍';
    if (marks >= 60) return 'Satisfactory Performance ✓';
    return 'Needs Improvement 📚';
  }

  editStudent(): void {
    // Can be implemented later for editing functionality
    alert('Edit functionality coming soon!');
  }

  goBack(): void {
    this.router.navigate(['/students']);
  }
}
