import { Injectable } from '@angular/core';
import { Student } from '../model/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: Student[] = [
    {
      id: 1,
      name: 'Aarav Sharma',
      email: 'aarav@example.com',
      phone: '9876543210',
      marks: 92,
      status: 'passed'
    },
    {
      id: 2,
      name: 'Priya Kapoor',
      email: 'priya@example.com',
      phone: '9876543211',
      marks: 87,
      status: 'passed'
    },
    {
      id: 3,
      name: 'Rohan Verma',
      email: 'rohan@example.com',
      phone: '9876543212',
      marks: 45,
      status: 'failed'
    },
    {
      id: 4,
      name: 'Neha Singh',
      email: 'neha@example.com',
      phone: '9876543213',
      marks: 95,
      status: 'passed'
    },
    {
      id: 5,
      name: 'Vikram Reddy',
      email: 'vikram@example.com',
      phone: '9876543214',
      marks: 58,
      status: 'failed'
    },
    {
      id: 6,
      name: 'Ananya Gupta',
      email: 'ananya@example.com',
      phone: '9876543215',
      marks: 88,
      status: 'passed'
    }
  ];

  constructor() { }

  getStudents(): Student[] {
    return this.students;
  }

  getStudentById(id: number): Student | undefined {
    return this.students.find(student => student.id === id);
  }

  addStudent(student: Omit<Student, 'id' | 'status'>): void {
    const newId = Math.max(...this.students.map(s => s.id), 0) + 1;
    const status: 'passed' | 'failed' = student.marks >= 60 ? 'passed' : 'failed';
    this.students.push({
      ...student,
      id: newId,
      status: status
    } as Student);
  }

  getTopStudents(): Student[] {
    return this.students.filter(s => s.marks >= 85).sort((a, b) => b.marks - a.marks);
  }
}
