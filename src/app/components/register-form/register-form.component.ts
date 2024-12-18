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

  imageURL = 'user-icon.png'
  selectedFile: File | null = null;

  // Mensaje de error
  errorMessage: any = "";

  // Formulario de registor
  registerForm: FormGroup;

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

  async getDataForm() {
    // Asignaciones al nuevo user
    this.newUser.name = this.registerForm.value.name;
    this.newUser.surname = this.registerForm.value.surname;
    this.newUser.email = this.registerForm.value.email;
    this.newUser.validated = true;
    this.newUser.password = this.registerForm.value.pssw;
    this.newUser.rol = Rol.STUDENT;

    try {
      // Crear FormData para enviar la imagen y los datos del usuario
      const formData = new FormData();
      formData.append('name', this.newUser.name);
      formData.append('surname', this.newUser.surname);
      formData.append('email', this.newUser.email);
      formData.append('password', this.newUser.password);
      formData.append('validated', this.newUser.validated.toString());
      formData.append('rol', this.newUser.rol);
      if (this.selectedFile) {
        const resizedFile = await this.resizeImage(this.selectedFile, 200, 200); // Redimensionar la imagen a 200x200
        formData.append('avatar', resizedFile);
      }

      const response = await this.authService.register(formData);
      if (response) {
        console.log(response);
        await this.confirmation("Registro completado", "Usuario registrado correctamente", "Aceptar");
        await this.authService.login(response.email, this.newUser.password);
        this.router.navigate(['/home']);
      } else {
        this.registerForm.reset();
      }
    } catch (error: any) {
      await this.error("Error en el registro", error.message || "Error al registrar el usuario", "Volver");
    }
  }

  async resizeImage(file: File, width: number, height: number): Promise<File> {
    const img = document.createElement('img');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    return new Promise((resolve, reject) => {
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        let srcX = 0, srcY = 0, srcWidth = img.width, srcHeight = img.height;

        if (aspectRatio > 1) {
          // Imagen horizontal
          srcX = (img.width - img.height) / 2;
          srcWidth = img.height;
        } else {
          // Imagen vertical
          srcY = (img.height - img.width) / 2;
          srcHeight = img.width;
        }

        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, srcX, srcY, srcWidth, srcHeight, 0, 0, width, height);
        canvas.toBlob(blob => {
          if (blob) {
            resolve(new File([blob], file.name, { type: file.type }));
          } else {
            reject(new Error('Error resizing image'));
          }
        }, file.type);
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
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

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageURL = e.target.result;
      };
      reader.readAsDataURL(file);
    }
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
