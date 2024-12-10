import { Component, inject, Inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { KnowledgesService } from '../../services/knowledges.service';
import { IKnowledge } from '../../interfaces/iknowledge.interface';
import { ITeacher } from '../../interfaces/iteacher.interface';
import { IUser, Rol } from '../../interfaces/iuser.interface';
import { AuthService } from '../../services/auth.service';
import { GoogleMap } from '@angular/google-maps';
import { TeachersService } from '../../services/teachers.service';

@Component({
  selector: 'app-teacher-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './teacher-form.component.html',
  styleUrl: './teacher-form.component.css',
})
export class TeacherFormComponent {
  id:number=-1;
  myposition =new google.maps.LatLng(0,0);
  auth = inject(AuthService);

  mapa = new GoogleMap();
  mapa1 = new google.maps.Geocoder();
  loc = new google.maps.Geocoder();


  arrKnowledge: IKnowledge[] = [];

  regTeacherForm: FormGroup;

  knowdelgesServices = inject(KnowledgesService);
  teacherServices = inject(TeachersService);

  constructor() {
    this.regTeacherForm = new FormGroup(
      {
        desciption: new FormControl(null, [Validators.required]),
        schedule: new FormControl(null, [Validators.required]),
        price: new FormControl(null, [Validators.required]),
        experience: new FormControl(null, [Validators.required]),
        direccion: new FormControl(null, [Validators.required]),
      },
      []
    );
  }
  async ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {

      this.myposition= new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

    });
    this.auth.getUser().subscribe((user) => {
      this.id = Number(user?.id);
    });
    console.log('usuario: ', this.auth.getUser());
    try {
      this.arrKnowledge = await this.knowdelgesServices.getAllKnowledges();
    } catch (err) {
      console.log('error con los conocimientos: ', err);
    }
  }

  getDataForm() {
    const description = this.regTeacherForm.value.desciption;
    const schedule = this.regTeacherForm.value.schedule;
    const price = this.regTeacherForm.value.price;
    const experience = this.regTeacherForm.value.experience;
    this.teacherServices.createTeacher(
      description,
      schedule,
      price,
      experience,
      this.myposition.lat().toString()   ,
      this.myposition.lng.toString(),
      this.id
    );

    // console.log(loc.geocode(this.regTeacherForm.value.direccion));
  }
}
