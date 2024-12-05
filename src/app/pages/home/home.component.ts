import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MapsComponent } from "../../components/maps/maps.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MapsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
