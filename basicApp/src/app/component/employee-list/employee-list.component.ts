import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Employee } from '../../model/employee.model';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchTerm: string = '';
  selectedDepartment: string = '';
  departments: string[] = ['IT', 'HR', 'Finance', 'Marketing', 'Operations'];
  showDeleteConfirm: boolean = false;
  employeeToDelete: Employee | null = null;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
      this.filteredEmployees = data;
    });
  }

  deleteEmployee(id: number | undefined): void {
    if (id) {
      this.employeeService.deleteEmployee(id);
      this.showDeleteConfirm = false;
      this.employeeToDelete = null;
    }
  }

  openDeleteConfirm(employee: Employee): void {
    this.employeeToDelete = employee;
    this.showDeleteConfirm = true;
  }

  closeDeleteConfirm(): void {
    this.showDeleteConfirm = false;
    this.employeeToDelete = null;
  }

  searchEmployees(): void {
    if (!this.searchTerm && !this.selectedDepartment) {
      this.filteredEmployees = this.employees;
    } else if (this.searchTerm) {
      this.filteredEmployees = this.employeeService.searchEmployees(this.searchTerm);
    } else if (this.selectedDepartment) {
      this.filteredEmployees = this.employeeService.getEmployeesByDepartment(this.selectedDepartment);
    }
  }

  filterByDepartment(): void {
    this.searchEmployees();
  }

  getTotalEmployees(): number {
    return this.employees.length;
  }

  getActiveEmployees(): number {
    return this.employees.filter(emp => emp.status === 'Active').length;
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedDepartment = '';
    this.filteredEmployees = this.employees;
  }
}
