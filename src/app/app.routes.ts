import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { TeacherViewComponent } from './pages/teacher-view/teacher-view.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {path: "login", component: LoginComponent, canActivate: [AuthGuard]},
  { path: 'search', component: SearchComponent },
  { path: 'teacher/:id', component: TeacherViewComponent}
];
