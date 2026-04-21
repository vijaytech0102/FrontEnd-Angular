# Angular Basics - Professional Guide
## Industry-Standard Explanations & Best Practices

---

## 1. **INTERPOLATION** - Display Data in Templates
### What It Is
Interpolation is the process of embedding component property values directly into HTML templates using the mustache syntax `{{ }}`.

### How It Works
```typescript
// Component
export class AppComponent {
  title = 'Angular Basics Guide';
  appVersion = '15.0.0';
}
```

```html
<!-- Template -->
<h1>{{ title }}</h1>
<p>Version: {{ appVersion }}</p>
```

### Key Industry Points
✅ **Best Practice:** Use interpolation for simple data display only
❌ **Avoid:** Complex logic inside interpolation - move it to the component

### Real-World Use Cases
- Displaying user names, titles, labels
- Showing dynamic content like product names, descriptions
- Rendering dates, counts, status messages

### Performance Consideration
- Interpolations are evaluated every change detection cycle
- Keep expressions simple for better performance

---

## 2. **TWO-WAY BINDING** - Synchronize Data Bidirectionally
### What It Is
Two-way binding automatically synchronizes data between the component class and template. When user updates the input, component property updates. When component property changes, template updates.

### How It Works
```typescript
// Component
export class AppComponent {
  userName: string = '';
  userEmail: string = '';
  
  get greeting(): string {
    return this.userName ? `Hello, ${this.userName}!` : 'Hello, Guest!';
  }
}
```

```html
<!-- Template -->
<input [(ngModel)]="userName" placeholder="Enter name" />
<input [(ngModel)]="userEmail" placeholder="Enter email" />
<p>{{ greeting }}</p>
```

### Important Implementation Detail
**Requires `FormsModule`** - Add this to your component or app configuration:
```typescript
// For standalone components
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  template: `...`
})
export class AppComponent {}
```

### Industry Best Practices
✅ **DO:**
- Use for simple form inputs
- Combine with validation for user forms
- Clear visual feedback when data changes

❌ **DON'T:**
- Overuse for large forms (use reactive forms instead)
- Bind to complex objects without proper tracking
- Use for performance-sensitive real-time data

### When to Use vs. Alternatives
| Scenario | Use |
|----------|-----|
| Simple input fields | Two-way binding |
| Complex forms with validation | Reactive Forms |
| Read-only display | Property binding only |
| Real-time data updates | RxJS subscriptions |

---

## 3. **PROPERTY BINDING** - One-Way Data to Template
### What It Is
Property binding passes component data to DOM element properties (one direction only - component → template).

### How It Works
```typescript
// Component
export class AppComponent {
  imageUrl = 'https://example.com/logo.png';
  isDisabled = false;
  placeholder = 'Type something...';
  
  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
  }
}
```

```html
<!-- Template -->
<img [src]="imageUrl" [alt]="'Logo'" />
<button [disabled]="isDisabled">Submit</button>
<input [placeholder]="placeholder" />
```

### Syntax Variations
```html
<!-- Binding Syntax -->
<button [disabled]="isDisabled">Button</button>

<!-- Attribute Binding (for non-standard properties) -->
<button [attr.aria-label]="label">Button</button>

<!-- Direct Property -->
<button disabled="{{ isDisabled }}">Button</button>  <!-- NOT recommended -->
```

### Industry Best Practices
✅ **DO:**
- Bind standard DOM properties like `disabled`, `src`, `href`, `value`
- Use for conditional rendering of attributes
- Combine with directives for complex conditions

❌ **DON'T:**
- Bind to non-existent properties without checking
- Use for security-sensitive attributes without sanitization
- Rely on property binding for large data structures

### Common Property Bindings in Production
```html
<!-- Images -->
<img [src]="imageUrl" [alt]="altText" />

<!-- Links -->
<a [href]="dynamicUrl" [title]="linkTitle">Link</a>

<!-- Forms -->
<input [value]="inputValue" [placeholder]="hint" [disabled]="!isEditable" />

<!-- Visibility -->
<div [hidden]="shouldHide">Content</div>

<!-- Class/Styles via property -->
<div [className]="dynamicClass">Content</div>
```

---

## 4. **EVENT BINDING** - Respond to User Interactions
### What It Is
Event binding listens to user actions (click, input, change, etc.) and triggers component methods.

### How It Works
```typescript
// Component
export class AppComponent {
  clickCount = 0;
  isLoggedIn = false;
  showDetails = false;
  
  handleClick() {
    this.clickCount++;
  }
  
  toggleLogin() {
    this.isLoggedIn = !this.isLoggedIn;
  }
  
  toggleDetails() {
    this.showDetails = !this.showDetails;
  }
  
  clearForm() {
    this.clickCount = 0;
    this.isLoggedIn = false;
    this.showDetails = false;
  }
}
```

```html
<!-- Template -->
<button (click)="handleClick()">Click Me!</button>
<p>Clicked: {{ clickCount }} times</p>

<button (click)="toggleLogin()">{{ isLoggedIn ? 'Logout' : 'Login' }}</button>
```

### Common Event Bindings
```html
<!-- Mouse Events -->
<button (click)="onButtonClick()">Click</button>
<div (mouseenter)="onMouseEnter()" (mouseleave)="onMouseLeave()">Hover</div>
<div (dblclick)="onDoubleClick()">Double Click</div>

<!-- Form Events -->
<input (input)="onInput($event)" />
<input (change)="onChange($event)" />
<form (submit)="onSubmit($event)">...</form>

<!-- Keyboard Events -->
<input (keyup)="onKeyUp($event)" />
<input (keydown.enter)="onEnter($event)" />
<input (keyup.escape)="onEscape($event)" />
```

### Accessing Event Data
```typescript
// Good Practice - Typed Event
handleChange(event: Event) {
  const input = event.target as HTMLInputElement;
  console.log(input.value);
}

// Or use $event in template
<input (input)="inputValue = $event.target.value" />
```

### Industry Best Practices
✅ **DO:**
- Extract logic to component methods (don't put complex logic in template)
- Use specific events (not just generic click)
- Handle edge cases and validation

❌ **DON'T:**
- Put complex calculations in event handlers
- Create multiple event handlers for same action
- Forget to unsubscribe from events in OnDestroy

### Production Example
```typescript
export class FormComponent {
  email = '';
  
  onEmailChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.email = input.value;
    this.validateEmail();
  }
  
  validateEmail() {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
    console.log('Email valid:', isValid);
  }
}
```

---

## 5. **STRUCTURAL DIRECTIVES - *ngIf** - Conditional Rendering
### What It Is
`*ngIf` conditionally includes or removes DOM elements from the page based on a boolean expression.

### How It Works
```typescript
// Component
export class AppComponent {
  isLoggedIn = false;
  showDetails = false;
  userRole = 'user'; // 'user' or 'admin'
}
```

```html
<!-- Simple Condition -->
<p *ngIf="isLoggedIn">You are logged in!</p>
<p *ngIf="!isLoggedIn">Please log in</p>

<!-- If-Else Pattern -->
<div *ngIf="userRole === 'admin'; else notAdmin">
  <p>Admin Panel Access</p>
</div>
<ng-template #notAdmin>
  <p>Regular User View</p>
</ng-template>

<!-- Multiple Conditions -->
<div *ngIf="isLoggedIn && showDetails">
  <h4>Detailed User Information</h4>
</div>
```

### Key Differences: *ngIf vs Hidden
```html
<!-- *ngIf: Removes element from DOM -->
<div *ngIf="condition">Content</div>
<!-- If false: No DOM node exists -->

<!-- [hidden]: Hides with CSS display: none -->
<div [hidden]="condition">Content</div>
<!-- If true: DOM node exists but display: none -->
```

### When to Use Each
| Scenario | Use |
|----------|-----|
| Element rarely needed | `*ngIf` (better performance) |
| Toggling frequently | `[hidden]` (avoids re-render) |
| Complex component | `*ngIf` (removes unnecessary instances) |
| Simple visibility toggle | `[hidden]` (simpler) |

### Industry Best Practices
✅ **DO:**
- Use for conditional rendering of expensive components
- Combine with template references for complex logic
- Clear template with ng-template for else blocks

❌ **DON'T:**
- Overload conditions with complex logic
- Use for performance-critical frequent toggles
- Forget to handle loading/error states

### Production Example
```html
<!-- Loading State Pattern -->
<div *ngIf="isLoading" class="spinner">Loading...</div>
<div *ngIf="!isLoading && data; else noData">
  {{ data | json }}
</div>
<ng-template #noData>
  <p class="error">No data available</p>
</ng-template>
```

---

## 6. **STRUCTURAL DIRECTIVES - *ngFor** - Iteration & Lists
### What It Is
`*ngFor` repeats DOM elements for each item in an array or iterable.

### How It Works
```typescript
// Component
export class AppComponent {
  students = [
    { id: 1, name: 'John', score: 85 },
    { id: 2, name: 'Jane', score: 92 },
    { id: 3, name: 'Bob', score: 78 }
  ];
  
  get totalScore(): number {
    return this.students.reduce((sum, s) => sum + s.score, 0);
  }
  
  removeStudent(id: number) {
    this.students = this.students.filter(s => s.id !== id);
  }
  
  addStudent() {
    // Add logic here
  }
}
```

```html
<!-- Basic Loop -->
<ul>
  <li *ngFor="let student of students">
    {{ student.name }}
  </li>
</ul>

<!-- With Index -->
<li *ngFor="let student of students; let index = index">
  {{ index + 1 }}. {{ student.name }}
</li>

<!-- With Even/Odd -->
<li *ngFor="let student of students; let even = even; let odd = odd"
    [class.even]="even" [class.odd]="odd">
  {{ student.name }}
</li>

<!-- With First/Last -->
<li *ngFor="let student of students; let first = first; let last = last"
    [class.separator]="!last">
  {{ student.name }}
</li>
```

### ngFor Context Variables
```html
<!-- All available variables -->
<div *ngFor="let item of items; 
     let index = index;
     let first = first;
     let last = last;
     let even = even;
     let odd = odd;
     let count = count">
  
  Position: {{ index }} / {{ count }}
  {{ first ? '(First)' : '' }}
  {{ last ? '(Last)' : '' }}
  {{ even ? '[Even]' : '[Odd]' }}
</div>
```

### Performance Optimization: TrackBy
```typescript
// Component - CRITICAL FOR PERFORMANCE WITH LARGE LISTS
export class AppComponent {
  students: Student[] = [];
  
  // Track items by ID for better performance
  trackByStudentId(index: number, student: Student): number {
    return student.id;
  }
}
```

```html
<!-- Use trackBy with large lists -->
<li *ngFor="let student of students; trackBy: trackByStudentId">
  {{ student.name }}
</li>
```

### Industry Best Practices
✅ **DO:**
- Always use `trackBy` for lists with many items (>100)
- Use keys that don't change (ID, UIDs)
- Keep loop logic simple
- Extract complex logic to component

❌ **DON'T:**
- Create functions directly in trackBy in template
- Use objects without trackBy
- Mutate array inside loop
- Nest loops excessively (max 2-3 levels)

### Production Example
```typescript
export class UserListComponent {
  users: User[] = [];
  
  trackByUserId(index: number, user: User): string {
    return user.id; // Better than index
  }
  
  removeUser(userId: string) {
    this.users = this.users.filter(u => u.id !== userId);
  }
}
```

```html
<div class="user-list">
  <div *ngFor="let user of users; trackBy: trackByUserId" class="user-card">
    <h3>{{ user.name }}</h3>
    <p>{{ user.email }}</p>
    <button (click)="removeUser(user.id)">Delete</button>
  </div>
</div>
```

---

## 7. **CLASS BINDING** - Dynamic CSS Classes
### What It Is
Class binding dynamically adds or removes CSS classes based on component conditions.

### How It Works
```typescript
// Component
export class AppComponent {
  isActive = false;
  isDisabled = false;
  
  toggleActive() {
    this.isActive = !this.isActive;
  }
}
```

```html
<!-- Single Class Binding -->
<div [class.active]="isActive">
  Content
</div>

<!-- Multiple Classes -->
<div [class.active]="isActive" [class.disabled]="isDisabled" [class.highlight]="isActive">
  Content
</div>

<!-- Dynamic Class Object -->
<div [ngClass]="{'active': isActive, 'disabled': isDisabled, 'error': hasError}">
  Content
</div>

<!-- Dynamic Class Array -->
<div [ngClass]="[isActive ? 'active' : '', hasError ? 'error' : '']">
  Content
</div>
```

### Syntax Comparison
```html
<!-- 1. Single Class (Best for one or two) -->
<button [class.primary]="isPrimary">Button</button>

<!-- 2. ngClass with Object (Most Common) -->
<button [ngClass]="{'primary': isPrimary, 'secondary': !isPrimary}">Button</button>

<!-- 3. ngClass with Array (For dynamic lists) -->
<button [ngClass]="[buttonClass, sizeClass]">Button</button>

<!-- 4. String Concatenation (NOT recommended) -->
<button class="btn {{ buttonType }}">Button</button>
```

### Industry Best Practices
✅ **DO:**
- Use single class binding for 1-2 classes
- Use `[ngClass]` object syntax for 3+ classes
- Keep class logic in component, not template
- Use meaningful CSS class names

❌ **DON'T:**
- Mix different syntax styles in same file
- Put complex logic in class binding
- Use string concatenation for classes
- Change DOM structure with classes

### Production Example
```typescript
// Component
export class ButtonComponent {
  isLoading = false;
  isDisabled = false;
  buttonType: 'primary' | 'secondary' | 'danger' = 'primary';
  
  get buttonClasses() {
    return {
      'btn': true,
      'btn-primary': this.buttonType === 'primary',
      'btn-secondary': this.buttonType === 'secondary',
      'btn-danger': this.buttonType === 'danger',
      'loading': this.isLoading,
      'disabled': this.isDisabled
    };
  }
}
```

```html
<!-- Template -->
<button [ngClass]="buttonClasses" [disabled]="isDisabled">
  {{ isLoading ? 'Loading...' : 'Submit' }}
</button>
```

### CSS Reference
```css
/* Corresponding CSS -->
.btn {
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn.loading {
  opacity: 0.6;
  pointer-events: none;
}

.btn.disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
```

---

## 8. **STYLE BINDING** - Dynamic Inline Styles
### What It Is
Style binding applies inline CSS styles dynamically based on component properties.

### How It Works
```typescript
// Component
export class AppComponent {
  backgroundColor = '#3498db';
  fontSize = '16';
  textColor = '#ffffff';
}
```

```html
<!-- Single Style Property -->
<div [style.backgroundColor]="backgroundColor">
  Styled Content
</div>

<!-- Multiple Style Properties -->
<div 
  [style.backgroundColor]="backgroundColor"
  [style.fontSize]="fontSize + 'px'"
  [style.color]="textColor">
  Styled Content
</div>

<!-- Dynamic Style Object -->
<div [ngStyle]="{'background-color': backgroundColor, 'font-size': fontSize + 'px'}">
  Styled Content
</div>

<!-- Style with Units -->
<div [style.width.px]="width" [style.height.%]="height">
  Content
</div>
```

### Syntax Variations
```html
<!-- 1. Direct Property (Camel Case) -->
<div [style.backgroundColor]="bgColor">Content</div>

<!-- 2. With Units -->
<div [style.fontSize.px]="fontSize">Content</div>
<div [style.width.%]="widthPercent">Content</div>

<!-- 3. ngStyle Object -->
<div [ngStyle]="{
  'background-color': bgColor,
  'font-size': fontSize + 'px',
  'color': textColor
}">Content</div>

<!-- 4. Multiple (NOT recommended) -->
<div style="margin: 10px" [style.color]="color">Content</div>
```

### Industry Best Practices
✅ **DO:**
- Use CSS classes for static styles (separation of concerns)
- Use style binding for truly dynamic values (colors, sizes from user input)
- Keep style lists separate in component classes
- Use ngStyle for complex dynamic styling

❌ **DON'T:**
- Use style binding for responsive design (use media queries)
- Mix inline styles and class binding excessively
- Store style strings as inline templates
- Use for animation (use animations API instead)

### When Style Binding vs Classes
| Scenario | Use |
|----------|-----|
| Dynamic color picker | Style binding |
| Theme switching | CSS classes |
| Calculated dimensions | Style binding |
| State-based styling | CSS classes |
| User preferences | Style binding |

### Production Example
```typescript
// Component - Theme System
export class ThemeComponent {
  themeColors = {
    light: {
      background: '#ffffff',
      text: '#333333',
      accent: '#007bff'
    },
    dark: {
      background: '#1a1a1a',
      text: '#ffffff',
      accent: '#0056b3'
    }
  };
  
  currentTheme: 'light' | 'dark' = 'light';
  
  get themeStyles() {
    return {
      'background-color': this.themeColors[this.currentTheme].background,
      'color': this.themeColors[this.currentTheme].text
    };
  }
  
  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
  }
}
```

```html
<div [ngStyle]="themeStyles" class="theme-container">
  <h1>Current Theme: {{ currentTheme }}</h1>
  <button (click)="toggleTheme()">Toggle Theme</button>
</div>
```

---

## 9. **PRACTICAL INTEGRATION EXAMPLE** - Complete Form
### Real-World Scenario: Employee Management Form

```typescript
// Component
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Employee {
  id: number;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `...` // See template below
})
export class EmployeeFormComponent {
  // Data Properties
  employees: Employee[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@company.com', role: 'Developer', isActive: true },
    { id: 2, name: 'Bob Smith', email: 'bob@company.com', role: 'Manager', isActive: true },
    { id: 3, name: 'Carol Davis', email: 'carol@company.com', role: 'Designer', isActive: false }
  ];
  
  // Form Properties
  newEmployeeName = '';
  newEmployeeEmail = '';
  newEmployeeRole = 'Developer';
  
  // UI State Properties
  showForm = false;
  filterRole = 'All';
  
  // TrackBy for performance
  trackByEmployeeId(index: number, emp: Employee): number {
    return emp.id;
  }
  
  // Methods
  addEmployee() {
    if (!this.newEmployeeName || !this.newEmployeeEmail) {
      alert('Please fill all fields');
      return;
    }
    
    const newEmp: Employee = {
      id: Math.max(...this.employees.map(e => e.id), 0) + 1,
      name: this.newEmployeeName,
      email: this.newEmployeeEmail,
      role: this.newEmployeeRole,
      isActive: true
    };
    
    this.employees.push(newEmp);
    this.resetForm();
  }
  
  removeEmployee(id: number) {
    this.employees = this.employees.filter(e => e.id !== id);
  }
  
  toggleEmployeeStatus(id: number) {
    const emp = this.employees.find(e => e.id === id);
    if (emp) emp.isActive = !emp.isActive;
  }
  
  resetForm() {
    this.newEmployeeName = '';
    this.newEmployeeEmail = '';
    this.newEmployeeRole = 'Developer';
  }
  
  get filteredEmployees(): Employee[] {
    if (this.filterRole === 'All') return this.employees;
    return this.employees.filter(e => e.role === this.filterRole);
  }
  
  get totalActiveEmployees(): number {
    return this.employees.filter(e => e.isActive).length;
  }
}
```

```html
<!-- Template -->
<div class="employee-container">
  <!-- Header -->
  <header class="header">
    <h1>Employee Management System</h1>
    <p class="stat">Active Employees: <strong>{{ totalActiveEmployees }}</strong> / {{ employees.length }}</p>
  </header>

  <!-- Control Panel -->
  <div class="control-panel">
    <button 
      (click)="showForm = !showForm" 
      [ngClass]="{'btn-primary': !showForm, 'btn-secondary': showForm}">
      {{ showForm ? 'Hide Form' : 'Add Employee' }}
    </button>
    
    <select [(ngModel)]="filterRole" class="filter-select">
      <option value="All">All Roles</option>
      <option value="Developer">Developer</option>
      <option value="Manager">Manager</option>
      <option value="Designer">Designer</option>
    </select>
  </div>

  <!-- Add Employee Form -->
  <div *ngIf="showForm" class="form-section">
    <h2>Add New Employee</h2>
    
    <div class="form-group">
      <label>Name:</label>
      <input 
        type="text" 
        [(ngModel)]="newEmployeeName" 
        placeholder="Enter name"
        class="form-input" />
    </div>

    <div class="form-group">
      <label>Email:</label>
      <input 
        type="email" 
        [(ngModel)]="newEmployeeEmail" 
        placeholder="Enter email"
        class="form-input" />
    </div>

    <div class="form-group">
      <label>Role:</label>
      <select [(ngModel)]="newEmployeeRole" class="form-input">
        <option value="Developer">Developer</option>
        <option value="Manager">Manager</option>
        <option value="Designer">Designer</option>
      </select>
    </div>

    <div class="form-actions">
      <button (click)="addEmployee()" class="btn-primary">Add Employee</button>
      <button (click)="resetForm()" class="btn-secondary">Clear</button>
    </div>
  </div>

  <!-- Employee List -->
  <div class="employee-list-section">
    <h2>Employees ({{ filteredEmployees.length }})</h2>
    
    <div *ngIf="filteredEmployees.length === 0" class="empty-state">
      <p>No employees found</p>
    </div>

    <div *ngIf="filteredEmployees.length > 0" class="employee-cards">
      <div 
        *ngFor="let emp of filteredEmployees; trackBy: trackByEmployeeId"
        [ngClass]="{
          'employee-card': true,
          'active': emp.isActive,
          'inactive': !emp.isActive
        }">
        
        <div class="employee-header">
          <h3>{{ emp.name }}</h3>
          <span class="status-badge" [class.active]="emp.isActive">
            {{ emp.isActive ? 'Active' : 'Inactive' }}
          </span>
        </div>

        <div class="employee-details">
          <p><strong>Email:</strong> {{ emp.email }}</p>
          <p><strong>Role:</strong> {{ emp.role }}</p>
        </div>

        <div class="employee-actions">
          <button 
            (click)="toggleEmployeeStatus(emp.id)"
            [class.btn-accent]="emp.isActive"
            class="btn-small">
            {{ emp.isActive ? 'Deactivate' : 'Activate' }}
          </button>
          <button 
            (click)="removeEmployee(emp.id)" 
            class="btn-danger btn-small">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## 🎯 Summary: When to Use Each Binding Type

| Binding Type | Use Case | Direction | Example |
|---|---|---|---|
| **Interpolation** | Display text/values | Component → Template | `{{ title }}` |
| **Property Binding** | Set DOM properties | Component → Template | `[disabled]="true"` |
| **Event Binding** | Respond to actions | Template → Component | `(click)="handler()"` |
| **Two-Way Binding** | Forms, real-time sync | Bidirectional | `[(ngModel)]="value"` |
| **Class Binding** | Toggle CSS classes | Component → Template | `[class.active]="true"` |
| **Style Binding** | Set inline styles | Component → Template | `[style.color]="color"` |
| **Directives (*ngIf)** | Conditional rendering | Component → Template | `*ngIf="condition"` |
| **Directives (*ngFor)** | List rendering | Component → Template | `*ngFor="let x of arr"` |

---

## 🚀 Industry Best Practices Summary

### Code Quality
✅ Keep logic in components, not templates
✅ Use typed properties and event handlers
✅ Extract complex logic to services
✅ Use meaningful variable names

### Performance
✅ Use `trackBy` with large lists
✅ Use `OnPush` change detection when possible
✅ Unsubscribe from subscriptions
✅ Avoid nested loops

### Security
✅ Sanitize user input before binding
✅ Use property binding for URLs
✅ Avoid innerHTML/dangerouslySetInnerHTML
✅ Validate form data

### Maintainability
✅ Keep components focused and small
✅ Use consistent naming conventions
✅ Document complex bindings
✅ Use Angular style guide recommendations

---

## 📚 Quick Reference Checklist

- [ ] Understand interpolation for text display
- [ ] Know when to use two-way binding (forms)
- [ ] Use property binding for DOM element properties
- [ ] Bind events to component methods
- [ ] Use *ngIf for conditional rendering
- [ ] Use *ngFor with trackBy for lists
- [ ] Apply CSS classes with [class] or [ngClass]
- [ ] Set styles with [style] or [ngStyle]
- [ ] Always import FormsModule for two-way binding
- [ ] Test bindings with proper type checking
