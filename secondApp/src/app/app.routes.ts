import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { AboutComponent } from './component/about/about.component';
import { ContactComponent } from './component/contact/contact.component';
import { HomeComponent } from './component/home/home.component';

export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path:'home',component:HomeComponent},
    {path: 'login', component:LoginComponent},
    {path:'register', component:RegisterComponent},
    {path:'about', component:AboutComponent},
    {path:'contact', component:ContactComponent},
    { path: '**', redirectTo: '/login' }

];
