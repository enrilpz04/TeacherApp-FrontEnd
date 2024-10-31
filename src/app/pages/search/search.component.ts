import { Component, inject } from '@angular/core';
import { FilterComponent } from '../../components/filter/filter.component';
import { TeacherListComponent } from '../../components/teacher-list/teacher-list.component';
import { IFilterOptions } from '../../interfaces/ifilter-options';
import { ITeacher } from '../../interfaces/iteacher.interface';
import { UsersService } from '../../services/users.service';
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

  usersService = inject(UsersService);
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
    this.teacherList = this.teachersService.getTeachersFiltered(this.filterOptions);
    this.knowledgeList = this.knowledgeService.getAllKnowledges();
  }

  getFilterOptions(event: IFilterOptions): void {
    this.filterOptions = event;
    this.teacherList = this.teachersService.getTeachersFiltered(this.filterOptions);
  }
}
