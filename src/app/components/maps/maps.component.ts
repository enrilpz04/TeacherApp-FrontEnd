import { Component, Inject, signal } from '@angular/core';
import { Icountry } from '../../interfaces/icountry.type=interfaces';
import { MapsService } from '../../services/maps.service';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [GoogleMap,MapMarker,MapInfoWindow],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.css'
})
export class MapsComponent {

  myposition= signal<any>("");
  arrCountries: Icountry[]=[];
  countriesServices= Inject(MapsService);

  ngOninit(){
    navigator.geolocation.getCurrentPosition(position=>{
      let center= new google.maps.LatLng(position.coords.latitude,position.coords.longitude)
      this.myposition.set(center);
    });

    // this.countriesServices.getAll().then((countries:Icountry[])=>{
    //   this.arrCountries=countries
    // }).catch((error:any)=>{console.log(error)})
  }

  getPosition(LatLng:any){
    return new google.maps.LatLng(LatLng[0],LatLng[1])
  }

  openInfoWindow(marker:MapMarker,inforWindow:MapInfoWindow){
    inforWindow.open(marker)
  }
}
