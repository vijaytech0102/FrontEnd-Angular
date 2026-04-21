import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { StudentListComponent } from './component/student-list/student-list.component';
import { StudentDetailComponent } from './component/student-detail/student-detail.component';
import { AddStudentComponent } from './component/add-student/add-student.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'students', component: StudentListComponent },
  { path: 'student/:id', component: StudentDetailComponent },
  { path: 'add-student', component: AddStudentComponent },
  { path: '**', redirectTo: '/home' }
];
