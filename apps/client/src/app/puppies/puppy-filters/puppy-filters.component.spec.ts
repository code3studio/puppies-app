import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PuppyFiltersComponent } from './puppy-filters.component';

describe('PuppyFiltersComponent', () => {
  let component: PuppyFiltersComponent;
  let fixture: ComponentFixture<PuppyFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuppyFiltersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PuppyFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
