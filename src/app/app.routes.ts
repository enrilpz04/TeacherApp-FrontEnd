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
import { MapsComponent } from './components/maps/maps.component';
import { StudentsListComponent } from './pages/dashboard/students-list/students-list.component';
import { TeachersListComponent } from './pages/dashboard/teachers-list/teachers-list.component';
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'mapa', component: MapsComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup-teacher', component: SignupTeacherComponent },
  { path: 'search', component: SearchComponent },
  { path: 'teacher/:id', component: TeacherViewComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
    { path: '', redirectTo: 'dashboard-home', pathMatch: 'full' },
    { path: 'dashboard-home', component: DashboardHomeComponent },
    { path: 'messages', component: MessagesComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'classes', component: ClassesComponent },
    { path: 'students-list', component: StudentsListComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin' } },
    { path: 'teachers-list', component: TeachersListComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin' } },

  ]}
];
