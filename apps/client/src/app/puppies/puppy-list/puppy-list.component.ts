import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // ✅ Import RouterModule
import { Puppy, PuppyService } from '../puppy.service';
import { PuppyCardComponent } from '../puppy-card/puppy-card.component';
import { PuppyFiltersComponent } from '../puppy-filters/puppy-filters.component';

@Component({
  selector: 'app-puppy-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PuppyCardComponent,
    PuppyFiltersComponent,
  ],
  templateUrl: './puppy-list.component.html',
  styleUrl: './puppy-list.component.scss',
})
export class PuppyListComponent implements OnInit {
  puppies: Puppy[] = [];
  filters: { [key: string]: string } = {};
  
  constructor(private puppyService: PuppyService) {}

  ngOnInit(): void {
    this.loadPuppies();
  }

  loadPuppies() {
    this.puppyService.getPuppies(this.filters).subscribe((data) => {
      this.puppies = data;
    });
  }

  applyFilters(filters: { [key: string]: string }): void {
    this.filters = filters;
    this.loadPuppies();
  }
}
