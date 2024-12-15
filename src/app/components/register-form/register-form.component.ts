import { Component, inject } from '@angular/core';
import { AbstractControl, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/users.service';
import { IUser, Rol } from '../../interfaces/iuser.interface';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {

  // Formulario válido
  valido: boolean = true;

  // Nuevo user
  newUser: IUser = {
    name: "",
    surname: "",
    email: "",
    password: ""
  };

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
      repssw: new FormControl(null, [Validators.required])
    }, []);
  }

  // Método para enviar el formulario
  async getDataForm() {

    // Asignaciones al nuevo user
    this.newUser.name = this.registerForm.value.name;
    this.newUser.surname = this.registerForm.value.surname;
    this.newUser.email = this.registerForm.value.email;
    this.newUser.validated = true,
    this.newUser.password = this.registerForm.value.pssw;
    this.newUser.rol = Rol.STUDENT;

    try {
      const response = await this.serviceUser.register(this.newUser);
      if (response) {
        console.log(response)
        await this.confirmation("Registro completado", "Usuario registrado correctamente", "Aceptar");
        await this.authService.login(response.email, this.newUser.password)
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
