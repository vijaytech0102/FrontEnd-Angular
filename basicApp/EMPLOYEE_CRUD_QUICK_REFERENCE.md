# Employee CRUD Quick Reference

## Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm build

# Run tests
npm test
```

## Component Quick Reference

### EmployeeListComponent
**Location:** `src/app/component/employee-list/`
- Displays all employees in a table
- Search and filter functionality
- Delete functionality with confirmation
- Statistics dashboard

**Key Methods:**
- `loadEmployees()` - Load all employees
- `deleteEmployee(id)` - Delete an employee
- `searchEmployees()` - Search by term
- `filterByDepartment()` - Filter by department

### EmployeeFormComponent
**Location:** `src/app/component/employee-form/`
- Add new employee form
- Edit existing employee form
- Form validation
- Error handling

**Key Methods:**
- `ngOnInit()` - Initialize form
- `onSubmit()` - Submit form
- `onCancel()` - Cancel form
- `getErrorMessage(controlName)` - Get validation errors

### EmployeeService
**Location:** `src/app/service/`
- Business logic for employee management
- State management with BehaviorSubject
- CRUD operations

**Key Methods:**
- `getEmployees()` - Get all employees (Observable)
- `getEmployeeById(id)` - Get single employee
- `addEmployee(employee)` - Create new employee
- `updateEmployee(id, employee)` - Update employee
- `deleteEmployee(id)` - Delete employee
- `searchEmployees(term)` - Search employees
- `getEmployeesByDepartment(dept)` - Filter by department

## Routes

```
/ → Home
/home → Home Component
/employee → Employee List (View All)
/employee/add → Add New Employee Form
/employee/edit/:id → Edit Employee Form
```

## Form Fields

| Field | Type | Validation |
|-------|------|-----------|
| First Name | Text | Required, min 2 chars |
| Last Name | Text | Required, min 2 chars |
| Email | Email | Required, valid email |
| Phone | Tel | Required, 10 digits |
| Department | Select | Required |
| Position | Select | Required |
| Salary | Number | Required, min 0 |
| Date of Joining | Date | Required |

## Departments Available
- IT
- HR
- Finance
- Marketing
- Operations

## Positions Available
- Manager
- Senior Developer
- Developer
- Junior Developer
- HR Manager
- Financial Analyst
- Marketing Executive

## Default Sample Employees

| ID | Name | Email | Department | Position |
|----|------|-------|-----------|----------|
| 1 | John Doe | john.doe@example.com | IT | Senior Developer |
| 2 | Jane Smith | jane.smith@example.com | HR | HR Manager |
| 3 | Mike Johnson | mike.johnson@example.com | Finance | Financial Analyst |

## Styling Classes

### Buttons
- `.btn-primary` - Primary action buttons
- `.btn-secondary` - Secondary action buttons
- `.btn-edit` - Edit buttons (green)
- `.btn-delete` - Delete buttons (red)
- `.btn-danger` - Danger action buttons

### Status
- `.status.active` - Active status (green)
- `.status.inactive` - Inactive status (orange)

### Alerts
- `.alert-success` - Success message
- `.alert-error` - Error message

## CSS Color Scheme

- **Primary Gradient:** `#667eea` → `#764ba2`
- **Success Green:** `#4caf50`
- **Error Red:** `#f44336`
- **Background:** `#f5f5f5`
- **Text:** `#333`

## File Structure Summary

```
basicApp/
├── src/
│   ├── app/
│   │   ├── component/
│   │   │   ├── employee-list/
│   │   │   ├── employee-form/
│   │   │   ├── navbar/
│   │   │   ├── home/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── model/
│   │   │   └── employee.model.ts
│   │   ├── service/
│   │   │   └── employee.service.ts
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.routes.ts
│   │   └── app.config.ts
│   ├── main.ts
│   ├── index.html
│   ├── styles.css
│   └── assets/
├── package.json
├── tsconfig.json
└── angular.json
```

## Tips & Tricks

### Adding New Department
1. Update `departments` array in `employee-list.component.ts`
2. Update `departments` array in `employee-form.component.ts`

### Adding New Position
Update `positions` array in `employee-form.component.ts`

### Changing Color Scheme
Update gradient colors in:
- `employee-list.component.css` (header)
- `employee-form.component.css` (form-header)

### Customizing Table Columns
Edit table headers and body in `employee-list.component.html`

### Modifying Validation Rules
Update validators in `employee-form.component.ts` `initializeForm()` method

## Common Tasks

### Change Default Sample Data
Edit `employee.service.ts` - `employees` array initialization

### Add New Search Field
1. Update search logic in `searchEmployees()` method
2. Add field to condition check

### Create Export Feature
1. Add export method to `EmployeeService`
2. Create export functionality in list component

### Add Pagination
1. Create pagination pipe
2. Update table template to use pagination
3. Add pagination controls

## Debugging Tips

### Check Component Display
Open browser developer tools (F12)
- Go to Angular DevTools tab
- Select component in component tree

### Check Service Data
In browser console:
```javascript
// After injecting service
console.log(this.employeeService.getEmployees())
```

### Monitor Form State
```typescript
console.log(this.employeeForm.value)
console.log(this.employeeForm.valid)
```

## Performance Optimization

- Employee service uses in-memory storage
- BehaviorSubject for efficient state updates
- Standalone components for smaller bundle size
- OnPush change detection recommended for large lists

---

**Last Updated:** 2026
