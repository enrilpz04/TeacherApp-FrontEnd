import { Component, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TeacherApp-FrontEnd';

  router: Router = inject(Router);

  shouldShowHeaderAndFooter(): boolean {
    const currentRoute = this.router.url;
    return !(currentRoute.includes('login') || currentRoute.includes('signup'));
  }
}
