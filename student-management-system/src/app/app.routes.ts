import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { StudentListComponent } from './component/student-list/student-list.component';
import { StudentDetailComponent } from './component/student-detail/student-detail.component';
import { AddStudentComponent } from './component/add-student/add-student.component';
import { StudentRegistrationComponent } from './component/form-exercises/student-registration/student-registration.component';
import { LoginFormComponent } from './component/form-exercises/login-form/login-form.component';
import { DynamicFormComponent } from './component/form-exercises/dynamic-form/dynamic-form.component';
import { PasswordValidatorComponent } from './component/form-exercises/password-validator/password-validator.component';
import { SimpleCustomValidatorComponent } from './component/form-exercises/simple-custom-validator/simple-custom-validator.component';
import { MultiStepFormComponent } from './component/form-exercises/multi-step-form/multi-step-form.component';
import { TemplateComponent } from './component/template/template.component';
import { TemplateExampleComponent } from './component/template-example/template-example.component';
import { ReactiveExampleComponent } from './component/reactive-example/reactive-example.component';

// Template-Driven Forms
import { ContactFormComponent } from './component/form-exercises/contact-form/contact-form.component';
import { StudentAdmissionFormComponent } from './component/form-exercises/student-admission-form/student-admission-form.component';
import { EmployeeFeedbackFormComponent } from './component/form-exercises/employee-feedback-form/employee-feedback-form.component';
import { UserProfileFormComponent } from './component/form-exercises/user-profile-form/user-profile-form.component';

// Reactive Forms
import { SignupFormComponent } from './component/form-exercises/signup-form/signup-form.component';
import { DynamicSkillsFormComponent } from './component/form-exercises/dynamic-skills-form/dynamic-skills-form.component';
import { ProductRegistrationFormComponent } from './component/form-exercises/product-registration-form/product-registration-form.component';
import { MultiStepRegistrationFormComponent } from './component/form-exercises/multi-step-registration-form/multi-step-registration-form.component';
import { EmployeeManagementFormComponent } from './component/form-exercises/employee-management-form/employee-management-form.component';

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
  { path: 'forms/simple-custom-validator', component: SimpleCustomValidatorComponent },
  { path: 'forms/multi-step', component: MultiStepFormComponent },
  
  // Template-Driven Forms
  { path: 'forms/contact-form', component: ContactFormComponent },
  { path: 'forms/student-admission-form', component: StudentAdmissionFormComponent },
  { path: 'forms/employee-feedback-form', component: EmployeeFeedbackFormComponent },
  { path: 'forms/user-profile-form', component: UserProfileFormComponent },
  
  // Reactive Forms
  { path: 'forms/signup-form', component: SignupFormComponent },
  { path: 'forms/dynamic-skills-form', component: DynamicSkillsFormComponent },
  { path: 'forms/product-registration-form', component: ProductRegistrationFormComponent },
  { path: 'forms/multi-step-registration-form', component: MultiStepRegistrationFormComponent },
  { path: 'forms/employee-management-form', component: EmployeeManagementFormComponent },
  
  { path: 'template', component: TemplateComponent },
  { path: 'template-example', component: TemplateExampleComponent },
  { path: 'reactive-example', component: ReactiveExampleComponent },
  { path: '**', redirectTo: '/home' }
];
