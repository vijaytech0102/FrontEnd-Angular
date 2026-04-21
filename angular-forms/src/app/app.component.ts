import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotificationService } from './shared/services/form.service';

/**
 * Root App Component
 * Contains navigation and main router outlet
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Angular Forms Learning Guide';
  notifications: any[] = [];
  navOpen = false;

  constructor(public notificationService: NotificationService) {}

  ngOnInit(): void {
    // Subscribe to notifications
    this.notificationService.notifications$.subscribe((notifications) => {
      this.notifications = notifications;
    });
  }

  toggleNav(): void {
    this.navOpen = !this.navOpen;
  }

  closeNav(): void {
    this.navOpen = false;
  }
}
