import { Component } from '@angular/core';
import { FilterComponent } from '../../components/filter/filter.component';
import { TeacherListComponent } from '../../components/teacher-list/teacher-list.component';
import { IFilterOptions } from '../../interfaces/ifilter-options';
import { filter } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FilterComponent, TeacherListComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  filterOptions!: IFilterOptions;

  getFilterOptions(event: IFilterOptions): void {
    this.filterOptions = event;
    console.log(this.filterOptions);
  }

}
