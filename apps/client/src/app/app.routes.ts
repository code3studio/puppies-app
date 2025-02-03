import { Route } from '@angular/router';
import { PuppyDetailComponent } from './puppy-detail/puppy-detail.component';
import { PuppyListComponent } from './puppies/puppy-list/puppy-list.component';

export const appRoutes: Route[] = [
  { path: '', component: PuppyListComponent },
  { path: 'puppy/:refId', component: PuppyDetailComponent },
];
