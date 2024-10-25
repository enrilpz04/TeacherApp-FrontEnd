import { Component, inject } from '@angular/core';
import { FilterComponent } from '../../components/filter/filter.component';
import { TeacherListComponent } from '../../components/teacher-list/teacher-list.component';
import { IFilterOptions } from '../../interfaces/ifilter-options';
import { ITeacher } from '../../interfaces/iteacher.interface';
import { UsersService } from '../../services/users.service';
import { TeachersService } from '../../services/teachers.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FilterComponent, TeacherListComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  teacherList : ITeacher[] = []

  usersService = inject(UsersService);
  teachersService = inject(TeachersService);

  filterOptions: IFilterOptions = {
    name: '',
    knowledge: '',
    minPrice: 0,
    maxPrice: 1000,
    schedule: '',
    orderOption: ''

  };

  ngOnInit() {
    this.getTeachers();
  }

  getFilterOptions(event: IFilterOptions): void {
    this.filterOptions = event;
    this.getTeachers()
  }

  getTeachers(): void {
    const users = this.usersService.getTeachersByName(this.filterOptions.name);
    this.teacherList = this.teachersService.getTeachersFiltered(users, this.filterOptions);
  }



}
