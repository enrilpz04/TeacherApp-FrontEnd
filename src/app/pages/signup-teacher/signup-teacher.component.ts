import { Component } from '@angular/core';
import { TeacherFormComponent } from '../../components/teacher-form/teacher-form.component';

@Component({
  selector: 'app-signup-teacher',
  standalone: true,
  imports: [TeacherFormComponent],
  templateUrl: './signup-teacher.component.html',
  styleUrl: './signup-teacher.component.css'
})
export class SignupTeacherComponent {

}
