import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IFilterOptions } from '../../interfaces/ifilter-options';
import { IKnowledge } from '../../interfaces/iknowledge.interface';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {

  @Input() knowledgeList: IKnowledge[] = [];
  @Output() filterOptions = new EventEmitter<IFilterOptions>();

  scheduleOptions: string[] = ['Mañana', 'Tarde', 'Noche'];
  orderOptions: string[] = ['Mejor Valoracion', 'Precio más bajo', 'Precio más alto'];
  filterForm: FormGroup;

  constructor() {
    this.filterForm = new FormGroup({
      knowledge: new FormControl("", []),
      schedule: new FormControl("", []),
      minPrice: new FormControl(0, []),
      maxPrice: new FormControl(100, []),
      orderOption: new FormControl("", []),
      name: new FormControl("", [])
    })
  }

  getDataForm(){
    console.log(this.filterForm.value)
    const filterOptions: IFilterOptions = {
      knowledge: this.filterForm.value.knowledge,
      schedule: this.filterForm.value.schedule,
      minPrice: this.filterForm.value.minPrice,
      maxPrice: this.filterForm.value.maxPrice,
      orderOption: this.filterForm.value.orderOption,
      name: this.filterForm.value.name
    };
    this.filterOptions.emit(filterOptions);
  }
}
