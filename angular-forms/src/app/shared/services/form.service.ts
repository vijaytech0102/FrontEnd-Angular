import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SubmittedFormData, User, UserProfile } from '../models/form.model';

/**
 * Form Storage Service
 * Manages form data persistence using Local Storage
 * Allows saving, retrieving, and managing form submission history
 */
@Injectable({
  providedIn: 'root',
})
export class FormStorageService {
  private readonly STORAGE_KEY = 'angular_forms_submissions';
  private submittedFormsSubject = new BehaviorSubject<SubmittedFormData[]>([]);

  public submittedForms$ = this.submittedFormsSubject.asObservable();

  constructor() {
    this.loadSubmittedForms();
  }

  /**
   * Save form submission to local storage
   * Each submission includes timestamp, form type, data, and validation status
   */
  saveFormSubmission(
    formType: 'template-driven' | 'reactive',
    data: any,
    isValid: boolean
  ): void {
    const submission: SubmittedFormData = {
      timestamp: new Date(),
      formType,
      data,
      isValid,
    };

    const submissions = this.submittedFormsSubject.value;
    submissions.unshift(submission); // Add to beginning of array

    // Keep only last 10 submissions
    if (submissions.length > 10) {
      submissions.pop();
    }

    this.submittedFormsSubject.next(submissions);
    this.persistToStorage();
  }

  /**
   * Get all submitted forms
   */
  getSubmittedForms(): SubmittedFormData[] {
    return this.submittedFormsSubject.value;
  }

  /**
   * Clear all submissions
   */
  clearSubmissions(): void {
    this.submittedFormsSubject.next([]);
    localStorage.removeItem(this.STORAGE_KEY);
  }

  /**
   * Get submissions by form type
   */
  getSubmissionsByType(formType: 'template-driven' | 'reactive'): SubmittedFormData[] {
    return this.submittedFormsSubject.value.filter(
      (submission) => submission.formType === formType
    );
  }

  /**
   * Save data to local storage
   */
  private persistToStorage(): void {
    try {
      const submissions = this.submittedFormsSubject.value;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(submissions));
    } catch (error) {
      console.error('Error saving to local storage:', error);
    }
  }

  /**
   * Load data from local storage
   */
  private loadSubmittedForms(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const submissions = JSON.parse(stored);
        this.submittedFormsSubject.next(submissions);
      }
    } catch (error) {
      console.error('Error loading from local storage:', error);
    }
  }
}

/**
 * API Simulation Service
 * Simulates backend API calls for authentication and user management
 * In a real application, this would make actual HTTP requests
 */
@Injectable({
  providedIn: 'root',
})
export class ApiSimulationService {
  /**
   * Simulate login API call
   * In real app: POST /api/login with credentials
   */
  login(email: string, password: string): Observable<{ token: string; user: any }> {
    // Simulate API call with delay
    return new Observable((observer) => {
      setTimeout(() => {
        if (email && password.length >= 6) {
          observer.next({
            token: 'mock-jwt-token-' + Date.now(),
            user: { email, id: Math.random() },
          });
          observer.complete();
        } else {
          observer.error('Invalid credentials');
        }
      }, 1000);
    });
  }

  /**
   * Simulate user registration
   * In real app: POST /api/register with user data
   */
  registerUser(user: User): Observable<{ id: string; message: string }> {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next({
          id: 'user-' + Math.random().toString(36).substr(2, 9),
          message: 'User registered successfully',
        });
        observer.complete();
      }, 1500);
    });
  }

  /**
   * Simulate profile update
   * In real app: PUT /api/profile with profile data
   */
  updateProfile(profile: UserProfile): Observable<{ message: string; updatedAt: Date }> {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next({
          message: 'Profile updated successfully',
          updatedAt: new Date(),
        });
        observer.complete();
      }, 1000);
    });
  }
}

/**
 * Notification Service
 * Handles displaying notifications/toasts to users
 */
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<
    { message: string; type: 'success' | 'error' | 'info'; id: string }[]
  >([]);

  public notifications$ = this.notificationsSubject.asObservable();

  /**
   * Show success notification
   */
  success(message: string, duration = 3000): void {
    this.showNotification(message, 'success', duration);
  }

  /**
   * Show error notification
   */
  error(message: string, duration = 5000): void {
    this.showNotification(message, 'error', duration);
  }

  /**
   * Show info notification
   */
  info(message: string, duration = 3000): void {
    this.showNotification(message, 'info', duration);
  }

  /**
   * Internal method to show notification
   */
  private showNotification(
    message: string,
    type: 'success' | 'error' | 'info',
    duration: number
  ): void {
    const id = Date.now().toString();
    const notification = { message, type, id };

    const currentNotifications = this.notificationsSubject.value;
    this.notificationsSubject.next([...currentNotifications, notification]);

    // Auto-remove notification after duration
    setTimeout(() => {
      const remaining = this.notificationsSubject.value.filter((n) => n.id !== id);
      this.notificationsSubject.next(remaining);
    }, duration);
  }

  /**
   * Remove specific notification
   */
  remove(id: string): void {
    const remaining = this.notificationsSubject.value.filter((n) => n.id !== id);
    this.notificationsSubject.next(remaining);
  }
}
