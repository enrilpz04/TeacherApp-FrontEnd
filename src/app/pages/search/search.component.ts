import { Component, inject } from '@angular/core';
import { FilterComponent } from '../../components/filter/filter.component';
import { TeacherListComponent } from '../../components/teacher-list/teacher-list.component';
import { IFilterOptions } from '../../interfaces/ifilter-options';
import { ITeacher } from '../../interfaces/iteacher.interface';
import { UserService } from '../../services/users.service';
import { TeachersService } from '../../services/teachers.service';
import { KnowledgesService } from '../../services/knowledges.service';
import { IKnowledge } from '../../interfaces/iknowledge.interface';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FilterComponent, TeacherListComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  teacherList : ITeacher[] = []
  knowledgeList : IKnowledge[] = []

  usersService = inject(UserService);
  teachersService = inject(TeachersService);
  knowledgeService = inject(KnowledgesService);

  filterOptions: IFilterOptions = {
    name: "",
    knowledge: "",
    minPrice: 0,
    maxPrice: 1000,
    schedule: "",
    orderOption: ""
  };

  ngOnInit() {
    this.getTeachers();
    this.knowledgeList = this.knowledgeService.getAllKnowledges();
  }

  async getFilterOptions(event: IFilterOptions): Promise<void> {
    try {
      this.teacherList = await this.teachersService.getTeachersFiltered(event);
      console.log(this.teacherList);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  }

  async getTeachers(): Promise<void> {
    try {
      this.teacherList = await this.teachersService.getAll();
      console.log(this.teacherList);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  }
}
