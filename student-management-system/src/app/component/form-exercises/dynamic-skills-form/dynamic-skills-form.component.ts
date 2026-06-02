import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-skills-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dynamic-skills-form.component.html',
  styleUrls: ['./dynamic-skills-form.component.css']
})
export class DynamicSkillsFormComponent {
  skillsForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.skillsForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      skills: this.fb.array([this.createSkillControl()], Validators.required)
    });
  }

  createSkillControl() {
    return this.fb.control('', Validators.required);
  }

  get skills(): FormArray {
    return this.skillsForm.get('skills') as FormArray;
  }

  addSkill() {
    this.skills.push(this.createSkillControl());
  }

  removeSkill(index: number) {
    if (this.skills.length > 1) {
      this.skills.removeAt(index);
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.skillsForm.valid) {
      console.log('Dynamic Skills Form Submitted:', this.skillsForm.value);
    }
  }

  onReset() {
    this.skillsForm.reset({
      name: '',
      skills: ['']
    });
    this.submitted = false;
  }
}
