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
import { TeacherKnowledgesComponent } from "../teacher-knowledges/teacher-knowledges.component";

@Component({
  selector: 'app-teacher-form',
  standalone: true,
  imports: [ReactiveFormsModule, TeacherKnowledgesComponent],
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

  hiddenTeacher:boolean=false;
  hiddenKnoledge:boolean=true;

  arrKnowledge: IKnowledge[] = [];

  regTeacherForm: FormGroup;

  knowdelgesServices = inject(KnowledgesService);
  teacherServices = inject(TeachersService);

  constructor() {
    this.regTeacherForm = new FormGroup(
      {
        description: new FormControl(null, [Validators.required]),
        schedule: new FormControl(null, []),
        price: new FormControl(null, [Validators.required]),
        experience: new FormControl(null, [Validators.required])
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
    const description = this.regTeacherForm.value.description;
    const schedule = this.regTeacherForm.value.schedule;
    const price = this.regTeacherForm.value.price;
    const experience = this.regTeacherForm.value.experience;

      const resutl = this.teacherServices.createTeacher(
        description,
        schedule,
        price,
        experience,
        this.myposition.lat().toString()   ,
        this.myposition.lng().toString(),
        this.id
      );
      this.regTeacherForm.reset();
      console.log("resultado crear teacher: ",resutl)
      this.hiddenKnoledge=!this.hiddenKnoledge
      this.hiddenTeacher=!this.hiddenTeacher;
  }
  checkControl(formControlName:string, validator:string){
    return this.regTeacherForm.get(formControlName)?.hasError(validator) && this.regTeacherForm.get(formControlName)?.touched;
  }

  selectChanged():any{
    return {'checkSelect':true}


  }
}
