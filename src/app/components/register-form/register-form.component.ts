import { Component, inject } from '@angular/core';
import { AbstractControl, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/users.service';
import { IUser, Rol } from '../../interfaces/iuser.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {

  valido: boolean = true;
  userList: IUser[] = [];
  newUser: IUser = {
    name: "",
    surname: "",
    email: "",
    password: ""
  };
  registerForm: FormGroup;
  serviceUser = inject(UserService)
  router = inject(Router)


  constructor() {

    this.registerForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      surname: new FormControl(null, []),
      email: new FormControl(null, [Validators.required, Validators.pattern(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)]),
      pssw: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      repssw: new FormControl(null, [Validators.required])
    }, []);
  }

  async getDataForm() {

    this.newUser.name = this.registerForm.value.name;
    this.newUser.surname = this.registerForm.value.surname===""?this.registerForm.value.surname:"";
    this.newUser.email = this.registerForm.value.email;
    this.newUser.password = this.registerForm.value.pssw;
    this.newUser.rol = Rol.STUDENT;
    console.log(this.newUser);
    try {
      const response = await this.serviceUser.register(this.newUser);
      if (response) {
        console.log("Usuario registrado correctamente")
        this.router.navigate(['/home'])
      } else {
        this.registerForm.reset();
      }


    } catch (error) {
      console.log(error)
    }
  }

  async getUsers(): Promise<void> {
    try {
      this.userList = await this.serviceUser.getAllUser();
    } catch (error) {
      console.log(error)
    }
  }
  // ngOnInit() {
  //   this.getUsers();

  // }

  checkControl(formControlNane: string, validator: string) {
    return this.registerForm.get(formControlNane)?.hasError(validator) && this.registerForm.get(formControlNane)?.touched;
  }
  checkEmail() {
    //comprobamos si el correo ya existe

    const result = this.userList.find(user => user.email === this.registerForm.value.email)
    this.valido = result != null ? true : false;

    return this.valido;

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

}
