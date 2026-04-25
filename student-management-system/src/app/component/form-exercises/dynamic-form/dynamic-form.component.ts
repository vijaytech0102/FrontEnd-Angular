import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent {
  dynamicForm!: FormGroup;
  submitted = false;
  formData: any = null;

  constructor(private fb: FormBuilder) {
    this.initializeForm();
  }

  initializeForm() {
    this.dynamicForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      skills: this.fb.array([
        this.fb.control('', Validators.required)
      ])
    });
  }

  get name() {
    return this.dynamicForm.get('name');
  }

  get skills() {
    return this.dynamicForm.get('skills') as FormArray;
  }

  addSkill() {
    this.skills.push(this.fb.control('', Validators.required));
  }

  removeSkill(index: number) {
    if (this.skills.length > 1) {
      this.skills.removeAt(index);
    } else {
      alert('You must have at least one skill!');
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.dynamicForm.invalid) {
      return;
    }

    this.formData = {
      name: this.dynamicForm.get('name')?.value,
      skills: this.skills.value.filter((skill: string) => skill.trim() !== '')
    };

    console.log('Form Submitted:', this.formData);
  }

  resetForm() {
    this.dynamicForm.reset();
    this.skills.clear();
    this.skills.push(this.fb.control('', Validators.required));
    this.submitted = false;
    this.formData = null;
  }

  getNameError(): string {
    if (this.name?.hasError('required')) {
      return 'Name is required';
    }
    if (this.name?.hasError('minlength')) {
      return 'Name must be at least 3 characters';
    }
    return '';
  }

  getSkillError(index: number): string {
    const skill = this.skills.at(index);
    if (skill?.hasError('required')) {
      return 'Skill name is required';
    }
    return '';
  }
}
