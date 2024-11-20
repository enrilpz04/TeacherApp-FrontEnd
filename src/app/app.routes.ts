import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { TeacherViewComponent } from './pages/teacher-view/teacher-view.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { SignupComponent } from './pages/signup/signup.component';
import { SignupTeacherComponent } from './pages/signup-teacher/signup-teacher.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashboardHomeComponent } from './pages/dashboard/dashboard-home/dashboard-home.component';
import { MessagesComponent } from './pages/dashboard/messages/messages.component';
import { NotificationsComponent } from './pages/dashboard/notifications/notifications.component';
import { ClassesComponent } from './pages/dashboard/classes/classes.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register-teacher', component: SignupTeacherComponent },
  { path: 'search', component: SearchComponent },
  { path: 'teacher/:id', component: TeacherViewComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: DashboardHomeComponent },
    { path: 'messages', component: MessagesComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'pending-classes', component: ClassesComponent }
  ]}
];
