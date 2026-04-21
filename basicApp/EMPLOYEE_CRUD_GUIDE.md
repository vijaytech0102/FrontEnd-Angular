# Employee CRUD Management System - Angular 21

## Overview
This is a comprehensive Employee CRUD (Create, Read, Update, Delete) management system built with **Angular 21**. The application allows you to manage employee records efficiently with a modern, responsive UI.

## Features

### 1. **Create Operations**
   - Add new employees with detailed information
   - Form validation with error messages
   - Auto-generated employee IDs
   - Default status set to "Active"

### 2. **Read Operations**
   - Display all employees in a dynamic table
   - View employee details
   - Employee statistics dashboard
   - Search employees by name, email, or department
   - Filter employees by department

### 3. **Update Operations**
   - Edit existing employee information
   - Pre-populated form with current data
   - Real-time form validation
   - Confirmation before changes

### 4. **Delete Operations**
   - Remove employees from the system
   - Delete confirmation modal
   - Prevents accidental deletions

## Project Structure

```
src/
├── app/
│   ├── component/
│   │   ├── employee-list/
│   │   │   ├── employee-list.component.ts
│   │   │   ├── employee-list.component.html
│   │   │   └── employee-list.component.css
│   │   ├── employee-form/
│   │   │   ├── employee-form.component.ts
│   │   │   ├── employee-form.component.html
│   │   │   └── employee-form.component.css
│   │   ├── navbar/
│   │   ├── home/
│   │   ├── login/
│   │   └── register/
│   ├── model/
│   │   └── employee.model.ts
│   ├── service/
│   │   └── employee.service.ts
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.routes.ts
│   └── ...
```

## Employee Model

```typescript
export interface Employee {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  salary: number;
  dateOfJoining: string;
  status?: string;
}
```

## Service Methods

The `EmployeeService` provides the following methods:

### GetEmployees
```typescript
getEmployees(): Observable<Employee[]>
```
Returns all employees as an Observable.

### Get Employee by ID
```typescript
getEmployeeById(id: number): Employee | undefined
```
Retrieves a specific employee by ID.

### Add Employee
```typescript
addEmployee(employee: Employee): void
```
Creates a new employee record.

### Update Employee
```typescript
updateEmployee(id: number, updatedEmployee: Employee): void
```
Updates an existing employee's information.

### Delete Employee
```typescript
deleteEmployee(id: number): void
```
Removes an employee from the system.

### Search Employees
```typescript
searchEmployees(searchTerm: string): Employee[]
```
Searches for employees by name, email, or department.

### Get Employees by Department
```typescript
getEmployeesByDepartment(department: string): Employee[]
```
Retrieves all employees in a specific department.

## Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home | Landing page |
| `/home` | Home | Home page |
| `/employee` | EmployeeListComponent | View all employees |
| `/employee/add` | EmployeeFormComponent | Add new employee |
| `/employee/edit/:id` | EmployeeFormComponent | Edit existing employee |

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Update Angular to Version 21
```bash
npm update @angular/core @angular/common @angular/router @angular/forms
```

### 3. Run Development Server
```bash
npm start
# or
ng serve
```

The application will be available at `http://localhost:4200`

## Usage Guide

### Adding an Employee
1. Click "Add New Employee" button
2. Fill in all required fields (marked with *)
3. Select appropriate department and position
4. Enter valid email and 10-digit phone number
5. Click "Add Employee" button

### Viewing Employees
1. Navigate to Employee Management from navbar
2. View all employees in table format
3. See statistics (Total & Active employees)

### Searching & Filtering
1. Use the search box to find employees by name, email, or department
2. Use the department filter dropdown
3. Click "Clear Filters" to reset

### Editing an Employee
1. Click "Edit" button next to an employee
2. Modify the required information
3. Click "Update Employee" button

### Deleting an Employee
1. Click "Delete" button next to an employee
2. Confirm deletion in the modal dialog
3. Employee will be removed from the system

## Form Validation

### Required Fields
- First Name (minimum 2 characters)
- Last Name (minimum 2 characters)
- Email (valid email format)
- Phone (10-digit number)
- Department
- Position
- Salary (minimum 0)
- Date of Joining

### Error Messages
- Custom error messages for each validation rule
- Real-time validation feedback
- Form submission prevention on invalid data

## Styling & UI

- Modern gradient header design
- Responsive table layout
- Modal dialogs for confirmations
- Color-coded status badges
- Interactive buttons with hover effects
- Mobile-friendly responsive design
- Professional color scheme (Purple & Blue gradients)

### Available Departments
- IT
- HR
- Finance
- Marketing
- Operations

### Available Positions
- Manager
- Senior Developer
- Developer
- Junior Developer
- HR Manager
- Financial Analyst
- Marketing Executive

## Default Sample Data

The service comes with 3 default employees:
1. John Doe - Senior Developer (IT)
2. Jane Smith - HR Manager (HR)
3. Mike Johnson - Financial Analyst (Finance)

## Technologies Used

- **Angular 21** - Frontend framework
- **TypeScript** - Programming language
- **RxJS** - Reactive programming
- **Angular Forms** - Form handling (Reactive & Template-driven)
- **Angular Router** - Navigation
- **CSS3** - Styling with responsive design

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Features

- Standalone components (Angular 14+)
- Observable streams for state management
- BehaviorSubject for reactive updates
- Efficient change detection
- Lazy loading ready

## Future Enhancements

- [ ] Backend API integration (REST/GraphQL)
- [ ] Database integration
- [ ] Advanced search filters
- [ ] Export to CSV/Excel
- [ ] Pagination
- [ ] Role-based access control
- [ ] Employee performance metrics
- [ ] Department-wise reports
- [ ] Salary analytics
- [ ] Employee history tracking

## Building for Production

```bash
npm run build
# or
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## Testing

Run unit tests:
```bash
npm test
# or
ng test
```

## Troubleshooting

### Port Already in Use
```bash
ng serve --port 4201
```

### Module Not Found Errors
```bash
npm install
ng build
```

### Form Validation Issues
- Ensure all required fields are filled
- Check email format
- Verify phone number is 10 digits
- Confirm salary is greater than 0

## Contributing

Contributions are welcome! Please create a pull request with detailed descriptions of changes.

## License

This project is open source and available under the MIT License.

## Support

For support and questions, please open an issue in the repository.

---

**Version:** 1.0.0  
**Last Updated:** 2026  
**Angular Version:** 21.0.0
