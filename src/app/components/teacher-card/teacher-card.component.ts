import { Component, Input } from '@angular/core';
import { ITeacher } from '../../interfaces/iteacher.interface';

@Component({
  selector: 'app-teacher-card',
  standalone: true,
  imports: [],
  templateUrl: './teacher-card.component.html',
  styleUrl: './teacher-card.component.css'
})
export class TeacherCardComponent {
  @Input() teacher : any;
}
