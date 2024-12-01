import { Component, inject } from '@angular/core';
import { ITeacher } from '../../interfaces/iteacher.interface';
import { TeachersService } from '../../services/teachers.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teacher-view',
  standalone: true,
  imports: [],
  templateUrl: './teacher-view.component.html',
  styleUrl: './teacher-view.component.css'
})
export class TeacherViewComponent {

  teacher!: ITeacher;
  schedule!: string;

  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  teachersService: TeachersService = inject(TeachersService);

  ngOnInit() {
    this.activatedRoute.params.subscribe( async (params: any) => {
      let id = params.id;
      this.teacher = await this.teachersService.getTeacherById(id);
      switch(this.teacher.schedule) {
        case 'Morning':
          this.schedule = '10:00h - 14:00h';
          break;
        case 'Afternoon':
          this.schedule = '14:00h - 18:00h';
          break;
        case 'Night':
          this.schedule = '18:00h - 22:00h';
          break;
      }
    })
  }
}
