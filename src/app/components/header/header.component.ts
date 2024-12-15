import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../interfaces/iuser.interface';
import { MessagesService } from '../../services/messages.service';
import { NotificationsService } from '../../services/notifications.service';
import { IMessage } from '../../interfaces/imessage.interface';
import { INotification } from '../../interfaces/inotification.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  // Active user vars
  isLoggedIn: boolean = false;
  user!: IUser;

  // Notifications and messages
  userNotifications: INotification[] = [];
  userMessages: IMessage[] = [];

  isLoading: boolean = true;

  // Services
  authService = inject(AuthService);
  messagesService = inject(MessagesService);
  notificationsService = inject(NotificationsService);

  ngOnInit(): void {

    // Get Login Status
    this.authService.getLoggedInStatus().subscribe(status => {
      this.isLoggedIn = status;
      if (this.isLoggedIn) {

        // Get Active User
        this.authService.getUser().subscribe(user => {
          if (user) {
            this.user = user;
            this.isLoading = false;
          }
        });
      }
      this.isLoading = false;
    }
    );
  }

  // Log out active user
  logout() {
    this.authService.logout();
  }
}
