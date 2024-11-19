import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedIn : boolean = false;
  numNotifications : number = 2;
  numMessages : number = 5;

  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.getLoggedInStatus().subscribe(status => {
      this.isLoggedIn = status;
    });
    // Aquí puedes agregar lógica para obtener el número de mensajes y notificaciones
  }
}
