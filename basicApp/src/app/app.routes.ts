  import { Routes } from '@angular/router';
import { EmployeeListComponent } from './component/employee-list/employee-list.component';
import { EmployeeFormComponent } from './component/employee-form/employee-form.component';
import { HomeComponent } from './component/home/home.component';
import { AboutComponent } from './component/about/about.component';
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'employee', component: EmployeeListComponent },
  { path: 'employee/add', component: EmployeeFormComponent },
  { path: 'employee/edit/:id', component: EmployeeFormComponent },
  { path:'about',component:AboutComponent}
];
