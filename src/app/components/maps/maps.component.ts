import { Component, Inject, signal } from '@angular/core';
import { Icountry } from '../../interfaces/icountry.type=interfaces';
import { MapsService } from '../../services/maps.service';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { ITeacher } from '../../interfaces/iteacher.interface';
import { TeachersService } from '../../services/teachers.service';

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
  arrTeachers: ITeacher[]=[];
  teacherServices= Inject(TeachersService)
  countriesServices= Inject(MapsService);

  ngOnInit(){
    navigator.geolocation.getCurrentPosition(position=>{
      let center= new google.maps.LatLng(position.coords.latitude,position.coords.longitude)
      
      this.myposition.set(center);
    });
    console.log("cargando mapa")
    console.log(this.myposition)
    // this.countriesServices.getAll().then((countries:Icountry[])=>{
    //   this.arrCountries=countries
    // }).catch((error:any)=>{console.log(error)})
    this.getTeacher();

  }

  async getTeacher(): Promise<void>{
    try {
      this.arrTeachers= await this.teacherServices.getAll();
    } catch (error) {
      console.log('Error fetching teachers: ', error)
    }
  }
  getPosition(LatLng:any){
    return new google.maps.LatLng(LatLng[0],LatLng[1])
  }
  getPositionTeacher(latitude:string,longitude:string){

    return new google.maps.LatLng(Number(latitude),Number(longitude))
  }

  openInfoWindow(marker:MapMarker,inforWindow:MapInfoWindow){
    inforWindow.open(marker)
  }
}
