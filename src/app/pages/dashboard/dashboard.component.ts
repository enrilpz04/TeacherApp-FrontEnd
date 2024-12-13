import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../interfaces/iuser.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  authService : AuthService = inject(AuthService)
  user! : IUser

  ngOnInit() {
    this.authService.getUser().subscribe(async user => {
      if (user) {
        this.user = user
      }
    })
  }
}
