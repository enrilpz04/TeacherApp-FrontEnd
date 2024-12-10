import { Component } from '@angular/core';
import { TeacherFormComponent } from "../../components/teacher-form/teacher-form.component";

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [TeacherFormComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

}
