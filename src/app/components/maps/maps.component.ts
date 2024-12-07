import { Component, inject, Inject, signal } from '@angular/core';
import { Icountry } from '../../interfaces/icountry.type=interfaces';
import { MapsService } from '../../services/maps.service';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { ITeacher } from '../../interfaces/iteacher.interface';
import { TeachersService } from '../../services/teachers.service';
import { TeacherCardComponent } from '../teacher-card/teacher-card.component';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [GoogleMap,MapMarker,MapInfoWindow, TeacherCardComponent],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.css'
})
export class MapsComponent {

  myposition= signal<any>("");
  // arrCountries: Icountry[]=[];
  arrTeachers: ITeacher[]=[];
  teacherServices= inject(TeachersService)
  // countriesServices= Inject(MapsService);

  teacherList : ITeacher[] = []
  teachersService = inject(TeachersService);




  ngOnInit(){
    navigator.geolocation.getCurrentPosition(position=>{
      let center= new google.maps.LatLng(position.coords.latitude,position.coords.longitude)

      this.myposition.set(center);
    });


    this.getTeacher();

  }

  async getTeacher(): Promise<void>{
    try {
      this.arrTeachers= await this.teacherServices.getAll();
      console.log("datos de arrTeachers: ",this.arrTeachers)
    } catch (error) {
      console.log('Error fetching teachers: ', error)
    }
  }
  // async getTeachers(): Promise<void> {
  //   try {
  //     this.teacherList = await this.teachersService.getAll();
  //     console.log(this.teacherList);
  //   } catch (error) {
  //     console.error('Error fetching teachers:', error);
  //   }
  // }

  getPosition(LatLng:any){
    return new google.maps.LatLng(LatLng[0],LatLng[1])
  }
  getPositionTeacher(latitude:string,longitude:string){
    return new google.maps.LatLng(Number(latitude),Number(longitude))
  }

  openInfoWindow(marker:MapMarker,infoWindow:MapInfoWindow){
    infoWindow.open(marker)
  }
  closeInfoWindow(inforWindow:MapInfoWindow){
    inforWindow.close();
  }

  consolaPosicion(){
    console.log("has hecho click")
  }
}
