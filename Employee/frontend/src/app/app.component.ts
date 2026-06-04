import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  template: `
    <nav class="navbar">
      <a routerLink="/" class="brand">Employee Manager</a>
      <a routerLink="/add" class="nav-link">Add Employee</a>
    </nav>
    <router-outlet />
  `,
  styles: [`
    .navbar {
      background-color: #3f51b5;
      padding: 14px 30px;
      display: flex;
      align-items: center;
      gap: 24px;
    }
    .brand {
      color: white;
      font-size: 1.3rem;
      font-weight: bold;
      text-decoration: none;
    }
    .nav-link {
      color: rgba(255,255,255,0.85);
      text-decoration: none;
      font-size: 0.95rem;
    }
    .nav-link:hover { color: white; }
  `]
})
export class AppComponent {}
