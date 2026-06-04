import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Employee } from '../models/employee.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'   // singleton, available app-wide without declaring in a module
})
export class EmployeeService {

  private apiUrl = `${environment.apiUrl}/employees`;  // http://localhost:8080/api/employees

  constructor(private http: HttpClient) {}

  // GET /api/employees  → returns all employees
  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // GET /api/employees/:id  → returns one employee
  getById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // POST /api/employees  → creates a new employee
  create(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee).pipe(
      catchError(this.handleError)
    );
  }

  // PUT /api/employees/:id  → updates an existing employee
  update(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, employee).pipe(
      catchError(this.handleError)
    );
  }

  // DELETE /api/employees/:id  → deletes an employee
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // GET /api/employees/department/:dept
  getByDepartment(dept: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/department/${dept}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let message = 'An unknown error occurred';
    if (error.status === 0) {
      message = 'Cannot connect to server. Is the backend running?';
    } else if (error.error instanceof Object) {
      message = error.error.message || error.statusText;
    } else {
      message = error.error || error.statusText;
    }
    return throwError(() => new Error(message));
  }
}
