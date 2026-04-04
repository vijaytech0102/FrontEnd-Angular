/**
 * ===================================================================
 * ANGULAR 15 - COMPREHENSIVE INDUSTRIAL-LEVEL GUIDE
 * ===================================================================
 * 
 * Angular is a complete framework for building dynamic web applications.
 * It provides tools, libraries, and best practices for building scalable,
 * maintainable, and performant applications.
 * 
 * Angular 15 (Released November 2022):
 * - Standalone components (simplified setup)
 * - Improved TypeScript strict mode support
 * - Enhanced tooling and compilation
 * - Better performance improvements
 * 
 * This guide covers everything from basic concepts to advanced patterns.
 * 
 * Topics Covered:
 * 1. Angular Architecture & Setup
 * 2. Components (Core)
 * 3. Templates & Data Binding
 * 4. Directives
 * 5. Services & Dependency Injection
 * 6. HTTP Client & API Integration
 * 7. Routing & Navigation
 * 8. Forms (Template-Driven & Reactive)
 * 9. RxJS & Observables
 * 10. Pipes
 * 11. Decorators & Metadata
 * 12. State Management
 * 13. Testing
 * 14. Security Best Practices
 * 15. Performance Optimization
 * 16. Advanced Patterns & Real-World Examples
 * ===================================================================
 */

// ============================================================
// 1. ANGULAR ARCHITECTURE & PROJECT SETUP
// ============================================================

/**
 * Angular Project Structure:
 * 
 * my-angular-app/
 * ├── src/
 * │   ├── app/                    // Main application directory
 * │   │   ├── app.component.ts    // Root component
 * │   │   ├── app.module.ts       // Root module (NgModules approach)
 * │   │   ├── components/         // Feature components
 * │   │   ├── services/           // Services for business logic
 * │   │   ├── models/             // TypeScript interfaces/types
 * │   │   ├── pipes/              // Custom pipes
 * │   │   ├── directives/         // Custom directives
 * │   │   ├── interceptors/       // HTTP interceptors
 * │   │   └── guards/             // Route guards
 * │   ├── assets/                 // Static files (images, fonts, etc.)
 * │   ├── styles/                 // Global styles
 * │   ├── main.ts                 // Application entry point
 * │   ├── index.html              // HTML template
 * │   └── polyfills.ts            // Browser compatibility
 * ├── angular.json                // Angular CLI configuration
 * ├── tsconfig.json               // TypeScript configuration
 * ├── tsconfig.app.json           // App-specific TypeScript config
 * ├── tsconfig.spec.json          // Test-specific TypeScript config
 * ├── karma.conf.js               // Test runner configuration
 * └── package.json                // Dependencies
 */

/**
 * Two Ways to Build Angular Apps:
 * 
 * 1. NgModules Approach (Traditional)
 *    - Use @NgModule decorator
 *    - Import/declare components, directives, pipes
 *    - More boilerplate but explicit
 * 
 * 2. Standalone Components (Angular 14+, Recommended)
 *    - No NgModule needed
 *    - Components are self-contained
 *    - Less boilerplate, easier to setup
 */

/**
 * Create Angular Project:
 * $ ng new my-app --skip-git
 * $ cd my-app
 * $ ng serve (development server at http://localhost:4200)
 */

// ============================================================
// 2. COMPONENTS (Core of Angular)
// ============================================================

/**
 * Components:
 * Building blocks of Angular applications.
 * Each component has:
 * - Template (HTML with Angular syntax)
 * - Class (TypeScript with logic)
 * - Styles (CSS for component)
 * - Metadata (decorators)
 * 
 * Components communicate via:
 * - @Input: parent → child data
 * - @Output and EventEmitter: child → parent communication
 * - Services: sibling and cross-component communication
 */

// Example: app.component.ts (Root component)
import { Component, OnInit } from '@angular/core';

/**
 * @Component Decorator:
 * Defines component metadata
 * 
 * selector: CSS selector to use component in templates
 * template or templateUrl: HTML template
 * styles or styleUrls: Component styles
 * standalone: true - no module needed (Angular 14+)
 */

@Component({
  selector: 'app-root',          // <app-root></app-root> in HTML
  templateUrl: './app.component.html',  // External template file
  styleUrls: ['./app.component.css'],   // External style file
  // Alternatively:
  // template: '<h1>Hello {{ title }}</h1>',
  // styles: ['h1 { color: blue; }']
  standalone: false             // Uses NgModules (change to true for standalone)
})
export class AppComponent implements OnInit {
  title = 'My Angular App';
  count = 0;
  
  constructor() {
    console.log('Constructor called - before component is initialized');
  }
  
  ngOnInit(): void {
    console.log('ngOnInit - component initialized');
    // Initialize data, fetch data from API, etc.
  }
  
  increment(): void {
    this.count++;
  }
}

/**
 * Component Lifecycle Hooks:
 * Angular calls these methods at specific points in component lifecycle
 * 
 * 1. constructor() - Before everything, inject dependencies
 * 2. ngOnInit() - After component is created, initialize data
 * 3. ngOnChanges() - When input properties change
 * 4. ngDoCheck() - Custom change detection
 * 5. ngAfterContentInit() - After content is initialized
 * 6. ngAfterContentChecked() - After content is checked
 * 7. ngAfterViewInit() - After component view is initialized
 * 8. ngAfterViewChecked() - After view is checked
 * 9. ngOnDestroy() - Before component is destroyed (cleanup)
 */

@Component({
  selector: 'app-lifecycle',
  template: `
    <p>{{ message }}</p>
  `
})
export class LifecycleComponent implements OnInit, OnDestroy {
  message = 'Component lifecycle demo';
  
  ngOnInit(): void {
    console.log('1. Component initialized');
  }
  
  ngOnDestroy(): void {
    console.log('9. Component destroyed - cleanup here');
    // Unsubscribe from observables, clear timers, etc.
  }
}

/**
 * Child Component with @Input and @Output
 */

import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <div>
      <p>Count: {{ count }}</p>
      <button (click)="onIncrement()">Increment</button>
      <button (click)="onDecrement()">Decrement</button>
    </div>
  `
})
export class CounterComponent {
  // @Input: receive data from parent component
  @Input() count: number = 0;
  @Input() title: string = 'Counter';
  @Input() maxCount: number = 100;
  
  // @Output: emit events to parent component
  @Output() countChanged = new EventEmitter<number>();
  // Alternative output name mapping:
  // @Output('count-changed') countChanged = new EventEmitter<number>();
  
  onIncrement(): void {
    if (this.count < this.maxCount) {
      this.count++;
      this.countChanged.emit(this.count); // Send to parent
    }
  }
  
  onDecrement(): void {
    if (this.count > 0) {
      this.count--;
      this.countChanged.emit(this.count);
    }
  }
}

/**
 * Parent Component Using Child Component
 */

@Component({
  selector: 'app-parent',
  template: `
    <h1>Parent Component</h1>
    
    <!-- Pass input properties (parent → child) -->
    <app-counter 
      [count]="myCount" 
      [title]="'My Counter'"
      [maxCount]="50"
      (countChanged)="onCountChanged($event)">
    </app-counter>
    
    <p>Total count: {{ myCount }}</p>
  `
})
export class ParentComponent {
  myCount = 0;
  
  onCountChanged(newCount: number): void {
    this.myCount = newCount;
    console.log('Count updated to:', newCount);
  }
}

/**
 * Standalone Component (Angular 14+, Recommended):
 * No NgModule needed, simpler setup
 */

@Component({
  selector: 'app-standalone-demo',
  template: `
    <h1>{{ title }}</h1>
    <p>This is a standalone component</p>
  `,
  styles: [`h1 { color: blue; }`],
  standalone: true,  // Mark as standalone
  imports: []        // Import other components/modules needed
})
export class StandaloneDemoComponent {
  title = 'Standalone Component';
}

// ============================================================
// 3. TEMPLATES & DATA BINDING
// ============================================================

/**
 * Angular Templates:
 * HTML with Angular-specific syntax for:
 * - Data binding (interpolation, property, event, two-way)
 * - Structural directives (*ngIf, *ngFor, *ngSwitch)
 * - Attribute directives ([ngClass], [ngStyle])
 * - Template syntax (#, let, as)
 */

/**
 * 1. INTERPOLATION {{ }}
 * One-way binding: component → template
 * Displays component property value in template
 */

@Component({
  selector: 'app-interpolation',
  template: `
    <h1>{{ title }}</h1>
    <p>{{ count }}</p>
    <p>{{ 5 + 3 }}</p>  <!-- Expressions allowed -->
    <p>{{ isActive ? 'Active' : 'Inactive' }}</p>  <!-- Ternary -->
  `
})
export class InterpolationComponent {
  title = 'Interpolation Demo';
  count = 42;
  isActive = true;
}

/**
 * 2. PROPERTY BINDING [property]="value"
 * One-way binding: component → template
 * Sets HTML element properties, not attributes
 */

@Component({
  selector: 'app-property-binding',
  template: `
    <!-- Bind to input value -->
    <input [value]="inputValue" />
    
    <!-- Bind to disabled state -->
    <button [disabled]="!isEnabled">Click me</button>
    
    <!-- Bind to custom component input -->
    <app-counter [count]="myCount"></app-counter>
    
    <!-- Bind to image source -->
    <img [src]="imageUrl" [alt]="imageAlt" />
  `
})
export class PropertyBindingComponent {
  inputValue = 'Hello';
  isEnabled = true;
  myCount = 5;
  imageUrl = 'assets/photo.jpg';
  imageAlt = 'Photo';
}

/**
 * 3. EVENT BINDING (event)="handler()"
 * Template → Component
 * Responds to user actions
 */

@Component({
  selector: 'app-event-binding',
  template: `
    <!-- Click event -->
    <button (click)="onClick()">Click</button>
    
    <!-- With parameters -->
    <button (click)="onDelete(5)">Delete Item 5</button>
    
    <!-- Access $event object -->
    <input (keyup)="onKeyUp($event)" />
    
    <!-- Multiple events -->
    <input 
      (focus)="onFocus()"
      (blur)="onBlur()"
      (change)="onChange($event)"
    />
    
    <!-- Form events -->
    <form (submit)="onSubmit()">
      <button type="submit">Submit</button>
    </form>
  `
})
export class EventBindingComponent {
  onClick(): void {
    console.log('Button clicked');
  }
  
  onDelete(id: number): void {
    console.log('Delete item', id);
  }
  
  onKeyUp(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    console.log('Key:', input.value);
  }
  
  onFocus(): void {
    console.log('Input focused');
  }
  
  onBlur(): void {
    console.log('Input blurred');
  }
  
  onChange(event: Event): void {
    console.log('Value changed');
  }
  
  onSubmit(): void {
    console.log('Form submitted');
  }
}

/**
 * 4. TWO-WAY BINDING [(ngModel)]="property"
 * Component ↔ Template
 * Changes in either direction update the other
 * Requires FormsModule imported
 */

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-two-way-binding',
  template: `
    <!-- Two-way binding with ngModel -->
    <input [(ngModel)]="name" />
    <p>You entered: {{ name }}</p>
    
    <!-- Equivalent to property + event binding: -->
    <!-- [value]="name" (input)="name = $event.target.value" -->
  `,
  standalone: true,
  imports: [FormsModule]
})
export class TwoWayBindingComponent {
  name = '';
}

/**
 * 5. ATTRIBUTE BINDING [attr.attribute]="value"
 * For non-property attributes (data-, aria-, etc.)
 */

@Component({
  selector: 'app-attribute-binding',
  template: `
    <!-- Bind HTML attributes -->
    <button [attr.aria-label]="buttonLabel">
      Accessible Button
    </button>
    
    <!-- Bind data attributes -->
    <div [attr.data-testid]="'test-id-123'"></div>
  `
})
export class AttributeBindingComponent {
  buttonLabel = 'Click to submit';
}

/**
 * 6. CLASS BINDING [ngClass]
 * Dynamically add/remove CSS classes
 */

@Component({
  selector: 'app-class-binding',
  template: `
    <!-- Single class binding -->
    <div [class.active]="isActive">Item</div>
    
    <!-- Multiple classes with object -->
    <div [ngClass]="{ 
      'success': isSuccess,
      'error': isError,
      'warning': isWarning
    }">
      Status
    </div>
    
    <!-- With array of classes -->
    <div [ngClass]="['class1', 'class2']">
      Multiple classes
    </div>
  `,
  styles: [`
    .active { color: blue; font-weight: bold; }
    .success { color: green; }
    .error { color: red; }
    .warning { color: orange; }
  `]
})
export class ClassBindingComponent {
  isActive = true;
  isSuccess = false;
  isError = false;
  isWarning = true;
}

/**
 * 7. STYLE BINDING [ngStyle]
 * Dynamically set inline styles
 */

@Component({
  selector: 'app-style-binding',
  template: `
    <!-- Single style -->
    <div [style.color]="textColor">
      Colored text
    </div>
    
    <!-- Multiple styles with object -->
    <div [ngStyle]="{ 
      'color': textColor,
      'font-size': fontSize + 'px',
      'background-color': backgroundColor
    }">
      Styled text
    </div>
  `
})
export class StyleBindingComponent {
  textColor = 'blue';
  fontSize = 16;
  backgroundColor = 'yellow';
}

// ============================================================
// 4. DIRECTIVES
// ============================================================

/**
 * Directives:
 * Instructions for the DOM to add behavior or transform it.
 * Three types of directives:
 * 1. Attribute Directives: modify appearance or behavior
 * 2. Structural Directives: add/remove elements from DOM
 * 3. Custom Directives: create your own
 */

/**
 * STRUCTURAL DIRECTIVES:
 * Add or remove elements from DOM
 * Always prefixed with *
 */

/**
 * *ngIf: Conditionally add/remove element
 */

@Component({
  selector: 'app-ngif-demo',
  template: `
    <!-- Simple if -->
    <div *ngIf="isVisible">
      This is visible only when isVisible is true
    </div>
    
    <!-- if-else -->
    <div *ngIf="isLoggedIn; else notLoggedIn">
      Welcome {{ userName }}!
    </div>
    <ng-template #notLoggedIn>
      <p>Please log in</p>
    </ng-template>
    
    <!-- if-then-else -->
    <div *ngIf="score >= 60; then pass; else fail"></div>
    <ng-template #pass>
      <p>You passed!</p>
    </ng-template>
    <ng-template #fail>
      <p>You failed!</p>
    </ng-template>
  `
})
export class NgIfDemoComponent {
  isVisible = true;
  isLoggedIn = true;
  userName = 'John';
  score = 75;
}

/**
 * *ngFor: Iterate over arrays
 */

@Component({
  selector: 'app-ngfor-demo',
  template: `
    <!-- Simple loop -->
    <ul>
      <li *ngFor="let item of items">{{ item }}</li>
    </ul>
    
    <!-- With index -->
    <div *ngFor="let user of users; let i = index">
      {{ i + 1 }}. {{ user.name }}
    </div>
    
    <!-- With object -->
    <div *ngFor="let user of users">
      <p>Name: {{ user.name }}</p>
      <p>Email: {{ user.email }}</p>
    </div>
    
    <!-- With trackBy for performance -->
    <div *ngFor="let item of items; trackBy: trackByFn">
      {{ item.id }}: {{ item.name }}
    </div>
  `
})
export class NgForDemoComponent {
  items = ['Angular', 'React', 'Vue'];
  
  users = [
    { id: 1, name: 'John', email: 'john@example.com' },
    { id: 2, name: 'Jane', email: 'jane@example.com' },
    { id: 3, name: 'Bob', email: 'bob@example.com' }
  ];
  
  // TrackBy function for performance optimization
  trackByFn(index: number, item: any): any {
    return item.id; // Return unique identifier
  }
}

/**
 * *ngSwitch: Switch statement in templates
 */

@Component({
  selector: 'app-ngswitch-demo',
  template: `
    <div [ngSwitch]="status">
      <p *ngSwitchCase="'active'">Active Status</p>
      <p *ngSwitchCase="'inactive'">Inactive Status</p>
      <p *ngSwitchCase="'pending'">Pending Status</p>
      <p *ngSwitchDefault>Unknown Status</p>
    </div>
  `
})
export class NgSwitchDemoComponent {
  status = 'active';
}

/**
 * ATTRIBUTE DIRECTIVES:
 * Modify appearance or behavior without changing DOM structure
 */

/**
 * ngClass: Add/remove CSS classes dynamically
 * (Covered in Template Binding section)
 */

/**
 * ngStyle: Set style properties dynamically
 * (Covered in Template Binding section)
 */

/**
 * Custom Attribute Directive
 */

import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  constructor(private el: ElementRef) {
    // Change background color
    this.el.nativeElement.style.backgroundColor = 'yellow';
  }
  
  // Listen to events
  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.el.nativeElement.style.backgroundColor = 'red';
  }
  
  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.el.nativeElement.style.backgroundColor = 'yellow';
  }
}

/**
 * Using custom directive:
 * <p appHighlight>Highlighted text</p>
 */

/**
 * Custom Directive with Input
 */

import { Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCustomHighlight]',
  standalone: true
})
export class CustomHighlightDirective {
  @Input() 
  set appCustomHighlight(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'color', color);
  }
  
  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}
}

/**
 * Using custom directive with input:
 * <p [appCustomHighlight]="'blue'">Blue text</p>
 */

// ============================================================
// 5. SERVICES & DEPENDENCY INJECTION
// ============================================================

/**
 * Services:
 * Classes that contain business logic and data.
 * Shared across components via Dependency Injection.
 * Responsibilities:
 * - Business logic
 * - API calls
 * - Data management
 * - Logging
 * - Authentication
 */

import { Injectable } from '@angular/core';

/**
 * @Injectable() Decorator:
 * Marks class as service that can be injected
 * providedIn: 'root' - singleton service (one instance app-wide)
 */

@Injectable({
  providedIn: 'root'  // Available throughout the app
})
export class UserService {
  private users: any[] = [];
  
  constructor() {
    console.log('UserService initialized');
  }
  
  getUsers(): any[] {
    return this.users;
  }
  
  addUser(user: any): void {
    this.users.push(user);
  }
  
  deleteUser(id: number): void {
    this.users = this.users.filter(u => u.id !== id);
  }
}

/**
 * Using Service in Component:
 * Inject via constructor (Dependency Injection)
 */

@Component({
  selector: 'app-user-list',
  template: `
    <h1>Users</h1>
    <ul>
      <li *ngFor="let user of users">
        {{ user.name }}
      </li>
    </ul>
    <button (click)="addNewUser()">Add User</button>
  `
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  
  // Inject UserService via constructor
  constructor(private userService: UserService) {}
  
  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }
  
  addNewUser(): void {
    const newUser = { id: 1, name: 'New User' };
    this.userService.addUser(newUser);
    this.users = this.userService.getUsers();
  }
}

/**
 * DEPENDENCY INJECTION (DI):
 * Pattern for providing dependencies to classes
 * Benefits:
 * - Loose coupling
 * - Easy testing (mock services)
 * - Code reuse
 * - Centralized configuration
 */

/**
 * DI Providers:
 * Different ways to provide dependencies
 */

// 1. Class provider (most common)
@Injectable({ providedIn: 'root' })
class LoggerService {}

// 2. Value provider
const loggerProvider = { provide: LoggerService, useValue: new LoggerService() };

// 3. Factory provider
const loggerFactory = { 
  provide: LoggerService, 
  useFactory: () => new LoggerService()
};

// 4. Alias provider
const aliasProvider = {
  provide: 'Logger',
  useExisting: LoggerService
};

/**
 * Service with Dependencies (Inject into Service)
 */

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private userService: UserService) {
    // UserService is injected into this service
  }
  
  fetchAndProcessUsers(): void {
    const users = this.userService.getUsers();
    console.log('Processing users:', users);
  }
}

// ============================================================
// 6. HTTP CLIENT & API INTEGRATION
// ============================================================

/**
 * HTTP Client:
 * Module for making HTTP requests to API servers.
 * Built on top of XMLHttpRequest.
 * Import in app.module.ts or main component:
 * import { HttpClientModule } from '@angular/common/http';
 * 
 * Standalone:
 * imports: [HttpClientModule]
 */

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * API Service: Best Practice
 * Create dedicated service for API calls
 */

interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://jsonplaceholder.typicode.com'; // REST API
  
  constructor(private http: HttpClient) {}
  
  /**
   * GET Request:
   * Retrieve data from server
   */
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`);
  }
  
  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/posts/${id}`);
  }
  
  /**
   * POST Request:
   * Send data to server (create resource)
   */
  createPost(post: Omit<Post, 'id'>): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/posts`, post);
  }
  
  /**
   * PUT Request:
   * Replace entire resource
   */
  updatePost(id: number, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/posts/${id}`, post);
  }
  
  /**
   * PATCH Request:
   * Partially update resource
   */
  partialUpdatePost(id: number, patch: Partial<Post>): Observable<Post> {
    return this.http.patch<Post>(`${this.apiUrl}/posts/${id}`, patch);
  }
  
  /**
   * DELETE Request:
   * Delete resource from server
   */
  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/posts/${id}`);
  }
  
  /**
   * Request with Headers
   */
  getPostsWithAuth(token: string): Observable<Post[]> {
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<Post[]>(`${this.apiUrl}/posts`, { headers });
  }
  
  /**
   * Request with Query Parameters
   */
  getPostsByUser(userId: number): Observable<Post[]> {
    const params = {
      userId: userId.toString()
    };
    return this.http.get<Post[]>(`${this.apiUrl}/posts`, { params });
  }
}

/**
 * Using HTTP Service in Component
 */

@Component({
  selector: 'app-posts',
  template: `
    <h1>Posts</h1>
    
    <!-- Loading state -->
    <p *ngIf="loading">Loading...</p>
    
    <!-- Error state -->
    <p *ngIf="error" style="color: red;">{{ error }}</p>
    
    <!-- Data display -->
    <div *ngIf="posts && !loading">
      <div *ngFor="let post of posts" class="post">
        <h3>{{ post.title }}</h3>
        <p>{{ post.content }}</p>
        <button (click)="deletePost(post.id)">Delete</button>
      </div>
    </div>
  `
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  loading = false;
  error: string | null = null;
  
  constructor(private apiService: ApiService) {}
  
  ngOnInit(): void {
    this.fetchPosts();
  }
  
  fetchPosts(): void {
    this.loading = true;
    this.error = null;
    
    this.apiService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load posts';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }
  
  deletePost(id: number): void {
    this.apiService.deletePost(id).subscribe({
      next: () => {
        // Remove from local list
        this.posts = this.posts.filter(p => p.id !== id);
      },
      error: (err) => {
        console.error('Delete failed:', err);
      }
    });
  }
}

/**
 * HTTP Interceptors:
 * Intercept HTTP requests/responses globally
 * Uses: authentication, logging, error handling
 */

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}
  
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get token from storage
    const token = localStorage.getItem('authToken');
    
    // Clone request and add token
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    
    // Pass modified request to next handler
    return next.handle(clonedReq);
  }
}

/**
 * Register Interceptor (in app.module.ts or main component):
 * providers: [
 *   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
 * ]
 */

// ============================================================
// 7. ROUTING & NAVIGATION
// ============================================================

/**
 * Routing:
 * Navigate between different components/pages
 * Uses URL to determine which component to display
 * SPA (Single Page Application) pattern
 */

/**
 * Route Configuration (app.routes.ts)
 */

import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  // Redirect to home
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  
  // Simple route
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  
  // Route with parameter
  {
    path: 'post/:id',
    component: PostDetailComponent
  },
  
  // Lazy loading module (loads only when needed)
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  
  // Nested routes (children)
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  },
  
  // Route with guard (check conditions before accessing)
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [AuthGuard]
  },
  
  // Wildcard route (must be last - for 404)
  { path: '**', component: NotFoundComponent }
];

/**
 * Components for routing
 */

@Component({ template: '<h1>Home</h1>' })
export class HomeComponent {}

@Component({ template: '<h1>About</h1>' })
export class AboutComponent {}

@Component({ template: '<h1>Not Found</h1>' })
export class NotFoundComponent {}

/**
 * Post Detail Component with Route Parameters
 */

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  template: `
    <h1>Post {{ postId }}</h1>
    <p *ngIf="post">{{ post.title }}</p>
  `
})
export class PostDetailComponent implements OnInit {
  postId: number | null = null;
  post: Post | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}
  
  ngOnInit(): void {
    // Get parameter from URL: /post/5
    this.route.params.subscribe(params => {
      this.postId = params['id'];
      if (this.postId) {
        this.apiService.getPost(this.postId).subscribe(post => {
          this.post = post;
        });
      }
    });
  }
}

/**
 * Navigation
 */

import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  template: `
    <button (click)="goHome()">Home</button>
    <button (click)="goToPost(5)">Post 5</button>
    <button (click)="goBack()">Back</button>
  `
})
export class NavigationComponent {
  constructor(private router: Router) {}
  
  goHome(): void {
    this.router.navigate(['/home']);
  }
  
  goToPost(id: number): void {
    // Navigate with parameters
    this.router.navigate(['/post', id]);
  }
  
  goBack(): void {
    // Go back in browser history
    window.history.back();
  }
}

/**
 * Route Guards:
 * Control access to routes based on conditions
 */

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  
  canActivate(): boolean {
    // Check if user is authenticated
    const isAuthenticated = !!localStorage.getItem('authToken');
    
    if (!isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    }
    
    return true;
  }
}

// ============================================================
// 8. FORMS (Template-Driven & Reactive)
// ============================================================

/**
 * Forms in Angular:
 * Two approaches:
 * 1. Template-Driven Forms: logic in template, simple
 * 2. Reactive Forms: logic in component, powerful
 * 
 * Reactive Forms preferred for complex forms
 */

/**
 * TEMPLATE-DRIVEN FORMS:
 * Use ngModel for two-way binding
 * Simpler but less control
 * Requires FormsModule
 */

@Component({
  selector: 'app-template-form',
  template: `
    <form (ngSubmit)="onSubmit()" #form="ngForm">
      <!-- Text input with validation -->
      <input
        name="name"
        [(ngModel)]="formData.name"
        required
        minlength="2"
        #nameField="ngModelGroup"
      />
      
      <!-- Show validation errors -->
      <div *ngIf="nameField.invalid && nameField.touched">
        <p *ngIf="nameField.errors?.['required']">Name is required</p>
        <p *ngIf="nameField.errors?.['minlength']">Min 2 characters</p>
      </div>
      
      <!-- Email with pattern -->
      <input
        name="email"
        type="email"
        [(ngModel)]="formData.email"
        required
      />
      
      <!-- Textarea -->
      <textarea
        name="message"
        [(ngModel)]="formData.message"
        required
      ></textarea>
      
      <!-- Select -->
      <select name="country" [(ngModel)]="formData.country">
        <option value="">Select Country</option>
        <option value="us">USA</option>
        <option value="uk">UK</option>
        <option value="ca">Canada</option>
      </select>
      
      <!-- Checkbox -->
      <input
        type="checkbox"
        name="agree"
        [(ngModel)]="formData.agree"
      />
      <label>I agree to terms</label>
      
      <!-- Radio buttons -->
      <input
        type="radio"
        name="gender"
        value="male"
        [(ngModel)]="formData.gender"
      />
      <label>Male</label>
      
      <!-- Submit button disabled when form invalid -->
      <button [disabled]="form.invalid" type="submit">
        Submit
      </button>
    </form>
  `,
  standalone: true,
  imports: [FormsModule]
})
export class TemplateFormComponent {
  formData = {
    name: '',
    email: '',
    message: '',
    country: '',
    agree: false,
    gender: ''
  };
  
  onSubmit(): void {
    console.log('Form submitted:', this.formData);
  }
}

/**
 * REACTIVE FORMS:
 * Powerful form handling with Form Builder
 * More control, better for complex forms
 * Requires ReactiveFormsModule
 */

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <!-- FormControl binding -->
      <input
        type="text"
        formControlName="name"
        placeholder="Name"
      />
      <div *ngIf="getControl('name')?.invalid && getControl('name')?.touched">
        <p>Name is required</p>
      </div>
      
      <!-- Email field -->
      <input
        type="email"
        formControlName="email"
        placeholder="Email"
      />
      <div *ngIf="getControl('email')?.invalid && getControl('email')?.touched">
        <p>Valid email required</p>
      </div>
      
      <!-- FormGroup for nested data (address) -->
      <div formGroupName="address">
        <input
          type="text"
          formControlName="street"
          placeholder="Street"
        />
        <input
          type="text"
          formControlName="city"
          placeholder="City"
        />
      </div>
      
      <!-- FormArray for dynamic fields (multiple phones) -->
      <div formArrayName="phones">
        <div *ngFor="let phone of getPhones().controls; let i = index">
          <input
            type="text"
            [formControlName]="i"
            placeholder="Phone {{ i + 1 }}"
          />
        </div>
      </div>
      <button type="button" (click)="addPhone()">Add Phone</button>
      
      <!-- Submit button -->
      <button type="submit" [disabled]="form.invalid">
        Submit
      </button>
    </form>
  `,
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class ReactiveFormComponent implements OnInit {
  form!: FormGroup;
  
  constructor(private fb: FormBuilder) {}
  
  ngOnInit(): void {
    this.initializeForm();
  }
  
  initializeForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required]
      }),
      phones: this.fb.array([
        this.fb.control('', Validators.required)
      ])
    });
  }
  
  getControl(name: string) {
    return this.form.get(name);
  }
  
  getPhones() {
    return this.form.get('phones') as any; // FormArray
  }
  
  addPhone(): void {
    this.getPhones().push(this.fb.control(''));
  }
  
  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form data:', this.form.value);
    }
  }
}

/**
 * Custom Validators
 */

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

function customValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    
    if (!value) {
      return null;
    }
    
    // Custom validation logic
    const isValid = value.length > 5;
    
    return isValid ? null : { customError: { value } };
  };
}

// Use in form:
// email: ['', [Validators.required, customValidator()]]

// ============================================================
// 9. RXJS & OBSERVABLES
// ============================================================

/**
 * RxJS:
 * Reactive Extensions for JavaScript
 * Handles asynchronous operations (HTTP, timers, events)
 * Key concepts:
 * - Observable: represents stream of data
 * - Operator: functions to transform observables
 * - Subscription: listen to observable
 * - Subject: observable that can emit values manually
 */

import { Subject, BehaviorSubject } from 'rxjs';

/**
 * Creating Observables
 */

// 1. Observable from HTTP
/*
this.http.get('/api/data')
*/

// 2. Observable from array
/*
of([1, 2, 3])
*/

// 3. Observable from event
/*
fromEvent(button, 'click')
*/

// 4. Create custom observable
const customObservable = new Observable(observer => {
  setTimeout(() => {
    observer.next('Data received');
  }, 1000);
  
  setTimeout(() => {
    observer.complete();
  }, 2000);
});

/**
 * Subjects:
 * Both observer and observable
 * Multicast: multiple subscribers get same value
 */

@Injectable({ providedIn: 'root' })
export class MessageService {
  // Subject: manually emit values
  private messageSubject = new Subject<string>();
  
  // BehaviorSubject: emits last value to new subscribers
  private userSubject = new BehaviorSubject<any>(null);
  
  // Observable (read-only view of subject)
  message$ = this.messageSubject.asObservable();
  user$ = this.userSubject.asObservable();
  
  // Emit new message
  sendMessage(msg: string): void {
    this.messageSubject.next(msg);
  }
  
  // Emit user data
  setUser(user: any): void {
    this.userSubject.next(user);
  }
}

/**
 * Subscribing to Observables
 */

@Component({
  selector: 'app-observable-demo',
  template: `
    <p>{{ data }}</p>
  `
})
export class ObservableDemoComponent implements OnInit, OnDestroy {
  data: string = '';
  private subscription: any;
  
  constructor(private messageService: MessageService) {}
  
  ngOnInit(): void {
    // Subscribe to observable
    this.subscription = this.messageService.message$.subscribe(
      (value) => {
        console.log('Message:', value);
        this.data = value;
      }
    );
  }
  
  ngOnDestroy(): void {
    // Important: Unsubscribe to prevent memory leaks
    this.subscription.unsubscribe();
  }
}

/**
 * RxJS Operators:
 * Functions to transform observables
 */

import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-operators-demo',
  template: `
    <input (keyup)="searchInput($event)" placeholder="Search..." />
    <ul>
      <li *ngFor="let result of searchResults">{{ result }}</li>
    </ul>
  `
})
export class OperatorsDemoComponent implements OnInit {
  private searchSubject = new Subject<string>();
  searchResults: string[] = [];
  
  constructor(private apiService: ApiService) {}
  
  ngOnInit(): void {
    this.searchSubject
      .pipe(
        // Wait 300ms after user stops typing
        debounceTime(300),
        
        // Only emit if value changed
        distinctUntilChanged(),
        
        // Map to API call
        switchMap(query => this.apiService.getPosts()),
        
        // Transform data
        map(posts => posts.map(p => p.title))
      )
      .subscribe(results => {
        this.searchResults = results;
      });
  }
  
  searchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchSubject.next(input.value);
  }
}

/**
 * Common RxJS Operators:
 * 
 * Transformation:
 * - map: transform values
 * - flatMap/switchMap: map to observable
 * - mergeMap: merge observables
 * 
 * Filtering:
 * - filter: keep values matching condition
 * - debounceTime: wait before emitting
 * - distinctUntilChanged: filter duplicate values
 * - take: take first N values
 * - takeWhile: take while condition true
 * 
 * Combination:
 * - combineLatest: combine multiple observables
 * - merge: merge multiple observables
 * - concat: concatenate observables
 * 
 * Error Handling:
 * - catchError: handle errors
 * - retry: retry failed observable
 */

// Example: Error handling with RxJS
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

this.apiService.getPosts()
  .pipe(
    catchError(error => {
      console.error('Error:', error);
      return of([]); // Return empty array on error
    })
  )
  .subscribe(posts => {
    console.log('Posts:', posts);
  });

/**
 * Async Pipe:
 * Automatically subscribe to observable in template
 * Automatically unsubscribe (no memory leak)
 * Marks component for change detection
 */

@Component({
  selector: 'app-async-pipe-demo',
  template: `
    <!-- Async pipe subscribes automatically -->
    <p>{{ data$ | async }}</p>
    
    <!-- Can bind to form -->
    <input [(ngModel)]="value$ | async" />
  `
})
export class AsyncPipeDemoComponent {
  data$ = new Observable<string>(observer => {
    setTimeout(() => observer.next('Data loaded'), 1000);
  });
  
  value$ = new BehaviorSubject<string>('Initial value');
}

// ============================================================
// 10. PIPES
// ============================================================

/**
 * Pipes:
 * Transform data in templates
 * Syntax: {{ value | pipeName }}
 * Multiple pipes can be chained: {{ value | pipe1 | pipe2 }}
 * Read-only, not used for state changes
 */

/**
 * Built-in Pipes
 */

@Component({
  selector: 'app-pipes-demo',
  template: `
    <!-- String pipes -->
    <p>{{ 'hello' | uppercase }}</p>           <!-- HELLO -->
    <p>{{ 'HELLO' | lowercase }}</p>           <!-- hello -->
    <p>{{ message | slice:0:5 }}</p>           <!-- First 5 chars -->
    
    <!-- Number pipes -->
    <p>{{ 3.14159 | number:'1.2-2' }}</p>      <!-- 3.14 -->
    <p>{{ 0.25 | percent }}</p>                <!-- 25% -->
    <p>{{ 1000 | currency:'USD' }}</p>         <!-- \$1,000 -->
    
    <!-- Date pipes -->
    <p>{{ today | date }}</p>                   <!-- Jan 1, 2024 -->
    <p>{{ today | date:'short' }}</p>          <!-- 1/1/24 -->
    <p>{{ today | date:'medium' }}</p>         <!-- Jan 1, 2024, 1:00 PM -->
    <p>{{ today | date:'yyyy-MM-dd HH:mm' }}</p> <!-- 2024-01-01 13:00 -->
    
    <!-- Boolean to string pipe -->
    <p>{{ isActive | json }}</p>               <!-- true -->
    
    <!-- Object to JSON -->
    <p>{{ user | json }}</p>                   <!-- { "name": "John" } -->
    
    <!-- Array to comma-separated -->
    <p>{{ items | join:',' }}</p>              <!-- Custom pipe -->
  `,
  standalone: true,
  imports: [CommonModule] // Needed for pipes
})
export class PipesDemoComponent {
  today = new Date();
  message = 'Angular Pipes';
  isActive = true;
  user = { name: 'John', age: 30 };
  items = ['Apple', 'Banana', 'Orange'];
}

/**
 * Custom Pipe
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join',
  standalone: true
})
export class JoinPipe implements PipeTransform {
  transform(value: any[], separator: string = ', '): string {
    if (!value) return '';
    return value.join(separator);
  }
}

/**
 * Custom Pipe for Currency Conversion
 */

@Pipe({
  name: 'convertCurrency',
  standalone: true
})
export class ConvertCurrencyPipe implements PipeTransform {
  transform(value: number, fromCurrency: string, toCurrency: string): string {
    // Simple exchange rates (in production, use real API)
    const rates: any = {
      'USD': 1,
      'EUR': 0.92,
      'GBP': 0.79
    };
    
    const converted = (value / rates[fromCurrency]) * rates[toCurrency];
    return `${converted.toFixed(2)} ${toCurrency}`;
  }
}

/**
 * Using custom pipe:
 * {{ 100 | convertCurrency:'USD':'EUR' }}  <!-- 92.00 EUR -->
 */

// ============================================================
// 11. DECORATORS & METADATA
// ============================================================

/**
 * Decorators:
 * Special declarations that attach metadata/behavior to classes/methods
 * Angular uses decorators extensively
 * Note: Requires "experimentalDecorators": true in tsconfig.json
 */

/**
 * Class Decorators (already covered):
 * @Component, @Injectable, @Directive, @Pipe, @NgModule
 */

/**
 * Property Decorators:
 * @Input, @Output, @ViewChild, @ViewChildren, @ContentChild, @ContentChildren
 * (Already covered: @Input, @Output)
 */

/**
 * @ViewChild/@ViewChildren:
 * Access child component or template element from parent component
 */

@Component({
  selector: 'app-view-child-demo',
  template: `
    <input #myInput type="text" />
    <button (click)="focusInput()">Focus Input</button>
    
    <app-counter #counter></app-counter>
    <button (click)="increment()">Increment Counter</button>
  `
})
export class ViewChildDemoComponent {
  // Access template element
  @ViewChild('myInput')
  inputElement!: ElementRef;
  
  // Access component
  @ViewChild(CounterComponent)
  counterComponent!: CounterComponent;
  
  focusInput(): void {
    this.inputElement.nativeElement.focus();
  }
  
  increment(): void {
    this.counterComponent.onIncrement();
  }
}

/**
 * @ContentChild/@ContentChildren:
 * Access content projected into component
 */

@Component({
  selector: 'app-card',
  template: `
    <div class="card-header">
      <ng-content #header select="[card-title]"></ng-content>
    </div>
    <div class="card-body">
      <ng-content></ng-content>
    </div>
  `
})
export class CardComponent {
  @ContentChild('header')
  headerElement!: any;
}

// ============================================================
// 12. STATE MANAGEMENT
// ============================================================

/**
 * State Management:
 * Handle application state (data) consistently
 * Approaches:
 * 1. Services with Subjects (simple apps)
 * 2. NgRx (complex apps, predictable with Redux pattern)
 * 3. Akita (simpler alternative to NgRx)
 */

/**
 * Simple State Service with Subject
 */

interface AppState {
  user: any;
  posts: any[];
  loading: boolean;
  error: string | null;
}

@Injectable({ providedIn: 'root' })
export class StateService {
  private initialState: AppState = {
    user: null,
    posts: [],
    loading: false,
    error: null
  };
  
  private stateSubject = new BehaviorSubject<AppState>(this.initialState);
  state$ = this.stateSubject.asObservable();
  
  constructor() {}
  
  // Selectors: get specific parts of state
  getUser$() {
    return this.state$.pipe(map(state => state.user));
  }
  
  getPosts$() {
    return this.state$.pipe(map(state => state.posts));
  }
  
  isLoading$() {
    return this.state$.pipe(map(state => state.loading));
  }
  
  // Actions: update state
  setLoading(loading: boolean): void {
    const currentState = this.stateSubject.value;
    this.stateSubject.next({ ...currentState, loading });
  }
  
  setUser(user: any): void {
    const currentState = this.stateSubject.value;
    this.stateSubject.next({ ...currentState, user });
  }
  
  setPosts(posts: any[]): void {
    const currentState = this.stateSubject.value;
    this.stateSubject.next({ ...currentState, posts });
  }
  
  setError(error: string | null): void {
    const currentState = this.stateSubject.value;
    this.stateSubject.next({ ...currentState, error });
  }
}

/**
 * Using State Service
 */

@Component({
  selector: 'app-with-state',
  template: `
    <p *ngIf="loading$ | async">Loading...</p>
    <p *ngIf="error$ | async as error">{{ error }}</p>
    
    <ul>
      <li *ngFor="let post of (posts$ | async)">
        {{ post.title }}
      </li>
    </ul>
  `
})
export class WithStateComponent implements OnInit {
  posts$ = this.stateService.getPosts$();
  loading$ = this.stateService.isLoading$();
  error$ = this.stateService.state$.pipe(map(s => s.error));
  
  constructor(
    private stateService: StateService,
    private apiService: ApiService
  ) {}
  
  ngOnInit(): void {
    this.loadPosts();
  }
  
  loadPosts(): void {
    this.stateService.setLoading(true);
    
    this.apiService.getPosts().subscribe({
      next: (posts) => {
        this.stateService.setPosts(posts);
        this.stateService.setLoading(false);
      },
      error: (err) => {
        this.stateService.setError('Failed to load posts');
        this.stateService.setLoading(false);
      }
    });
  }
}

// ============================================================
// 13. TESTING
// ============================================================

/**
 * Testing in Angular:
 * Framework: Jasmine (test framework)
 * Runner: Karma (test runner)
 * Commands:
 * $ ng test (run tests in watch mode)
 * $ ng test --code-coverage (generate coverage report)
 */

/**
 * Test Structure:
 * describe: group related tests
 * it: individual test
 * beforeEach: setup before each test
 * afterEach: cleanup after each test
 */

import { TestBed } from '@angular/core/testing';

describe('UserService', () => {
  let service: UserService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });
  
  // Unit test
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should add user', () => {
    const user = { id: 1, name: 'John' };
    service.addUser(user);
    expect(service.getUsers()).toContain(user);
  });
  
  it('should delete user', () => {
    const user = { id: 1, name: 'John' };
    service.addUser(user);
    service.deleteUser(1);
    expect(service.getUsers().length).toBe(0);
  });
});

/**
 * Component Testing
 */

import { ComponentFixture } from '@angular/core/testing';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterComponent ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Initial change detection
  });
  
  it('should increment count', () => {
    component.count = 0;
    component.onIncrement();
    expect(component.count).toBe(1);
  });
  
  it('should emit countChanged event', () => {
    spyOn(component.countChanged, 'emit');
    component.count = 5;
    component.onIncrement();
    expect(component.countChanged.emit).toHaveBeenCalledWith(6);
  });
});

/**
 * Mock Services in Tests
 */

describe('PostsComponent with Mock API', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let mockApiService: any;
  
  beforeEach(async () => {
    mockApiService = {
      getPosts: jasmine.createSpy('getPosts').and.returnValue(
        of([
          { id: 1, title: 'Post 1' },
          { id: 2, title: 'Post 2' }
        ])
      )
    };
    
    await TestBed.configureTestingModule({
      declarations: [ PostsComponent ],
      providers: [
        { provide: ApiService, useValue: mockApiService }
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
  });
  
  it('should load posts on init', () => {
    fixture.detectChanges();
    expect(mockApiService.getPosts).toHaveBeenCalled();
    expect(component.posts.length).toBe(2);
  });
});

// ============================================================
// 14. SECURITY BEST PRACTICES
// ============================================================

/**
 * Security in Angular:
 * Angular provides built-in security features
 * But developers must still follow best practices
 */

/**
 * 1. XSS (Cross-Site Scripting) Prevention:
 * Angular sanitizes values by default
 * Use DomSanitizer for trusted content
 */

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-xss-demo',
  template: `
    <!-- Automatically escaped (safe from XSS) -->
    <p>{{ userInput }}</p>
    
    <!-- For trusted HTML -->
    <div [innerHTML]="trustedHtml"></div>
  `
})
export class XssDemoComponent {
  userInput = '<script>alert("XSS")</script>';
  trustedHtml: SafeHtml;
  
  constructor(private sanitizer: DomSanitizer) {
    this.trustedHtml = this.sanitizer.sanitize(1, '<b>Bold text</b>') || '';
  }
}

/**
 * 2. CSRF (Cross-Site Request Forgery) Protection:
 * Angular automatically adds CSRF token to HTTP requests
 * Configure token name in HTTP interceptor if needed
 */

import { HttpClientXsrfModule } from '@angular/common/http';

// In app.module.ts:
// imports: [HttpClientXsrfModule.withOptions({
//   cookieName: 'XSRF-TOKEN',
//   headerName: 'X-XSRF-TOKEN'
// })]

/**
 * 3. Authentication & Authorization:
 * Implement login, store token securely, send in requests
 */

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user$ = new BehaviorSubject<any>(null);
  
  constructor(private http: HttpClient) {
    // Check if user logged in on app start
    this.checkAuth();
  }
  
  private checkAuth(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Verify token validity
      this.http.get('/api/auth/verify').subscribe(
        user => this.user$.next(user)
      );
    }
  }
  
  login(email: string, password: string): Observable<any> {
    return this.http.post('/api/auth/login', { email, password }).pipe(
      tap((response: any) => {
        // Store token
        localStorage.setItem('authToken', response.token);
        this.user$.next(response.user);
      })
    );
  }
  
  logout(): void {
    localStorage.removeItem('authToken');
    this.user$.next(null);
  }
  
  getUser$(): Observable<any> {
    return this.user$;
  }
}

/**
 * 4. Content Security Policy (CSP):
 * Configure in index.html or on server
 */

// In index.html:
// <meta http-equiv="Content-Security-Policy" 
//   content="default-src 'self'; script-src 'self'">

/**
 * 5. HTTPS:
 * Always use HTTPS in production
 * Never transmit sensitive data over HTTP
 */

/**
 * 6. Input Validation:
 * Always validate and sanitize user input
 * Both client-side and server-side
 */

// ============================================================
// 15. PERFORMANCE OPTIMIZATION
// ============================================================

/**
 * Performance Optimization:
 * Strategies to improve Angular application speed
 */

/**
 * 1. Change Detection:
 * Strategy: OnPush for performance
 * Use when only @Input properties change
 */

@Component({
  selector: 'app-onpush-demo',
  template: `<p>{{ data }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnPushDemoComponent {
  @Input() data: string = '';
}

/**
 * 2. Lazy Loading:
 * Load modules only when needed
 * Reduces initial bundle size
 */

export const lazyRoutes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module')
      .then(m => m.AdminModule)
  }
];

/**
 * 3. Code Splitting:
 * Use separate bundles for features
 */

/**
 * 4. Pure Pipes:
 * Pipes are pure by default
 * Set pure: false only if necessary (performance cost)
 */

@Pipe({
  name: 'expensiveTransform',
  pure: false  // Pipes run on every change detection (expensive!)
})
export class ExpensiveTransformPipe implements PipeTransform {
  transform(value: any): any {
    // Expensive operation
    return value;
  }
}

/**
 * 5. OnPush Change Detection Strategy:
 * Manual change detection for parent component
 */

import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-manual-detection',
  template: `<p>{{ count }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManualDetectionComponent {
  count = 0;
  
  constructor(private cdr: ChangeDetectorRef) {}
  
  increment(): void {
    this.count++;
    // Manually trigger change detection
    this.cdr.markForCheck();
  }
}

/**
 * 6. Unsubscribe Pattern:
 * Prevent memory leaks by unsubscribing
 */

@Component({
  selector: 'app-unsubscribe-demo',
  template: `<p>{{ data }}</p>`
})
export class UnsubscribeDemoComponent implements OnInit, OnDestroy {
  data: string = '';
  private subscription: any;
  
  constructor(private service: DataService) {}
  
  ngOnInit(): void {
    this.subscription = this.service.getData().subscribe(
      value => this.data = value
    );
  }
  
  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leak
    this.subscription.unsubscribe();
  }
}

/**
 * Better: Use takeUntil pattern
 */

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-take-until-demo',
  template: `<p>{{ data }}</p>`
})
export class TakeUntilDemoComponent implements OnInit, OnDestroy {
  data: string = '';
  private destroy$ = new Subject<void>();
  
  constructor(private service: DataService) {}
  
  ngOnInit(): void {
    this.service.getData()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(value => this.data = value);
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

/**
 * Even better: Use async pipe (automatic unsubscribe)
 */

@Component({
  selector: 'app-async-unsubscribe',
  template: `<p>{{ (service.getData() | async) }}</p>`
})
export class AsyncUnsubscribeComponent {
  constructor(public service: DataService) {}
}

/**
 * 7. Production Build:
 * ng build --configuration production
 * Enables:
 * - AOT compilation (Ahead-of-Time)
 * - Minification
 * - Tree-shaking
 * - Source maps stripping
 */

/**
 * 8. Monitoring Performance:
 * Use Angular DevTools Extension
 * Check:
 * - Component initialization time
 * - Change detection cycles
 * - Memory usage
 * - Bundle size
 */

// ============================================================
// 16. ADVANCED PATTERNS & REAL-WORLD EXAMPLES
// ============================================================

/**
 * Container & Presentation Component Pattern:
 * Separation of concerns
 * Container: handles logic, data, subscriptions
 * Presentation: receives data via @Input, emits events via @Output
 */

// Presentation Component (Dumb Component)
@Component({
  selector: 'app-user-list-view',
  template: `
    <div *ngFor="let user of users">
      <p>{{ user.name }}</p>
      <button (click)="onDelete(user.id)">Delete</button>
    </div>
  `
})
export class UserListViewComponent {
  @Input() users: any[] = [];
  @Output() delete = new EventEmitter<number>();
  
  onDelete(id: number): void {
    this.delete.emit(id);
  }
}

// Container Component (Smart Component)
@Component({
  selector: 'app-user-list-container',
  template: `
    <app-user-list-view
      [users]="users"
      (delete)="deleteUser($event)"
    ></app-user-list-view>
  `
})
export class UserListContainerComponent implements OnInit {
  users: any[] = [];
  
  constructor(
    private userService: UserService,
    private apiService: ApiService
  ) {}
  
  ngOnInit(): void {
    this.loadUsers();
  }
  
  loadUsers(): void {
    this.apiService.getUsers().subscribe(
      users => this.users = users
    );
  }
  
  deleteUser(id: number): void {
    this.apiService.deleteUser(id).subscribe(
      () => {
        this.users = this.users.filter(u => u.id !== id);
      }
    );
  }
}

/**
 * Resolver Pattern:
 * Pre-fetch data before component loads
 * Prevents loading state in component template
 */

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostResolver implements Resolve<Post> {
  constructor(private apiService: ApiService) {}
  
  resolve(route: ActivatedRouteSnapshot): Observable<Post> {
    const id = route.params['id'];
    return this.apiService.getPost(id);
  }
}

// Use in route:
// {
//   path: 'post/:id',
//   component: PostDetailComponent,
//   resolve: { post: PostResolver }
// }

// In component:
@Component({
  selector: 'app-post-with-resolver',
  template: `<h1>{{ post.title }}</h1>`
})
export class PostWithResolverComponent implements OnInit {
  post!: Post;
  
  constructor(private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    // Data is already loaded via resolver
    this.route.data.subscribe((data: any) => {
      this.post = data.post;
    });
  }
}

/**
 * Facade Pattern:
 * Simplify complex interactions behind simple interface
 */

@Injectable({
  providedIn: 'root'
})
export class UserFacade {
  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private authService: AuthService
  ) {}
  
  // Simplified methods that handle complex logic
  loginAndLoadProfile(email: string, password: string): Observable<any> {
    return this.authService.login(email, password).pipe(
      switchMap(() => this.apiService.getUser(email))
    );
  }
  
  registerAndAutoLogin(userData: any): Observable<any> {
    return this.apiService.register(userData).pipe(
      switchMap(user => this.authService.login(user.email, userData.password))
    );
  }
}

/**
 * Higher-Order Component (Function composition)
 * Add behavior to component without modifying it
 */

function withLoadingIndicator(
  Component: any
): any {
  @Component({
    selector: 'app-with-loading',
    template: `
      <p *ngIf="loading">Loading...</p>
      <app-original *ngIf="!loading" [data]="data"></app-original>
    `
  })
  class WithLoadingComponent {
    loading = true;
    data: any;
    
    ngOnInit(): void {
      // Load data, set loading = false
    }
  }
  
  return WithLoadingComponent;
}

// ============================================================
// BEST PRACTICES SUMMARY
// ============================================================

/**
 * Angular Best Practices:
 * 
 * 1. ARCHITECTURE
 *    - Organize by feature (feature modules)
 *    - Separate concerns (container vs presentation)
 *    - Service for business logic
 * 
 * 2. COMPONENTS
 *    - Keep components focused (single responsibility)
 *    - Use @Input/@Output for communication
 *    - Implement OnDestroy for cleanup
 * 
 * 3. CHANGE DETECTION
 *    - Use OnPush strategy when possible
 *    - Unsubscribe or use async pipe
 *    - Avoid heavy operations in templates
 * 
 * 4. FORMS
 *    - Use Reactive Forms for complex forms
 *    - Implement custom validators
 *    - Show validation errors clearly
 * 
 * 5. SERVICES
 *    - Single responsibility principle
 *    - Use dependency injection
 *    - Use BehaviorSubject for state
 * 
 * 6. HTTP
 *    - Create dedicated API service
 *    - Use interceptors for common headers/errors
 *    - Handle errors properly
 * 
 * 7. ROUTING
 *    - Lazy load feature modules
 *    - Use route guards for protection
 *    - Use resolvers for pre-fetching data
 * 
 * 8. RXJS
 *    - Unsubscribe in ngOnDestroy
 *    - Use takeUntil or async pipe
 *    - Avoid nested subscriptions (use operators)
 * 
 * 9. TESTING
 *    - Write unit tests for services
 *    - Write integration tests for components
 *    - Use TestBed for component testing
 *    - Mock external dependencies
 * 
 * 10. SECURITY
 *     - Never trust user input
 *     - Use HTTPS always
 *     - Implement authentication properly
 *     - Use Angular's built-in sanitization
 * 
 * 11. PERFORMANCE
 *     - Use OnPush change detection
 *     - Lazy load modules
 *     - Use trackBy in *ngFor
 *     - Optimize large lists with virtual scrolling
 * 
 * 12. NAMING CONVENTIONS
 *     - Components: app-feature.component.ts
 *     - Services: feature.service.ts
 *     - Modules: feature.module.ts
 *     - Directives: custom-directive.directive.ts
 *     - Pipes: custom-pipe.pipe.ts
 */

// ============================================================
// END OF COMPREHENSIVE ANGULAR 15 GUIDE
// ============================================================
