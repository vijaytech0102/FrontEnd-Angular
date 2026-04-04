/**
 * ===================================================================
 * ANGULAR 15 - THEORY, CONCEPTS & ARCHITECTURE GUIDE
 * ===================================================================
 * 
 * This comprehensive guide covers the theoretical foundations of Angular 15,
 * explaining WHY things work the way they do, the design patterns used,
 * and the principles that guide Angular development.
 * 
 * Understanding the theory is crucial for:
 * - Writing maintainable and scalable applications
 * - Making informed architectural decisions
 * - Debugging complex issues
 * - Collaborating effectively with teams
 * - Building professional-grade applications
 * 
 * Sections:
 * 1. What is Angular? - Philosophy & Goals
 * 2. Angular Architecture - Core Concepts
 * 3. Component Theory - Building Blocks
 * 4. Data Binding Theory - How Data Flows
 * 5. Dependency Injection Theory - IoC & DI Patterns
 * 6. RxJS & Reactive Programming Theory
 * 7. Change Detection Strategy - Deep Dive
 * 8. Routing Architecture - Navigation Theory
 * 9. Module System - Organization & Boundaries
 * 10. Security Theory - Protecting Applications
 * 11. Performance Theory - Optimization Principles
 * 12. Design Patterns in Angular
 * 13. SOLID Principles in Angular
 * 14. TypeScript in Angular Context
 * ===================================================================
 */

// ============================================================
// 1. WHAT IS ANGULAR? - PHILOSOPHY & GOALS
// ============================================================

/**
 * DEFINITION:
 * Angular is a complete, full-featured framework for building
 * Single Page Applications (SPAs) with TypeScript/JavaScript.
 * 
 * It's a framework, not a library. This means it provides:
 * - Complete toolkit (routing, forms, HTTP, etc.)
 * - Clear architectural patterns
 * - Opinionated structure
 * - Built-in best practices
 * 
 * KEY DISTINCTION:
 * Library (React, Vue):
 *   - Focused on VIEW layer
 *   - You choose other tools (routing, state, HTTP)
 *   - More flexible, requires more decisions
 *   - Lighter weight
 * 
 * Framework (Angular):
 *   - Provides complete solution
 *   - Integrated ecosystem
 *   - Opinionated structure
 *   - Steeper learning curve, but clear path
 * 
 * ANGULAR'S PHILOSOPHY:
 * "Building applications is complex. Angular makes it simple."
 * 
 * Goals:
 * 1. Typescript-first: Full type safety from ground up
 * 2. Dependency Injection: Loose coupling, easy testing
 * 3. Reactive: Embrace RxJS for asynchronous operations
 * 4. Scalable: Architecture for large enterprise apps
 * 5. Performance: Optimization built into framework
 * 6. Security: Protection against common vulnerabilities
 * 
 * 
 * WHO USES ANGULAR?
 * - Google (creator)
 * - Large enterprises (banks, insurance, telecom)
 * - Complex applications requiring type safety
 * - Teams that need scalability and structure
 * 
 * NOT IDEAL FOR:
 * - Small projects/widgets
 * - Rapid prototyping
 * - When you need flexibility to mix tools
 * - Simple static sites
 */

// ============================================================
// 2. ANGULAR ARCHITECTURE - CORE CONCEPTS
// ============================================================

/**
 * ARCHITECTURE OVERVIEW:
 * Angular implements a layered architecture pattern.
 * 
 * LAYERS (from top to bottom):
 * 
 * ┌─────────────────────────────────────────────────┐
 * │            PRESENTATION LAYER                   │
 * │  ┌─────────────────────────────────────────┐    │
 * │  │  Components (Containers & Presenters)   │    │
 * │  │  - Handle UI rendering                  │    │
 * │  │  - Respond to user interactions         │    │
 * │  │  - Display data                         │    │
 * │  └─────────────────────────────────────────┘    │
 * │            │                                    │
 * │            ▼ Dependency Injection               │
 * └─────────────────────────────────────────────────┘
 *              │
 *              ▼
 * ┌─────────────────────────────────────────────────┐
 * │            BUSINESS LOGIC LAYER                 │
 * │  ┌─────────────────────────────────────────┐    │
 * │  │  Services                               │    │
 * │  │  - Business logic                       │    │
 * │  │  - Data manipulation                    │    │
 * │  │  - API communication                    │    │
 * │  │  - Cross-component communication        │    │
 * │  └─────────────────────────────────────────┘    │
 * │            │                                    │
 * │            ▼ Dependency Injection               │
 * └─────────────────────────────────────────────────┘
 *              │
 *              ▼
 * ┌─────────────────────────────────────────────────┐
 * │            DATA ACCESS LAYER                    │
 * │  ┌─────────────────────────────────────────┐    │
 * │  │  HTTP Client / API Services             │    │
 * │  │  - HTTP requests                        │    │
 * │  │  - Data fetching                        │    │
 * │  │  - Server communication                 │    │
 * │  └─────────────────────────────────────────┘    │
 * │            │                                    │
 * │            ▼ RxJS Observables                  │
 * └─────────────────────────────────────────────────┘
 *              │
 *              ▼
 * ┌─────────────────────────────────────────────────┐
 * │            EXTERNAL LAYER                       │
 * │  ┌─────────────────────────────────────────┐    │
 * │  │  HTTP Server / Database                 │    │
 * │  │  - Business data                        │    │
 * │  │  - Persistent storage                   │    │
 * │  └─────────────────────────────────────────┘    │
 * └─────────────────────────────────────────────────┘
 * 
 * 
 * KEY ARCHITECTURAL PRINCIPLES:
 * 
 * 1. SEPARATION OF CONCERNS
 *    Each layer has distinct responsibility
 *    Components don't directly access HTTP
 *    Services don't handle UI
 *    This makes code:
 *    - Testable (mock each layer independently)
 *    - Maintainable (changes in one layer don't affect others)
 *    - Reusable (services can be used by multiple components)
 * 
 * 2. DEPENDENCY INJECTION (DI)
 *    Classes don't create their own dependencies
 *    Dependencies are "injected" from outside
 *    Enables:
 *    - Loose coupling between classes
 *    - Easy testing (inject mocks)
 *    - Flexible configuration
 * 
 * 3. REACTIVE PROGRAMMING
 *    Use RxJS Observables for async operations
 *    Data flows through pipelines of operators
 *    Benefits:
 *    - Handle multiple async operations elegantly
 *    - Automatic subscription cleanup
 *    - Composable transformations
 * 
 * 4. UNIDIRECTIONAL DATA FLOW
 *    Data flows down through @Input properties
 *    Events flow up through @Output properties
 *    No circular dependencies
 *    Easier to predict data flow
 * 
 * COMPARISON WITH OTHER PATTERNS:
 * 
 * MVC (Model-View-Controller):
 *   Model: Data and logic
 *   View: Presentation
 *   Controller: Handles input and updates model
 *   Angular is more like: Model (Services) → View (Components) → Events
 * 
 * MVVM (Model-View-ViewModel):
 *   ViewModel: Exposes data/commands for view
 *   Angular Components are like ViewModels
 * 
 * MVP (Model-View-Presenter):
 *   Presenter: Handles all view logic
 *   Angular: Components handle presentation, Services handle logic
 */

// ============================================================
// 3. COMPONENT THEORY - BUILDING BLOCKS
// ============================================================

/**
 * WHAT IS A COMPONENT?
 * 
 * A component is the fundamental building block of Angular applications.
 * It's a class that manages a template and associated styles.
 * 
 * Components follow the COMPONENT ARCHITECTURE PATTERN:
 * 
 * ┌────────────────────────────────┐
 * │       COMPONENT CLASS          │
 * │  (TypeScript class)            │
 * │  - Properties (state)          │
 * │  - Methods (behavior)          │
 * │  - Lifecycle hooks             │
 * └─────────────┬──────────────────┘
 *               │
 *    ┌──────────┼──────────┐
 *    ▼          ▼          ▼
 * ┌──────┐  ┌─────────┐  ┌──────┐
 * │ View │  │ Styles  │  │ Data │
 * │(HTML)│  │ (CSS)   │  │      │
 * └──────┘  └─────────┘  └──────┘
 * 
 * 
 * WHY COMPONENTS?
 * 
 * Modern web development principle: COMPOSITION
 * 
 * Instead of building ONE LARGE APPLICATION,
 * build SMALL REUSABLE COMPONENTS that compose together.
 * 
 * Benefits:
 * 1. Reusability: Use component in multiple places
 * 2. Encapsulation: Component manages its own state
 * 3. Composability: Build complex UIs from simple pieces
 * 4. Testability: Easy to test in isolation
 * 5. Maintainability: Changes isolated to component
 * 6. Scalability: Scale from small to large apps
 * 
 * 
 * COMPONENT LIFECYCLE:
 * Angular manages component lifecycle - it creates, updates, and destroys them.
 * 
 * TIMELINE:
 * Time →
 * 
 * 1. Create Instance (constructor)
 *    └─ Memory allocated, dependencies injected
 * 
 * 2. Initialize (@Input values available)
 *    └─ ngOnInit() - setup data, fetch from API
 * 
 * 3. Detect Changes
 *    └─ ngOnChanges() - @Input properties changed
 *    └─ ngDoCheck() - custom change detection
 * 
 * 4. Render View
 *    └─ Template compiled and rendered to DOM
 *    └─ ngAfterViewInit() - @ViewChild elements ready
 * 
 * 5. Handle User Interactions
 *    └─ Event methods called
 *    └─ Change detection runs
 *    └─ View updates
 * 
 * 6. Destroy
 *    └─ ngOnDestroy() - cleanup (unsubscribe, clear timers)
 *    └─ Component removed from DOM
 *    └─ Memory freed
 * 
 * 
 * COMPONENT COMMUNICATION PATTERNS:
 * 
 * Pattern 1: PARENT → CHILD (@Input)
 *   ┌─────────────────┐
 *   │  Parent         │ Passes data to child
 *   │  [data]="value" │ via property binding
 *   │  ↓              │
 *   │ <Child ...>     │
 *   │ Child uses data │
 *   └─────────────────┘
 *   
 *   Why: Data flows down from parent (source of truth)
 * 
 * 
 * Pattern 2: CHILD → PARENT (@Output)
 *   ┌─────────────────┐
 *   │  Parent         │
 *   │  (countChanged) │
 *   │     ▲           │
 *   │     │           │ Child notifies parent
 *   │  Counter        │ of events
 *   │  @Output()      │
 *   │  .emit()        │
 *   └─────────────────┘
 *   
 *   Why: Child doesn't change parent data directly (unidirectional)
 * 
 * 
 * Pattern 3: SIBLING to SIBLING (via Service)
 *   ┌─────────────────────────────────┐
 *   │  Parent                         │
 *   │  ┌───────────────────────────┐  │
 *   │  │ Child A      Child B       │  │
 *   │  │  │            ▲            │  │
 *   │  │  └────────────────────────►   │  Communicate via
 *   │  │         Service                │  shared service
 *   │  │ (Subjects/Observables)        │
 *   │  └───────────────────────────┘  │
 *   └─────────────────────────────────┘
 *   
 *   Why: Siblings don't know about each other
 * 
 * 
 * COMPONENT HIERARCHY IN REAL APP:
 * 
 * ┌─────────────────────────────────────┐
 * │        AppComponent (Root)          │
 * │                                     │
 * │  ┌──────────────────────────────┐   │
 * │  │    HeaderComponent           │   │
 * │  │    (Navigation)              │   │
 * │  └──────────────────────────────┘   │
 * │                                     │
 * │  ┌──────────────────────────────┐   │
 * │  │    SidebarComponent          │   │
 * │  │    (Menu)                    │   │
 * │  └──────────────────────────────┘   │
 * │                                     │
 * │  ┌──────────────────────────────┐   │
 * │  │    ContentComponent          │   │
 * │  │                              │   │
 * │  │  ┌──────────────────────┐    │   │
 * │  │  │ ListComponent        │    │   │
 * │  │  │  ┌────────────────┐  │    │   │
 * │  │  │  │ ItemComponent  │  │    │   │
 * │  │  │  │ (reusable)     │  │    │   │
 * │  │  │  └────────────────┘  │    │   │
 * │  │  └──────────────────────┘    │   │
 * │  │                              │   │
 * │  │  ┌──────────────────────┐    │   │
 * │  │  │ DetailsComponent     │    │   │
 * │  │  └──────────────────────┘    │   │
 * │  └──────────────────────────────┘   │
 * │                                     │
 * │  ┌──────────────────────────────┐   │
 * │  │    FooterComponent           │   │
 * │  │    (Copyright info)          │   │
 * │  └──────────────────────────────┘   │
 * └─────────────────────────────────────┘
 */

// ============================================================
// 4. DATA BINDING THEORY - HOW DATA FLOWS
// ============================================================

/**
 * DATA BINDING FUNDAMENTALS:
 * 
 * Data binding is the CONNECTION between component's data
 * and what's displayed on screen.
 * 
 * Without data binding (plain JavaScript DOM):
 * 
 *   const element = document.getElementById('counter');
 *   element.textContent = count;
 *   
 *   // One-way synchronization: manual and error-prone
 *   // If data changes, manually update DOM
 *   // If DOM changes, manually update data
 * 
 * With Angular data binding:
 * 
 *   <p>{{ count }}</p>
 *   
 *   // Automatic synchronization
 *   // Template always reflects component state
 * 
 * 
 * TYPES OF DATA BINDING:
 * 
 * 1. INTERPOLATION {{ expression }}
 *    Direction: Component → Template (ONE-WAY)
 *    
 *    <h1>{{ title }}</h1>
 *    
 *    Technically:
 *    - Angular evaluates expression in component context
 *    - Converts to string
 *    - Updates DOM element text
 *    - On change detection, re-evaluates and updates if changed
 *    
 *    Use when: Converting data to display format
 * 
 * 
 * 2. PROPERTY BINDING [property]="value"
 *    Direction: Component → Template (ONE-WAY)
 *    
 *    <button [disabled]="!isEnabled">Submit</button>
 *    
 *    Key difference from interpolation:
 *    - Sets DOM property, not text content
 *    - Syntax: [ ] square brackets
 *    - Property must exist on element/component
 *    
 *    Example:
 *    <input [value]="name"> - sets input.value property
 *    <img [src]="imageUrl"> - sets img.src property
 *    
 *    Why not HTML attributes?
 *    - Properties are what JavaScript sees
 *    - Attributes are what HTML sees
 *    - Property = live representation, Attribute = initial value
 *    
 *    Use when: Setting element properties, component @Input
 * 
 * 
 * 3. EVENT BINDING (event)="handler()"
 *    Direction: Template → Component (ONE-WAY)
 *    
 *    <button (click)="onClick()">Click me</button>
 *    
 *    How it works:
 *    - Angular registers event listener on DOM
 *    - When event fires, calls handler method
 *    - Handler can access $event object with event details
 *    
 *    Available events:
 *    - Mouse: click, dblclick, mouseenter, mouseleave, etc.
 *    - Keyboard: keydown, keyup, keypress
 *    - Form: change, input, submit, focus, blur
 *    - Window: resize, scroll
 *    
 *    Use when: Responding to user interactions
 * 
 * 
 * 4. TWO-WAY BINDING [(ngModel)]="property"
 *    Direction: Component ↔ Template (BIDIRECTIONAL)
 *    
 *    <input [(ngModel)]="name">
 *    
 *    Combination of:
 *    - Property binding [ngModel]="name" (write to input)
 *    - Event binding (input)="name=$event.target.value" (read from input)
 *    
 *    When to use:
 *    - Form inputs that need live synchronization
 *    - But NOT recommended for complex apps
 *    
 *    Why? Two-way binding can:
 *    - Make data flow harder to track
 *    - Cause unexpected updates
 *    - Violate unidirectional flow principle
 *    
 *    Better approach for production:
 *    - Use Reactive Forms
 *    - Explicit control of when data syncs
 *    - More testable
 * 
 * 
 * CHANGE DETECTION & DATA BINDING:
 * 
 * Angular must know WHEN to re-evaluate bindings.
 * This is CHANGE DETECTION.
 * 
 * Timeline:
 * 
 * 1. User action (click, input, etc.)
 *    ▼
 * 2. Event handler executes
 *    ▼
 * 3. Change detection runs
 *    ▼
 * 4. Angular checks each binding
 *    (Has {{ value }} changed? Has [property] changed?)
 *    ▼
 * 5. If changed, update DOM
 * 
 * Change detection triggers when:
 * - User interaction (click, input, etc.)
 * - HTTP request completes
 * - Timer expires (setTimeout, setInterval)
 * - Promise resolves
 * - Observable emits
 * 
 * 
 * BINDING EXPRESSION SAFETY:
 * 
 * Angular expressions are NOT JavaScript!
 * 
 * Allowed:
 * {{ count + 1 }}
 * {{ name.toUpperCase() }}
 * {{ isActive ? 'Yes' : 'No' }}
 * 
 * NOT allowed:
 * {{ new Array() }} - no 'new'
 * {{ window }} - no global access
 * {{ function() {} }} - no function declarations
 * {{ variable = 5 }} - no assignments
 * 
 * Why? Security and performance.
 */

// ============================================================
// 5. DEPENDENCY INJECTION THEORY - IoC & DI PATTERNS
// ============================================================

/**
 * DEPENDENCY INJECTION (DI) - FUNDAMENTAL CONCEPT:
 * 
 * Before understanding DI, understand the PROBLEM it solves:
 * 
 * PROBLEM: TIGHT COUPLING
 * 
 * Without DI (Traditional approach):
 * 
 *   class UserService {
 *     private api = new HttpClient(); // Creates dependency
 *     
 *     getUsers() {
 *       return this.api.get('/users');
 *     }
 *   }
 *   
 *   Issues:
 *   1. Hard to test: Can't inject mock HttpClient
 *   2. Hard to change: If we want different HTTP implementation, must modify service
 *   3. Hard to reuse: Service is tied to this specific HttpClient
 * 
 * SOLUTION: DEPENDENCY INJECTION
 * 
 * With DI (Angular approach):
 * 
 *   class UserService {
 *     constructor(private api: HttpClient) {}
 *     // Dependency passed in from outside
 *     
 *     getUsers() {
 *       return this.api.get('/users');
 *     }
 *   }
 *   
 *   Benefits:
 *   1. Easy to test: Inject mock HttpClient
 *   2. Easy to change: Can inject different implementation
 *   3. Easy to reuse: Service works with any HttpClient
 * 
 * 
 * THE INVERSION OF CONTROL (IoC) PRINCIPLE:
 * 
 * Traditional flow:
 *   Class creates dependencies it needs
 *   
 * IoC / DI flow:
 *   Framework creates dependencies and INJECTS them into class
 *   "Hollywood Principle": "Don't call us, we'll call you"
 * 
 * Angular's Dependency Injector:
 * 
 *   ┌─────────────────────────────────┐
 *   │   DEPENDENCY INJECTOR           │
 *   │                                 │
 *   │   Maintains registry of:        │
 *   │   - Services                    │
 *   │   - Providers                   │
 *   │   - Factories                   │
 *   │                                 │
 *   │   When component needs service: │
 *   │   1. Looks up service           │
 *   │   2. Creates instance if needed │
 *   │   3. Injects into component     │
 *   │                                 │
 *   └─────────────────────────────────┘
 *              ▲
 *              │
 *   Component asks: "I need UserService"
 *              │
 *   Injector provides it
 * 
 * 
 * DEPENDENCY INJECTION IN ANGULAR:
 * 
 * Step 1: Declare what you need (in constructor)
 * 
 *   constructor(private service: UserService) { }
 * 
 * Step 2: Mark service as injectable
 * 
 *   @Injectable({ providedIn: 'root' })
 *   export class UserService { }
 * 
 * Step 3: Angular handles rest
 * 
 *   - Creates UserService instance (or reuses if singleton)
 *   - Passes to component constructor
 *   - Component has access to service
 * 
 * 
 * PROVIDER TYPES:
 * 
 * 1. CLASS PROVIDER (most common)
 *    { provide: UserService, useClass: UserService }
 *    
 *    Angular creates new instance using 'new UserService()'
 *    Uses for actual implementations
 * 
 * 2. VALUE PROVIDER
 *    { provide: CONFIG, useValue: { apiUrl: 'http://...' } }
 *    
 *    Injects pre-created value
 *    Uses for config, constants, test mocks
 * 
 * 3. FACTORY PROVIDER
 *    { provide: UserService, useFactory: () => new UserService() }
 *    
 *    Uses factory function to create instance
 *    Allows complex creation logic
 * 
 * 4. ALIAS PROVIDER
 *    { provide: 'Logger', useExisting: LoggerService }
 *    
 *    Creates alias for existing service
 *    Useful for multiple names for same service
 * 
 * 
 * SCOPES / LIFETIMES:
 * 
 * When is service created? How long does it live?
 * 
 * 1. Singleton (providedIn: 'root')
 *    Created: Once when app loads
 *    Lifetime: Entire app lifetime
 *    Instance: One instance shared by all components
 *    
 *    Use for: Global state, API service, auth service
 * 
 * 2. Module Level (providedIn: 'SomeModule')
 *    Created: When module loads
 *    Lifetime: While module is loaded
 *    Instance: One instance per module
 *    
 *    Use for: Feature-specific services
 * 
 * 3. Component Level (providers: [UserService])
 *    Created: When component created
 *    Lifetime: While component exists
 *    Instance: New instance per component
 *    
 *    Use for: Component-specific state/logic
 * 
 * 4. Every injection
 *    Created: Each time injected
 *    Lifetime: Use and discard
 *    Instance: New instance each time
 *    
 *    Use for: Stateless utilities, factory pattern
 * 
 * 
 * BENEFITS OF DEPENDENCY INJECTION:
 * 
 * 1. Loose Coupling
 *    Classes depend on abstractions, not concrete implementations
 *    Components don't need to know HOW to create dependencies
 * 
 * 2. Testability
 *    Inject mock/stub services in tests
 *    Test component logic in isolation
 * 
 * 3. Reusability
 *    Service can be used in different contexts
 *    Works with any compatible dependency
 * 
 * 4. Configuration
 *    Change implementation by configuring providers
 *    No code changes needed
 * 
 * 5. Flexibility
 *    Swap implementations (real vs mock, v1 vs v2)
 *    Easy in one place (provider configuration)
 * 
 * 6. Maintainability
 *    Clear dependencies visible in constructor
 *    Single responsibility easier to maintain
 */

// ============================================================
// 6. RXJS & REACTIVE PROGRAMMING THEORY
// ============================================================

/**
 * REACTIVE PROGRAMMING FUNDAMENTALS:
 * 
 * DEFINITION:
 * "Programming with asynchronous data streams"
 * 
 * WHAT IS A DATA STREAM?
 * 
 * Traditional view of data:
 *   const data = [1, 2, 3];
 *   // Data at rest - snapshot in time
 * 
 * Stream view of data:
 *   1 --2 --3 -->
 *   
 *   Data flowing over time
 *   Each value emitted at different time
 *   Can respond to each value as it arrives
 * 
 * Examples of streams:
 * - User clicks (stream of click events)
 * - HTTP responses (stream of responses)
 * - Timer ticks (stream of time values)
 * - Database changes (stream of updates)
 * 
 * 
 * WHY REACTIVE PROGRAMMING?
 * 
 * Problem: ASYNCHRONOUS COMPLEXITY
 * 
 *   // Traditional approach: Callbacks
 *   fetchUser(userId, function(user) {
 *     fetchPosts(user.id, function(posts) {
 *       fetchComments(posts[0].id, function(comments) {
 *         // Finally have data! Three levels deep
 *         displayComments(comments);
 *       });
 *     });
 *   });
 * 
 *   Issues:
 *   - Callback hell (deeply nested)
 *   - Hard to read and reason about
 *   - Error handling scattered
 *   - Hard to combine multiple async operations
 * 
 * Solution: REACTIVE PROGRAMMING with RxJS
 * 
 *   fetchUser(userId)
 *     .pipe(
 *       switchMap(user => fetchPosts(user.id)),
 *       switchMap(posts => fetchComments(posts[0].id))
 *     )
 *     .subscribe(comments => displayComments(comments));
 * 
 *   Benefits:
 *   - Linear, readable flow
 *   - Each operation is separate but composable
 *   - Error handling at end with catchError
 *   - Easy to add operators (debounce, filter, etc.)
 * 
 * 
 * REACTIVE PROGRAMMING MINDSET:
 * 
 * Shift from:
 *   "Do this, THEN do that, THEN do this"
 * To:
 *   "When this happens, transform it this way, then do this"
 * 
 * Example - User search:
 * 
 * Traditional:
 *   1. User types
 *   2. Call API
 *   3. Wait for response
 *   4. Display results
 *   5. Repeat
 * 
 * Reactive:
 *   User types
 *     ↓
 *   debounceTime(300) - wait for pause
 *     ↓
 *   distinctUntilChanged() - ignore same value
 *     ↓
 *   switchMap(query => api.search(query))
 *     ↓
 *   Display results
 * 
 * 
 * OBSERVABLE PATTERN:
 * 
 * An Observable is a STREAM of events over time.
 * 
 * Observable lifecycle:
 * 
 *   source --→ [Observer 1] (receives events)
 *           ├→ [Observer 2] (receives events)
 *           └→ [Observer 3] (receives events)
 * 
 * Observer responses to 3 types of events:
 * 1. next() - new value emitted
 * 2. error() - something went wrong
 * 3. complete() - stream finished
 * 
 * Example timeline:
 *   next(1)
 *   next(2)
 *   next(3)
 *   complete()
 * 
 * 
 * SUBJECT PATTERN:
 * 
 * Observable: One-way producer → consumers
 * Subject: Two-way (producer and consumer)
 * 
 * Subject characteristics:
 * - Subscribers can emit values
 * - Multiple subscribers receive same values
 * - Multicast (unlike Observable which is unicast)
 * 
 * Types:
 * 
 * 1. Subject
 *    Only new subscribers get values
 *    Like TV broadcast - only see current and future shows
 * 
 * 2. BehaviorSubject
 *    New subscribers get last value + new values
 *    Like DVR - can watch last recorded thing on demand
 * 
 * 3. ReplaySubject
 *    New subscribers get N previous values + new
 *    Like keeping history of last N events
 * 
 * 
 * COLD vs HOT OBSERVABLES:
 * 
 * Cold Observable:
 *   - Starts when subscribed
 *   - Each subscriber gets own execution
 *   - Like renting a movie - each viewer gets fresh copy
 * 
 *   Example:
 *   const cold = Observable.of(1, 2, 3);
 *   // Nothing happens until someone subscribes
 * 
 * Hot Observable:
 *   - Already executing
 *   - All subscribers see same events
 *   - Like TV broadcast - starts whether you watch or not
 * 
 *   Example:
 *   const hot = this.userClicks$ // Subject already emitting
 *   // Events happen regardless of subscribers
 * 
 * 
 * OPERATORS - THE POWER OF RxJS:
 * 
 * Operators are functions that transform observables.
 * They compose together in pipes.
 * 
 * Analogy: Assembly line
 * 
 *   Raw materials
 *       ↓
 *   [Operator 1: Filter] - remove defects
 *       ↓
 *   [Operator 2: Transform] - shape material
 *       ↓
 *   [Operator 3: Package] - prepare for sale
 *       ↓
 *   Finished product
 * 
 * Observable operator pipeline:
 * 
 *   source$ 
 *     .pipe(
 *       debounceTime(300),    // Wait for pause
 *       distinctUntilChanged(), // Ignore duplicates
 *       map(x => x * 2),      // Transform each value
 *       filter(x => x > 5),   // Keep only large values
 *       catchError(err => of([])) // Handle errors
 *     )
 *     .subscribe(result => ...) // Final consumer
 * 
 * 
 * MEMORY LEAKS IN RxJS:
 * 
 * Problem:
 *   subscription = observable.subscribe(...)
 *   // Component destroyed, subscription still active
 *   // Listening for events that will never come
 *   // Memory occupied forever
 * 
 * Solutions:
 * 
 * 1. Unsubscribe manually
 *   ngOnDestroy() {
 *     this.subscription.unsubscribe();
 *   }
 * 
 * 2. Use takeUntil pattern
 *   observable
 *     .pipe(takeUntil(this.destroy$))
 *     .subscribe(...);
 * 
 * 3. Use async pipe in template (automatic unsubscribe)
 *   {{ observable$ | async }}
 * 
 * 
 * PREVENTING PYRAMID OF DOOM:
 * 
 * Bad (nested subscriptions):
 *   first$.subscribe(a => {
 *     second$.subscribe(b => {
 *       third$.subscribe(c => {
 *         // Callback hell with RxJS
 *       })
 *     })
 *   })
 * 
 * Good (flattening operators):
 *   first$
 *     .pipe(
 *       switchMap(a => second$),
 *       switchMap(b => third$)
 *     )
 *     .subscribe(c => {})
 */

// ============================================================
// 7. CHANGE DETECTION STRATEGY - DEEP DIVE
// ============================================================

/**
 * CHANGE DETECTION: HOW ANGULAR KEEPS VIEW IN SYNC WITH DATA
 * 
 * THE PROBLEM:
 * 
 * User clicks → JavaScript executes → Data changes
 * But the DOM doesn't know data changed!
 * 
 * How does Angular know to update the view?
 * 
 * 
 * ANGULAR'S CHANGE DETECTION MECHANISM:
 * 
 * Angular uses ZONE.JS to detect changes.
 * Zone.js patches asynchronous APIs:
 * 
 * - click events
 * - HTTP responses
 * - setTimeout
 * - Promises
 * - Observable subscriptions
 * 
 * When any of these occur:
 * 
 *   Async event occurs
 *     ↓
 *   Zone.js detects it
 *     ↓
 *   Change detection triggered
 *     ↓
 *   Angular walks component tree
 *     ↓
 *   Checks each binding for changes
 *     ↓
 *   Updates DOM where needed
 * 
 * 
 * CHANGE DETECTION CYCLE:
 * 
 * ┌─────────────────────────────────────────────────┐
 * │  Component Tree (App)                           │
 * │  ┌─────────────────────────────────────────┐    │
 * │  │  AppComponent                           │    │
 * │  │  ┌───────────────┐  ┌────────────────┐  │    │
 * │  │  │ HeaderComponent│  │ ContentComponent│  │    │
 * │  │  │ Check={{title}}│  │ Check{{data}}   │  │    │
 * │  │  │ Update if     │  │ ┌──────────────┐│  │    │
 * │  │  │ changed       │  │ │ListComponent││  │    │
 * │  │  └───────────────┘  │ │Check{{items}}││  │    │
 * │  │                     │ │┌────────────┐││  │    │
 * │  │                     │ ││ItemComponent│││  │    │
 * │  │                     │ ││Check props  │││  │    │
 * │  │                     │ │└────────────┘││  │    │
 * │  │                     │ └──────────────┘│  │    │
 * │  │                     └────────────────┘  │    │
 * │  └─────────────────────────────────────────┘    │
 * └─────────────────────────────────────────────────┘
 * 
 * Angular checks:
 * 1. From top to bottom (parent before children)
 * 2. All bindings in each component
 * 3. Compares old value with new value
 * 4. If different, marks component as "needs update"
 * 5. After all checks, updates DOM for marked components
 * 
 * 
 * PERFORMANCE PROBLEM:
 * 
 * Consider large component tree with many bindings:
 * 
 * On every click: Check 1000 bindings in 100 components
 *   click → change detection → check all 1000 bindings
 *   response → change detection → check all 1000 bindings
 *   timer → change detection → check all 1000 bindings
 * 
 * Each change detection = potentially heavy computation
 * 
 * Solution: ONPUSH CHANGE DETECTION STRATEGY
 * 
 * 
 * TWO CHANGE DETECTION STRATEGIES:
 * 
 * 1. DEFAULT (Check Everything)
 * 
 *   changeDetection: ChangeDetectionStrategy.Default
 * 
 *   - Check component every time any event fires
 *   - Check all bindings
 *   - Safe but can be slow
 *   
 *   When to use:
 *   - Simple components
 *   - When you're unsure
 *   - Legacy code
 * 
 * 
 * 2. ONPUSH (Check Only When Input Changes)
 * 
 *   changeDetection: ChangeDetectionStrategy.OnPush
 * 
 *   - Only check component when @Input changes
 *   - OR when event from component fires
 *   OR when observable emits (with async pipe)
 *   - Don't check if @Input props haven't changed
 *   
 *   Benefit: Massive performance improvement
 *   
 *   Example: List of 1000 items with OnPush
 *   
 *   ItemComponent uses OnPush
 *   Parent passes [item]="item"
 *   
 *   When one item changes:
 *   - Only that ItemComponent checks for changes
 *   - Siblings don't check
 *   - Huge speedup!
 *   
 *   Requirement: Never mutate input objects
 *   ✓ Do: this.items = [...this.items, newItem]
 *   ✗ Don't: this.items.push(newItem)
 *   
 *   Why? OnPush only detects reference changes
 * 
 * 
 * BEST PRACTICES:
 * 
 * 1. Default for root/container components
 *    These manage state and need constant checking
 * 
 * 2. OnPush for presentational components
 *    These just display @Input data
 * 
 * 3. Use immutable updates with OnPush
 *    Ensures reference changes trigger detection
 * 
 * 4. Manual change detection when needed
 *    this.cdr.markForCheck() or detectChanges()
 * 
 * 5. Avoid expensive operations in templates
 *    Don't call methods returning different values
 *    {{ expensiveMethod() }} ← AVOID
 * 
 * 6. Use trackBy with *ngFor
 *    Prevents unnecessary DOM recreation
 *    *ngFor="let item of items; trackBy: trackByFn"
 */

// ============================================================
// 8. ROUTING ARCHITECTURE - NAVIGATION THEORY
// ============================================================

/**
 * ROUTING FUNDAMENTALS:
 * 
 * WHAT IS ROUTING?
 * 
 * Traditional Multi-Page App:
 * 
 *   Click link
 *     ↓
 *   Browser requests new page from server
 *     ↓
 *   Server sends new HTML
 *     ↓
 *   Browser reloads (blank screen, slow)
 *     ↓
 *   New page displayed
 * 
 *   User sees loading/refresh
 *   Entire page reloaded
 *   Network expensive
 *   Page state lost
 * 
 * 
 * Single Page Application (SPA) Routing:
 * 
 *   Click link
 *     ↓
 *   JavaScript intercepts
 *     ↓
 *   Changes URL in browser (no server request!)
 *     ↓
 *   Swaps component in DOM
 *     ↓
 *   New view rendered
 * 
 *   No network request for navigation
 *   Instant switching
 *   State can be maintained
 *   Server only sends data
 * 
 * 
 * HOW ANGULAR ROUTING WORKS:
 * 
 * STEP 1: URL Changes
 *   Browser URL changes (user click, direct navigation, etc.)
 * 
 * STEP 2: Router Matches Route
 *   Angular Router matches URL to route configuration
 *   
 *   Routes:
 *   /home → HomeComponent
 *   /about → AboutComponent
 *   /post/:id → PostDetailComponent
 * 
 * STEP 3: Resolve Guard & Resolver
 *   Optional: canActivate guards (check permissions)
 *   Optional: Resolver (fetch data before loading)
 * 
 * STEP 4: Load Component
 *   Create component instance
 *   Pass route parameters/query strings
 * 
 * STEP 5: Render in Router Outlet
 *   <router-outlet> shows matched component
 *   Replace previous component
 * 
 * Component Rendering:
 *   ┌─────────────────────────────┐
 *   │  AppComponent               │
 *   │  ┌────────────────────────┐ │
 *   │  │ <router-outlet>        │ │
 *   │  │                        │ │
 *   │  │ [Matched Component]    │ │
 *   │  │ HomeComponent          │ │
 *   │  │ OR AboutComponent      │ │
 *   │  │ OR PostDetailComponent │ │
 *   │  └────────────────────────┘ │
 *   └─────────────────────────────┘
 * 
 * 
 * ROUTE CONFIGURATION:
 * 
 * Simple routes:
 *   { path: 'home', component: HomeComponent }
 * 
 * With parameters:
 *   { path: 'post/:id', component: PostDetailComponent }
 *   URL: /post/5 → component receives id=5
 * 
 * With nested routes:
 *   {
 *     path: 'dashboard',
 *     component: DashboardComponent,
 *     children: [
 *       { path: 'profile', component: ProfileComponent },
 *       { path: 'settings', component: SettingsComponent }
 *     ]
 *   }
 *   URL: /dashboard/profile → shows Dashboard with Profile inside
 * 
 * With lazy loading:
 *   {
 *     path: 'admin',
 *     loadChildren: () => import('./admin/admin.module')
 *       .then(m => m.AdminModule)
 *   }
 *   Admin module only loaded when user navigates to /admin
 * 
 * 
 * ROUTE GUARDS - CONTROLLING ACCESS:
 * 
 * WHY GUARDS?
 * 
 * Some routes should only be accessible if conditions met:
 * - User is authenticated
 * - User has permission
 * - Form has unsaved changes (prevent leaving)
 * 
 * TYPES OF GUARDS:
 * 
 * 1. canActivate
 *    Controls whether user can ENTER route
 *    Example: Check if user logged in before showing /dashboard
 * 
 * 2. canDeactivate
 *    Controls whether user can LEAVE route
 *    Example: Confirm if leaving page with unsaved changes
 * 
 * 3. canActivateChild
 *    Controls access to child routes
 *    Example: Check permission for entire /admin section
 * 
 * 4. canLoad
 *    Controls
 * whether lazy module is loaded
 *    Example: Don't even load admin module if not authorized
 * 
 * 
 * LAZY LOADING - PERFORMANCE OPTIMIZATION:
 * 
 * Traditional: Load entire app at startup
 *   
 *   Bundle size = Features + Routes + Components
 *   Startup time = Load everything
 *   Slow for large apps
 * 
 * 
 * Lazy Loading: Load features on demand
 * 
 *   Initial download: Core app + core routes only
 *   When user goes to /admin: Load admin module then
 *   
 *   Benefit:
 *   - Faster startup
 *   - Smaller initial bundle
 *   - Load only what user needs
 * 
 * 
 * NAVIGATION PATTERNS:
 * 
 * 1. Programmatic Navigation
 *    router.navigate(['/home'])
 *    router.navigate(['/post', id])
 * 
 * 2. Template Navigation
 *    <a routerLink="/home">Home</a>
 *    <a [routerLink]="['/post', id]">Post</a>
 * 
 * 3. With Query Parameters
 *    router.navigate(['/search'], { queryParams: { q: 'angular' } })
 *    URL: /search?q=angular
 * 
 * 4. With Fragment
 *    router.navigate(['/page'], { fragment: 'section2' })
 *    URL: /page#section2
 */

// ============================================================
// 9. MODULE SYSTEM - ORGANIZATION & BOUNDARIES
// ============================================================

/**
 * ANGULAR MODULES - NGMODULE:
 * 
 * Note: Angular 14+ encourages standalone components
 * But NgModules still useful for organizing large apps
 * 
 * WHAT IS A MODULE?
 * 
 * A module is a logical grouping of:
 * - Components
 * - Services
 * - Directives
 * - Pipes
 * - Other modules
 * 
 * It creates a BOUNDARY around related features.
 * 
 * Analogy: Module is like a package or library
 * 
 * 
 * MENTAL MODEL OF MODULES:
 * 
 * ┌────────────────────────────────┐
 * │  Application                   │
 * │                               │
 * │  ┌──────────────────────────┐  │
 * │  │ CoreModule               │  │
 * │  │ (Global services,        │  │
 * │  │  auth, http)             │  │
 * │  └──────────────────────────┘  │
 * │                               │
 * │  ┌──────────────────────────┐  │
 * │  │ SharedModule             │  │
 * │  │ (Reusable components,    │  │
 * │  │  directives, pipes)      │  │
 * │  └──────────────────────────┘  │
 * │                               │
 * │  ┌──────────────────────────┐  │
 * │  │ FeatureModule1           │  │
 * │  │ (Feature-specific        │  │
 * │  │  components & services)  │  │
 * │  └──────────────────────────┘  │
 * │                               │
 * │  ┌──────────────────────────┐  │
 * │  │ FeatureModule2           │  │
 * │  │ (Feature-specific        │  │
 * │  │  components & services)  │  │
 * │  └──────────────────────────┘  │
 * │                               │
 * └────────────────────────────────┘
 * 
 * 
 * MODULE TYPES:
 * 
 * 1. ROOT MODULE (AppModule)
 *    - Bootstraps the app
 *    - Loads once at startup
 *    - Declares root component
 * 
 * 2. CORE MODULE (CoreModule)
 *    - Singleton services (auth, api, etc.)
 *    - Loaded once
 *    - Guards against re-import
 * 
 * 3. SHARED MODULE (SharedModule)
 *    - Reusable components, directives, pipes
 *    - Used by multiple feature modules
 *    - No singleton services
 * 
 * 4. FEATURE MODULES (UserModule, ProductModule, etc.)
 *    - Lazy-loaded or eagerly loaded
 *    - Self-contained features
 *    - Can be removed without affecting others
 * 
 * 5. ROUTING MODULE
 *    - Routes for module
 *    - Keeps routing logic separate
 * 
 * 
 * MODULE vs STANDALONE COMPONENTS:
 * 
 * NgModules (Traditional):
 * Pro: Clear boundaries, explicit dependencies
 * Con: Boilerplate, declarations array, import cycles
 * 
 * Standalone (Modern, 14+):
 * Pro: Less boilerplate, simpler, explicit imports
 * Con: Need to manage manually at each component
 * 
 * When to use each:
 * - Large app with many features → NgModules
 * - Simple app or new code → Standalone
 * - Mixed: Use both where appropriate
 */

// ============================================================
// 10. SECURITY THEORY - PROTECTING APPLICATIONS
// ============================================================

/**
 * SECURITY IS NOT OPTIONAL:
 * 
 * Security vulnerabilities lead to:
 * - Data breaches
 * - User identity theft
 * - Business damages
 * - Legal liability
 * 
 * Security = Trust = User retention = Business success
 * 
 * 
 * COMMON WEB VULNERABILITIES:
 * 
 * 1. XSS (CROSS-SITE SCRIPTING)
 * 
 *    ATTACK:
 *    Attacker injects JavaScript code into page
 *    
 *    Example:
 *    Comment: "<script>alert('hacked')</script>"
 *    If not sanitized, script runs in user's browser
 *    
 *    Damage:
 *    - Steal cookies/session tokens
 *    - Modify page content
 *    - Redirect to phishing site
 *    - Perform actions as user
 *    
 *    DEFENSE:
 *    - Angular sanitizes by default
 *    - Never use innerHTML with user input
 *    - Use content security policy
 *    - Validate on server too
 * 
 * 
 * 2. CSRF (CROSS-SITE REQUEST FORGERY)
 * 
 *    ATTACK:
 *    Attacker tricks user into making unwanted request
 *    
 *    Example:
 *    1. User logged into bank.com
 *    2. User visits attacker.com (in same session)
 *    3. attacker.com makes hidden request: bank.com/transfer?to=attacker
 *    4. Bank processes it (thinks user requested)
 *    5. Money transferred!
 *    
 *    DEFENSE:
 *    - Check origin (Referer header)
 *    - CSRF token: Hidden token in form
 *      Server verifies token matches user's session
 *      Attacker can't get valid token
 *    - Angular sends CSRF token automatically
 * 
 * 
 * 3. INJECTION ATTACKS
 * 
 *    SQL Injection, LDAP Injection, etc.
 *    Attacker injects malicious code via input fields
 *    
 *    Example SQL Injection:
 *    Input: " OR 1=1 --
 *    Query: SELECT * FROM users WHERE id = "" OR 1=1 --
 *    Returns ALL users!
 *    
 *    DEFENSE:
 *    - Always validate input (client + server)
 *    - Use parameterized queries
 *    - Never build queries by string concatenation
 * 
 * 
 * 4. MAN-IN-THE-MIDDLE (MITM)
 * 
 *    ATTACK:
 *    Attacker intercepts communication
 *    Can read/modify data in transit
 *    
 *    DEFENSE:
 *    - ALWAYS use HTTPS (TLS/SSL)
 *    - NEVER transmit sensitive data over HTTP
 *    - Use HSTS (force HTTPS)
 * 
 * 
 * ANGULAR'S BUILT-IN SECURITY:
 * 
 * 1. Sanitization
 *    Angular sanitizes (removes dangerous) HTML by default
 *    Text bindings: {{ message }} - HTML entities escaped
 *    Only innerHTML with DomSanitizer trusted HTML
 * 
 * 2. Property Binding Safety
 *    Only binds to element properties
 *    Doesn't execute JavaScript from properties
 * 
 * 3. Event Binding Safety
 *    Only allows registered events
 *    Prevents arbitrary event handlers
 * 
 * 4. CSRF Token Handling
 *    Automatically sends CSRF token in requests
 *    Looks for token in specific header/cookie
 *    Configurable per app
 * 
 * 
 * DEVELOPER RESPONSIBILITIES:
 * 
 * Even with built-in security, developers must:
 * 
 * 1. Validate Input
 *    Client-side: Catch errors early, better UX
 *    Server-side: Don't trust client (can be bypassed)
 *    Both are needed!
 * 
 * 2. Authenticate Users
 *    Verify user identity
 *    Use secure token storage (not localStorage for sensitive)
 *    Implement token refresh
 * 
 * 3. Authorize Actions
 *    Verify user has permission for action
 *    Not just: "Does UI show button?"
 *    Backend must check: "Is user allowed?"
 * 
 * 4. Encrypt Data in Transit
 *    Use HTTPS everywhere
 *    Never send sensitive data in URL or unencrypted
 * 
 * 5. Protect Data at Rest
 *    Hash passwords with proper algorithms
 *    Encrypt sensitive data in database
 *    Use environment variables for secrets
 * 
 * 6. Content Security Policy (CSP)
 *    Browser security feature
 *    Specifies where scripts, styles, images can come from
 *    Prevents many injection attacks
 * 
 * 7. Keep Dependencies Updated
 *    Vulnerabilities fixed in updates
 *    Regular security audits
 *    `npm audit` to check for known vulnerabilities
 * 
 * 8. Error Messages
 *    Don't reveal sensitive info in error messages
 *    Don't expose stack traces to users
 *    Log detailed errors server-side only
 */

// ============================================================
// 11. PERFORMANCE THEORY - OPTIMIZATION PRINCIPLES
// ============================================================

/**
 * PERFORMANCE FUNDAMENTALS:
 * 
 * USER'S PERCEPTION:
 * 
 * 0-100ms: Feels instant
 * 100-300ms: Feels responsive
 * 300-1000ms: Task in progress (show loader)
 * 1000ms+: Feels slow (lose users)
 * 
 * PERFORMANCE BUDGET:
 * 
 * How much time users have
 * Mobile: ~3-5 seconds
 * Desktop: ~2-3 seconds
 * 
 * Must load, parse, execute, render in that time
 * 
 * 
 * PERFORMANCE METRICS:
 * 
 * 1. FCP (First Contentful Paint)
 *    Time until user sees something
 *    Goal: < 1.8s
 * 
 * 2. LCP (Largest Contentful Paint)
 *    Time until main content loaded
 *    Goal: < 2.5s
 * 
 * 3. TTI (Time to Interactive)
 *    Time until page responds to interaction
 *    Goal: < 3.8s
 * 
 * 4. CLS (Cumulative Layout Shift)
 *    How much layout moves around
 *    Goal: < 0.1
 * 
 * 5. FID (First Input Delay)
 *    Delay from input to response
 *    Goal: < 100ms
 * 
 * 
 * PERFORMANCE OPTIMIZATION STRATEGIES:
 * 
 * 1. INITIAL LOAD (Bundle Size)
 * 
 *    Problem:
 *    - Large bundles = longer download = slow startup
 *    - JavaScript must parse, compile, execute
 *    - Each KB matters on mobile
 * 
 *    Solutions:
 *    - Tree-shaking: Remove unused code
 *    - Code splitting: Split bundle by route
 *    - Lazy loading: Load modules on demand
 *    - Minification: Reduce file size
 *    - Compression: GZIP files
 *    - CDN: Distribute from edge servers
 * 
 * 
 * 2. RUNTIME PERFORMANCE (Execution)
 * 
 *    Problem:
 *    - Too many components checking for changes
 *    - Expensive operations in templates
 *    - Large loops with unnecessary DOM updates
 * 
 *    Solutions:
 *    - OnPush change detection
 *    - Memoization (cache results)
 *    - Virtual scrolling (for large lists)
 *    - TrackBy in *ngFor
 *    - Avoid pipes with side effects
 *    - Defer loading non-critical parts
 * 
 * 
 * 3. INTERACTION PERFORMANCE
 * 
 *    Problem:
 *    - Change detection too frequent
 *    - Long-running tasks block main thread
 *    - Too many DOM mutations
 * 
 *    Solutions:
 *    - Debounce/throttle user input
 *    - Web Workers for heavy computation
 *    - Batch DOM updates
 *    - requestAnimationFrame for animations
 *    - Async operations don't block UI
 * 
 * 
 * ANGULAR-SPECIFIC OPTIMIZATIONS:
 * 
 * 1. Change Detection
 *    Default: Check all components on every event
 *    OnPush: Only check when needed
 *    Result: Can be 10x+ faster
 * 
 * 2. Lazy Loading Modules
 *    Only load features user needs
 *    /admin module loads only when /admin accessed
 * 
 * 3. TrackBy in ngFor
 *    Prevents recreating DOM elements unnecessarily
 *    *ngFor="let item of items; trackBy: trackById"
 *    10+ items, 10x faster
 * 
 * 4. Unsubscribe Pattern
 *    Memory leaks slow app over time
 *    Unsubscribe in ngOnDestroy
 *    Or use async pipe (automatic)
 * 
 * 5. Ahead-of-Time Compilation (AOT)
 *    Compile templates at build time
 *    Default in Angular 9+
 *    Catches errors early, faster rendering
 * 
 * 6. Bundling & Minification
 *    ng build --configuration=production
 *    Minifies, tree-shakes, optimizes
 * 
 * 
 * MEASURING PERFORMANCE:
 * 
 * Chrome DevTools:
 *   - Network tab: See loaded resources
 *   - Performance tab: Record execution, analyze
 *   - Lighthouse: Audit performance, SEO, accessibility
 * 
 * Angular DevTools Extension:
 *   - Change detection analysis
 *   - Component performance
 *   - Dependency tree
 * 
 * Firebase Performance Monitoring:
 *   - Real user monitoring
 *   - Track metrics from production
 *   - Get real user experience data
 */

// ============================================================
// 12. DESIGN PATTERNS IN ANGULAR
// ============================================================

/**
 * DESIGN PATTERNS: PROVEN SOLUTIONS TO COMMON PROBLEMS
 * 
 * A design pattern is a reusable solution to a problem
 * They represent best practices, evolved from experience
 * 
 * 
 * ANGULAR-SPECIFIC PATTERNS:
 * 
 * 1. CONTAINER & PRESENTATIONAL PATTERN
 * 
 *    Problem:
 *    Components mixed concerns:
 *    - Loading data (API calls)
 *    - Managing state
 *    - Displaying data
 *    Hard to test, reuse, modify
 * 
 *    Solution: Split into two types
 * 
 *    Container Component (Smart Component):
 *    - Handles data loading
 *    - Manages state
 *    - Subscribes to services
 *    - Passes data to children
 *    
 *    Presentational Component (Dumb Component):
 *    - Receives data via @Input
 *    - Displays data
 *    - Emits events via @Output
 *    - No service dependencies
 *    - Highly reusable
 * 
 *    Benefit: Testing, reusability, clarity
 * 
 * 
 * 2. FACADE PATTERN
 * 
 *    Problem:
 *    Complex interaction between multiple services
 *    Components need to know about many things
 * 
 *    Solution: Create facade service
 *    
 *    Facade provides simple interface
 *    Hides complexity inside
 *    
 *    Example:
 *    UserService, AuthService, ApiService, LoggerService
 *    → UserFacade provides: login(), logout(), getProfile()
 *    → Internally orchestrates multiple services
 *    → Component only knows about UserFacade
 * 
 *    Benefit: Simplified API, encapsulation, testability
 * 
 * 
 * 3. OBSERVER PATTERN
 * 
 *    Problem:
 *    Need to notify multiple objects about changes
 *    Loose coupling between objects
 * 
 *    Solution: Use Subjects/BehaviorSubjects
 *    
 *    Service maintains Subject
 *    Multiple components subscribe
 *    When service updates state, all subscribers notified
 *    
 *    MessageService with Subject:
 *    Different components emit and listen independently
 * 
 *    Benefit: Loose coupling, scalability
 * 
 * 
 * 4. SINGLETON PATTERN
 * 
 *    Problem:
 *    Need single instance of service across app
 *    Multiple instances cause state inconsistency
 * 
 *    Solution: providedIn: 'root'
 *    
 *    @Injectable({ providedIn: 'root' })
 *    Angular guarantees single instance
 *    Injected into all components
 * 
 *    Benefit: Shared state, consistency
 * 
 * 
 * 5. FACTORY PATTERN
 * 
 *    Problem:
 *    Creating instances with complex logic
 *    Multiple ways to create same object
 * 
 *    Solution: Factory function/service
 *    
 *    Factory encapsulates creation logic
 *    Returns appropriate instance based on parameters
 *    
 *    Example:
 *    LoggerFactory creates different loggers
 *    (ConsoleLogger, FileLogger, RemoteLogger)
 *    based on environment
 * 
 *    Benefit: Decouples creation, flexibility
 * 
 * 
 * 6. RESOLVER PATTERN
 * 
 *    Problem:
 *    Component displays loading… while fetching data
 *    Bad UX, blank page before data arrives
 * 
 *    Solution: Resolve data before showing component
 *    
 *    Router waits for resolver before loading component
 *    Data available when component initializes
 *    No loading state needed
 * 
 *    Benefit: Better UX, simpler component
 * 
 * 
 * 7. STATE MANAGEMENT PATTERN
 * 
 *    Problem:
 *    State scattered across services and components
 *    Hard to track data changes
 *    Debugging difficult
 * 
 *    Solutions:
 *    - Simple: Service with BehaviorSubject (small apps)
 *    - Complex: NgRx Store (predictable, time-travel debug)
 * 
 *    Benefit: Predictability, debugging, time-travel
 */

// ============================================================
// 13. SOLID PRINCIPLES IN ANGULAR
// ============================================================

/**
 * SOLID: 5 PRINCIPLES FOR GOOD SOFTWARE DESIGN
 * 
 * These aren't Angular-specific, but universally important
 * 
 * 
 * S - SINGLE RESPONSIBILITY PRINCIPLE (SRP)
 * 
 * "A class should have only one reason to change"
 * 
 * PROBLEM:
 * class UserService {
 *   loadUser() { } // Fetches from API
 *   parseUser() { } // Parses JSON
 *   displayUser() { } // Shows in template
 *   saveToLocalStorage() { } // Persists data
 * }
 * One class doing TOO MUCH
 * Changes in any area = rewrite this class
 * 
 * SOLUTION:
 * UserService // Only handles user data fetching
 * UserParserService // Handles parsing
 * UserDisplayComponent // Handles display
 * UserStorageService // Handles persistence
 * 
 * Each class has ONE reason to change
 * Changes isolated to responsible class
 * 
 * In Angular:
 * - Services handle one concern
 * - Components handle display only
 * - Pipes handle formatting
 * 
 * 
 * O - OPEN/CLOSED PRINCIPLE (OCP)
 * 
 * "Software should be open for extension, closed for modification"
 * 
 * PROBLEM:
 * class Logger {
 *   log(msg) {
 *     if (type === 'console') console.log(msg);
 *     if (type === 'file') writeFile(msg);
 *     if (type === 'remote') sendToServer(msg);
 *     // To add new logger type: modify this class!
 *   }
 * }
 * 
 * Every new logger type requires changing existing code
 * Risk of breaking existing functionality
 * 
 * SOLUTION:
 * abstract class Logger {
 *   abstract log(msg);
 * }
 * class ConsoleLogger extends Logger { }
 * class FileLogger extends Logger { }
 * class RemoteLogger extends Logger { }
 * 
 * Add new logger types by EXTENDING, not MODIFYING
 * Existing code unchanged (closed for modification)
 * Can extend easily (open for extension)
 * 
 * In Angular:
 * - Use service interfaces/abstract classes
 * - Implement new types without modifying existing
 * - Use @Injectable with providers for different implementations
 * 
 * 
 * L - LISKOV SUBSTITUTION PRINCIPLE (LSP)
 * 
 * "Subtypes must be substitutable for base types"
 * 
 * PROBLEM:
 * class Animal {
 *   move() { }
 * }
 * class Dog extends Animal {
 *   move() { } // Dogs walk
 * }
 * class Snake extends Animal {
 *   move() { } // Snakes slither ✓
 * }
 * class Bird extends Animal {
 *   move() { } // Birds fly ✓
 * }
 * class Penguin extends Bird {
 *   move() { } // Penguins CAN'T fly! ✗
 * }
 * 
 * Client code expecting Bird.move() to fly
 * But Penguin.move() swims/walks
 * Violates contract
 * 
 * SOLUTION:
 * Correct inheritance hierarchy:
 * class Bird extends Animal { }
 * class FlyingBird extends Bird { 
 *   fly() { } 
 * }
 * class Penguin extends Bird { 
 *   swim() { }
 * }
 * 
 * In Angular:
 * - Subclass must be safe substitute for parent
 * - All component children implement expected interface
 * - Don't break contracts of services
 * 
 * 
 * I - INTERFACE SEGREGATION PRINCIPLE (ISP)
 * 
 * "Clients shouldn't depend on interfaces they don't use"
 * 
 * PROBLEM:
 * interface UserService {
 *   createUser();
 *   readUser();
 *   updateUser();
 *   deleteUser();
 *   sendEmail();
 *   createBackup();
 *   logActivity();
 * }
 * 
 * Guest user needs only readUser()
 * But implementing interface requires all methods!
 * 
 * SOLUTION:
 * interface UserReader {
 *   readUser();
 * }
 * interface UserWriter {
 *   createUser();
 *   updateUser();
 *   deleteUser();
 * }
 * interface UserNotifier {
 *   sendEmail();
 * }
 * interface UserArchiver {
 *   createBackup();
 * }
 * 
 * Guest implements only UserReader
 * Admin implements all four
 * Each interface focused
 * 
 * In Angular:
 * - Break large service interfaces into smaller ones
 * - Components depend only on what they need
 * - Easier to mock in tests
 * 
 * 
 * D - DEPENDENCY INVERSION PRINCIPLE (DIP)
 * 
 * "Depend on abstractions, not concrete implementations"
 * 
 * PROBLEM:
 * class OrderService {
 *   constructor(private emailService: EmailService) { }
 *   // Depends directly on concrete EmailService
 *   // If EmailService changes: OrderService breaks
 *   // Can't use different email provider
 * }
 * 
 * Tight coupling to implementation
 * Hard to change (EmailServicev2)
 * Hard to test (can't inject mock)
 * 
 * SOLUTION:
 * interface NotificationService {
 *   send(message: string);
 * }
 * class EmailNotification implements NotificationService { }
 * class SMSNotification implements NotificationService { }
 * 
 * class OrderService {
 *   constructor(private notify: NotificationService) { }
 *   // Depends on abstraction NotificationService
 *   // Can inject EmailNotification, SMSNotification, MockNotification
 * }
 * 
 * Depends on interface, not implementation
 * Easy to swap implementations
 * Easy to test
 * 
 * In Angular:
 * - This IS Dependency Injection!
 * - Inject service interfaces, not classes
 * - Use abstract base classes for contracts
 * - Enables testing and flexibility
 */

// ============================================================
// 14. TYPESCRIPT IN ANGULAR CONTEXT
// ============================================================

/**
 * WHY TYPESCRIPT IN ANGULAR?
 * 
 * JavaScript:
 *   const value = getData();
 *   // What type is value? Object? Array? String?
 *   // Errors only appear at runtime
 *   value.map(x => x.name) // Crashes if not array!
 * 
 * TypeScript:
 *   const value: User[] = getData();
 *   // Clear: array of Users
 *   // Errors caught at compile time
 *   value.map(x => x.name) // Error if x doesn't have name property!
 * 
 * 
 * ADVANTAGES IN PRODUCTION APPS:
 * 
 * 1. Type Safety
 *    Compiler catches errors before runtime
 *    50%+ of bugs prevented
 *    Massive codebase? TypeScript = lifesaver
 * 
 * 2. Better IDE Support
 *    Autocomplete works better
 *    Refactoring safer (rename across codebase)
 *    Documentation through types
 * 
 * 3. Maintainability
 *    Easier to refactor large codebases
 *    Easier for new developers to understand code
 *    Self-documenting through types
 * 
 * 4. Catch Errors Early
 *    Compile time vs runtime
 *    Cost of finding bug early = minimal
 *    Cost of runtime bug in production = huge
 * 
 * 
 * ANGULAR + TYPESCRIPT = PERFECT PAIR:
 * 
 * Decorators:
 *   @Component, @Injectable, @Input
 *   These ARE TypeScript features
 *   Angular uses metadata from TypeScript
 * 
 * Type Safety for Component Properties:
 *   @Input() user: User; // Clear contract
 *   @Output() save = new EventEmitter<User>();
 * 
 * Interfaces for Data Models:
 *   interface User { name: string; email: string; }
 *   // Component knows exact shape of User
 * 
 * Generics:
 *   Service<T> - one service class, works with many types
 *   Repository<T>
 *   HTTP responder<T>
 */

// ============================================================
// END OF THEORY & CONCEPTS GUIDE
// ============================================================

/**
 * KEY TAKEAWAYS:
 * 
 * 1. ANGULAR IS A COMPLETE FRAMEWORK
 *    Not just view rendering, but full application toolkit
 *    Opinionated structure = easier large projects
 * 
 * 2. ARCHITECTURE MATTERS
 *    Separation of concerns (components, services, data)
 *    Enables scaling, testing, maintenance
 * 
 * 3. DEPENDENCIES ARE INJECTED
 *    Classes don't create their own dependencies
 *    Framework manages object lifecycle
 *    Enables testing and flexibility
 * 
 * 4. DATA FLOWS UNIDIRECTIONALLY
 *    Down via @Input properties
 *    Up via @Output events and Services
 *    Reduces bugs from circular data flow
 * 
 * 5. CHANGE DETECTION IS KEY
 *    Angular keeps view in sync with data
 *    But must understand cost (use OnPush when needed)
 * 
 * 6. RXJS IS THE GLUE
 *    Observables compose async operations elegantly
 *    Replaces callback hell
 *    Powerful for complex async scenarios
 * 
 * 7. MODULES ORGANIZE CODE
 *    Group related features
 *    Create clear boundaries
 *    Enable lazy loading
 * 
 * 8. SECURITY IS BUILT-IN
 *    But developers must follow best practices
 *    Angular handles XSS prevention, CSRF tokens
 *    But input validation, authentication, authorization needed
 * 
 * 9. PERFORMANCE REQUIRES UNDERSTANDING
 *    OnPush change detection
 *    Lazy loading modules
 *    TrackBy in loops
 *    Unsubscribe pattern
 * 
 * 10. DESIGN PATTERNS MATTER
 *     Use proven patterns (Container/Presenter, Facade, etc.)
 *     SOLID principles = flexible, maintainable code
 *     TypeScript enables safer patterns
 */
