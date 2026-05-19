import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-example',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './template-example.component.html',
  styleUrl: './template-example.component.css'
})
export class TemplateExampleComponent {

  user = {
    email: '',
    password: ''
  };

  onSubmit(form: NgForm) {

    console.log('Template Form Data:', form.value);

    form.reset();

  }

}