import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: Employee[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '9876543210',
      department: 'IT',
      position: 'Senior Developer',
      salary: 95000,
      dateOfJoining: '2020-01-15',
      status: 'Active'
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '9876543211',
      department: 'HR',
      position: 'HR Manager',
      salary: 75000,
      dateOfJoining: '2019-03-20',
      status: 'Active'
    },
    {
      id: 3,
      firstName: 'Mike',
      lastName: 'Johnson',
      email: 'mike.johnson@example.com',
      phone: '9876543212',
      department: 'Finance',
      position: 'Financial Analyst',
      salary: 85000,
      dateOfJoining: '2021-06-10',
      status: 'Active'
    }
  ];

  private employeeSubject = new BehaviorSubject<Employee[]>(this.employees);
  private nextId = 4;

  constructor() {}

  // Get all employees
  getEmployees(): Observable<Employee[]> {
    return this.employeeSubject.asObservable();
  }

  // Get employee by ID
  getEmployeeById(id: number): Employee | undefined {
    return this.employees.find(emp => emp.id === id);
  }

  // Create new employee
  addEmployee(employee: Employee): void {
    employee.id = this.nextId++;
    employee.status = 'Active';
    this.employees.push(employee);
    this.employeeSubject.next([...this.employees]);
  }

  // Update employee
  updateEmployee(id: number, updatedEmployee: Employee): void {
    const index = this.employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      this.employees[index] = { ...updatedEmployee, id };
      this.employeeSubject.next([...this.employees]);
    }
  }

  // Delete employee
  deleteEmployee(id: number): void {
    this.employees = this.employees.filter(emp => emp.id !== id);
    this.employeeSubject.next([...this.employees]);
  }

  // Search employees
  searchEmployees(searchTerm: string): Employee[] {
    const term = searchTerm.toLowerCase();
    return this.employees.filter(emp =>
      emp.firstName.toLowerCase().includes(term) ||
      emp.lastName.toLowerCase().includes(term) ||
      emp.email.toLowerCase().includes(term) ||
      emp.department.toLowerCase().includes(term)
    );
  }

  // Get employees by department
  getEmployeesByDepartment(department: string): Employee[] {
    return this.employees.filter(emp => emp.department === department);
  }
}
