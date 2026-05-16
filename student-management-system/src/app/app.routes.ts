import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { StudentListComponent } from './component/student-list/student-list.component';
import { StudentDetailComponent } from './component/student-detail/student-detail.component';
import { AddStudentComponent } from './component/add-student/add-student.component';
import { StudentRegistrationComponent } from './component/form-exercises/student-registration/student-registration.component';
import { LoginFormComponent } from './component/form-exercises/login-form/login-form.component';
import { DynamicFormComponent } from './component/form-exercises/dynamic-form/dynamic-form.component';
import { PasswordValidatorComponent } from './component/form-exercises/password-validator/password-validator.component';
import { MultiStepFormComponent } from './component/form-exercises/multi-step-form/multi-step-form.component';
import { TemplateComponent } from './component/template/template.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'students', component: StudentListComponent },
  { path: 'student/:id', component: StudentDetailComponent },
  { path: 'add-student', component: AddStudentComponent },
  // Form Exercise Routes
  { path: 'forms/student-registration', component: StudentRegistrationComponent },
  { path: 'forms/login', component: LoginFormComponent },
  { path: 'forms/dynamic-form', component: DynamicFormComponent },
  { path: 'forms/password-validator', component: PasswordValidatorComponent },
  { path: 'forms/multi-step', component: MultiStepFormComponent },
  {path:'template', component: TemplateComponent},
  { path: '**', redirectTo: '/home' }
];
