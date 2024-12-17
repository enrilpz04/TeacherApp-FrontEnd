import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { NotificationsService } from '../../../services/notifications.service';
import { INotification } from '../../../interfaces/inotification.interface';
import { IUser } from '../../../interfaces/iuser.interface';
import { AuthService } from '../../../services/auth.service';
import moment from 'moment';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'

})
export class NotificationsComponent {
  notificationsService = inject(NotificationsService);
  authService = inject(AuthService);
  user!: IUser;
  isLoading: boolean = true;
  isLoggedIn: boolean = false;

  displayedColumns: string[] = ['message', 'date'];
  userNotifications: INotification[] = [];

  ngOnInit(): void {
    this.authService.getLoggedInStatus().subscribe(status => {
      this.isLoggedIn = status;
      if (this.isLoggedIn) {
        this.authService.getUser().subscribe(user => {
          if (user) {
            this.user = user;
            //console.log(this.user);
            this.getNotifications();
            this.isLoading = false;
          }
        });
      }
    }
    );
    this.isLoading = false
  }

  async getNotifications() {
    this.userNotifications = await this.notificationsService.getNotificationsByUserId(this.user.id ? this.user.id : '');
    this.userNotifications.forEach(noti => {
      noti.formatDate = moment(noti.date).format('DD/MM/YYYY HH:mm');
    });
    console.log(this.userNotifications);
  }
}
