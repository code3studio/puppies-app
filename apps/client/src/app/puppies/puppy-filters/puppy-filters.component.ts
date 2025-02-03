import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-puppy-filters',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './puppy-filters.component.html',
  styleUrls: ['./puppy-filters.component.scss'],
})
export class PuppyFiltersComponent {
  @Output() filterChanged = new EventEmitter<{ [key: string]: string }>();

  filters = {
    petType: '',
    status: '',
    location: '',
    breed: '',
    gender: '',
  };

  updateFilters() {
    this.filterChanged.emit(this.filters);
  }

  clearFilters() {
    this.filters = {
      petType: '',
      status: '',
      location: '',
      breed: '',
      gender: '',
    };
    this.updateFilters();
  }
}
