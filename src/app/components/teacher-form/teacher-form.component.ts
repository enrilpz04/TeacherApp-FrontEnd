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
import { UserService } from '../../services/users.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teacher-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './teacher-form.component.html',
  styleUrl: './teacher-form.component.css',
})
export class TeacherFormComponent {

  id: number = -1;
  myposition = new google.maps.LatLng(0, 0);
  auth = inject(AuthService);

  mapa = new GoogleMap();
  mapa1 = new google.maps.Geocoder();
  loc = new google.maps.Geocoder();

  hiddenTeacher: boolean = false;
  hiddenKnoledge: boolean = true;

  arrKnowledge: IKnowledge[] = [];

  knowdelgesServices = inject(KnowledgesService);
  teacherServices = inject(TeachersService);

  // Formulario válido
  valido: boolean = true;

  // Mensaje de error
  errorMessage: any = "";

  // Formulario de registor
  registerForm: FormGroup;

  // Servicios y router
  serviceUser = inject(UserService)
  authService = inject(AuthService)
  router = inject(Router)


  constructor() {

    // Init del formulario
    this.registerForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      surname: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(null, [Validators.required, Validators.pattern(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/), Validators.email]),
      pssw: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      repssw: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      schedule: new FormControl(null, []),
      price: new FormControl(null, [Validators.required]),
      experience: new FormControl(null, [Validators.required])
    }, []);
  }


  async ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.myposition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    });
    try {
      this.arrKnowledge = await this.knowdelgesServices.getAllKnowledges();
    } catch (err) {
      console.log('error con los conocimientos: ', err);
    }
  }

  async getDataForm() {
    const user: IUser = {
      name: this.registerForm.value.name,
      surname: this.registerForm.value.surname,
      email: this.registerForm.value.email,
      validated: true,
      password: this.registerForm.value.pssw,
      rol: Rol.TEACHER
    }

    try {
      const response = await this.serviceUser.register(user);
      if (response) {

        const teacher: ITeacher = {
          description: this.registerForm.value.description,
          schedule: this.registerForm.value.schedule,
          price_p_hour: this.registerForm.value.price,
          experience: this.registerForm.value.experience,
          rating: 0,
          validated: false,
          latitude: this.myposition.lat.toString(),
          longitude: this.myposition.lng.toString(),
          user: response,
        }

        console.log(teacher)

        await this.teacherServices.createTeacher(teacher)

        await this.confirmation("Registro completado", "Usuario registrado correctamente", "Aceptar");
        await this.authService.login(response.email, user.password)
        this.router.navigate(['/home']);



      } else {
        this.registerForm.reset();
      }
    } catch (error: any) {
      await this.error("Error en el registro", error.message || "Error al registrar el usuario", "Volver");
    }
  }

  checkControl(formControlNane: string, validator: string) {
    return this.registerForm.get(formControlNane)?.hasError(validator) && this.registerForm.get(formControlNane)?.touched;
  }

  checkRepitPassw() {
    return this.registerForm.value.pssw !== this.registerForm.value.repssw ? true : false
  }

  validacion() {
    //validadmos el formulario con las dos condiciones
    if (this.registerForm.valid && this.valido) {
      this.registerForm.enabled
    }
    return (this.registerForm.valid) && this.valido;
  }

  selectChanged(): any {
    return { 'checkSelect': true }
  }

  async error(title: string, text: string, confirmButtonText: string): Promise<boolean> {
      return Swal.fire({
        title: title,
        text: text,
        icon: 'error',
        confirmButtonText: confirmButtonText,
      }).then((result) => {
        return result.isConfirmed;
      });
    }

    async confirmation(title: string, text: string, confirmButtonText: string): Promise<boolean> {
      return Swal.fire({
        title: title,
        text: text,
        icon: 'success',
        confirmButtonText: confirmButtonText,
      }).then((result) => {
        return result.isConfirmed;
      });
    }
}
