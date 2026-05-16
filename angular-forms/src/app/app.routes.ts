import { Routes } from '@angular/router';
import { TemplateDrivenFormComponent } from './template-forms/components/template-driven-form/template-driven-form.component';
import { ReactiveLoginComponent } from './reactive-forms/components/reactive-login/reactive-login.component';
import { ReactiveProfileComponent } from './reactive-forms/components/reactive-profile/reactive-profile.component';
import { ReactiveEmployeeFormComponent } from './employee/components/reactive-employee-form/reactive-employee-form.component';

/**
 * App Routes Configuration
 * Defines the navigation structure for the entire application
 * 
 * Routes:
 * - home: Landing/overview page
 * - template-driven: Template-driven forms demonstration
 * - reactive-login: Reactive forms with login example
 * - reactive-profile: Advanced reactive forms with nested groups and arrays
 * - employee: Industrial-grade employee management form with all form concepts
 * - submissions: History of submitted forms
 */
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'template-driven',
    component: TemplateDrivenFormComponent,
  },
  {
    path: 'reactive-login',
    component: ReactiveLoginComponent,
  },
  {
    path: 'reactive-profile',
    component: ReactiveProfileComponent,
  },
  {
    path: 'employee',
    component: ReactiveEmployeeFormComponent,
  },
  {
    path: 'submissions',
    loadComponent: () =>
      import('./submissions/submissions.component').then((m) => m.SubmissionsComponent),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
