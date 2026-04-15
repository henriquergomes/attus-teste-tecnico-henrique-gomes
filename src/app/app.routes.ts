import { Routes } from '@angular/router';
import { UserListComponent } from './features/user-list/user-list.component';
import { SignalsCounterComponent } from './exercises/signals-counter/signals-counter';

export const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'counter', component: SignalsCounterComponent },
  { path: '', redirectTo: 'users', pathMatch: 'full' },
];
