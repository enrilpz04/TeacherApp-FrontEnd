import { Component, Input } from '@angular/core';
import { ITeacher } from '../../interfaces/iteacher.interface';
import { TeacherCardComponent } from '../teacher-card/teacher-card.component';

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [TeacherCardComponent],
  templateUrl: './teacher-list.component.html',
  styleUrl: './teacher-list.component.css'
})
export class TeacherListComponent {
  @Input() teacherList : ITeacher[] = []
}
