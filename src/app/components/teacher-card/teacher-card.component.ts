import { Component, Input } from '@angular/core';
import { ITeacher } from '../../interfaces/iteacher.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-teacher-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './teacher-card.component.html',
  styleUrl: './teacher-card.component.css'
})
export class TeacherCardComponent {
  @Input() teacher : any;
}
