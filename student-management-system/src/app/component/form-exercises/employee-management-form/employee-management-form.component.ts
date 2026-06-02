import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-employee-management-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-management-form.component.html',
  styleUrls: ['./employee-management-form.component.css']
})
export class EmployeeManagementFormComponent {
  employeeForm: FormGroup;
  availableTechnologies = ['Angular', 'React', 'Vue', 'Node.js', 'Python', 'Java', 'C#', 'TypeScript'];
  submitted = false;
  submittedData: any = null;

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      employeeName: ['', Validators.required],
      experience: ['', [Validators.required, Validators.min(0)]],
      technologies: this.createTechnologiesArray()
    }, { validators: this.minTechnologiesValidator });
  }

  createTechnologiesArray(): FormArray {
    return this.fb.array(
      this.availableTechnologies.map(() => this.fb.control(false))
    );
  }

  get technologies(): FormArray {
    return this.employeeForm.get('technologies') as FormArray;
  }

  minTechnologiesValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const technologiesArray = control.get('technologies') as FormArray;
    if (technologiesArray) {
      const checkedCount = technologiesArray.value.filter((value: boolean) => value).length;
      return checkedCount >= 2 ? null : { 'minTechnologies': true };
    }
    return null;
  }

  getSelectedTechnologies(): string[] {
    return this.technologies.value
      .map((checked: boolean, index: number) => checked ? this.availableTechnologies[index] : null)
      .filter((value: string | null) => value !== null);
  }

  onSubmit() {
    this.submitted = true;
    if (this.employeeForm.valid) {
      this.submittedData = {
        ...this.employeeForm.value,
        technologies: this.getSelectedTechnologies()
      };
      console.log('Employee Management Form Submitted:', this.submittedData);
    }
  }

  onReset() {
    this.employeeForm.reset({
      employeeName: '',
      experience: '',
      technologies: this.availableTechnologies.map(() => false)
    });
    this.submitted = false;
    this.submittedData = null;
  }
}
