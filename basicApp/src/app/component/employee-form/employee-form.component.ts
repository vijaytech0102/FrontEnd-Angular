import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../model/employee.model';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit {
  employeeForm!: FormGroup;
  isEditMode: boolean = false;
  pageTitle: string = 'Add New Employee';
  submitButtonText: string = 'Add Employee';
  employeeId: number | null = null;
  departments: string[] = ['IT', 'HR', 'Finance', 'Marketing', 'Operations'];
  positions: string[] = ['Manager', 'Senior Developer', 'Developer', 'Junior Developer', 'HR Manager', 'Financial Analyst', 'Marketing Executive'];
  submitted: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.employeeId = parseInt(params['id']);
        this.isEditMode = true;
        this.pageTitle = 'Edit Employee';
        this.submitButtonText = 'Update Employee';
        this.loadEmployeeData();
      }
    });
  }

  initializeForm(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      department: ['', Validators.required],
      position: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
      dateOfJoining: ['', Validators.required]
    });
  }

  loadEmployeeData(): void {
    if (this.employeeId) {
      const employee = this.employeeService.getEmployeeById(this.employeeId);
      if (employee) {
        this.employeeForm.patchValue({
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          phone: employee.phone,
          department: employee.department,
          position: employee.position,
          salary: employee.salary,
          dateOfJoining: employee.dateOfJoining
        });
      }
    }
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.employeeForm.invalid) {
      this.errorMessage = 'Please fill all required fields correctly.';
      return;
    }

    const formData = this.employeeForm.value;

    try {
      if (this.isEditMode && this.employeeId) {
        this.employeeService.updateEmployee(this.employeeId, formData);
        this.router.navigate(['/employee']);
      } else {
        this.employeeService.addEmployee(formData);
        this.router.navigate(['/employee']);
      }
    } catch (error) {
      this.errorMessage = 'An error occurred while saving the employee.';
      console.error(error);
    }
  }

  onCancel(): void {
    this.router.navigate(['/employee']);
  }

  getControl(name: string) {
    return this.employeeForm.get(name);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.employeeForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched || this.submitted));
  }

  getErrorMessage(controlName: string): string {
    const control = this.employeeForm.get(controlName);
    if (control?.hasError('required')) {
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required.`;
    }
    if (control?.hasError('email')) {
      return 'Please enter a valid email.';
    }
    if (control?.hasError('minLength')) {
      return `Minimum length is ${control.errors?.['minLength'].requiredLength}.`;
    }
    if (control?.hasError('min')) {
      return 'Salary must be greater than 0.';
    }
    if (control?.hasError('pattern')) {
      return 'Phone number must be 10 digits.';
    }
    return '';
  }
}
