import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IFilterOptions } from '../../interfaces/ifilter-options';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {

  @Output() filterOptions = new EventEmitter<IFilterOptions>();

  knowledgeList: string[] = ['Angular', 'React', 'Vue', 'Svelte', 'Ember', 'Backbone'];
  orderOptions: string[] = ['Newest', 'Oldest', 'Price Ascending', 'Price Descending'];
  dropdownOpen: boolean = false;

  knowledge: string = '';
  schedule: string = '';
  minPrice: number = 0;
  maxPrice: number = 1000;
  orderOption: string = '';
  name: string = '';

  filterForm: FormGroup;

  constructor() {
    this.filterForm = new FormGroup({
      knowledge: new FormControl(null, []),
      schedule: new FormControl(null, []),
      minPrice: new FormControl(null, []),
      maxPrice: new FormControl(null, []),
      orderOption: new FormControl(null, []),
      name: new FormControl(null, [])
    })
  }

  get priceRange(): string {
    return `${this.minPrice} - ${this.maxPrice} €`;
  }

  updateMinPrice(): void {
    if (this.minPrice > this.maxPrice) {
      this.minPrice = this.maxPrice;
    }
  }

  updateMaxPrice(): void {
    if (this.maxPrice < this.minPrice) {
      this.maxPrice = this.minPrice;
    }
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
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
