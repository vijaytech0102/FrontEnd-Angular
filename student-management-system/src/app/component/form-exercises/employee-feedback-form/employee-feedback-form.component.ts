import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-feedback-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-feedback-form.component.html',
  styleUrls: ['./employee-feedback-form.component.css']
})
export class EmployeeFeedbackFormComponent {
  feedback = {
    employeeName: '',
    department: '',
    rating: '',
    feedbackText: ''
  };

  departments = ['IT', 'HR', 'Sales', 'Marketing', 'Finance'];
  submitted = false;

  onSubmit() {
    this.submitted = true;
    console.log('Employee Feedback Submitted:', this.feedback);
    setTimeout(() => {
      this.onReset();
    }, 2000);
  }

  onReset() {
    this.feedback = {
      employeeName: '',
      department: '',
      rating: '',
      feedbackText: ''
    };
    this.submitted = false;
  }
}
