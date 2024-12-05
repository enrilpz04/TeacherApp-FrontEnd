import { Component, signal } from '@angular/core';
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
  myposittion= signal<any>("");

  ngOninit(){
    navigator.geolocation.getCurrentPosition(
      posittion=>{
        let center= new google.maps.LatLng(posittion.coords.latitude,posittion.coords.longitude)
        this.myposittion.set(center);
      }
    )
  }

}
