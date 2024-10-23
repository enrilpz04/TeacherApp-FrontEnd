import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FilterComponent } from './pages/filter/filter.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: FilterComponent }
];
