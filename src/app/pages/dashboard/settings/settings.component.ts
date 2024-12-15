import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../../../interfaces/iuser.interface';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  private apiUrl = 'http://localhost:3000/api/';

  userForm: FormGroup;
  user!: IUser;
  result: string = '';
  image: string = 'user.png';
  isLoading: boolean = true;
  isLoggedIn: boolean = false;
  authService: AuthService = inject(AuthService);
  imageChanged: File | null = null;

  constructor() {
    this.userForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      reppassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  ngOnInit(): void {
    this.authService.getLoggedInStatus().subscribe(status => {
      this.isLoggedIn = status;
      if (this.isLoggedIn) {
        this.authService.getUser().subscribe(user => {
          if (user) {
            this.user = user;
            this.isLoading = false;
            this.image = this.apiUrl + (this.user.avatar == null ? this.image : this.user.avatar);
          }
        });
      }
    });
    this.isLoading = false
  }

  changepassword(): void {
    if (this.userForm.valid) {
      this.authService.changePassword(this.user.id ? this.user.id : '', this.userForm.value.password);
      this.userForm.reset();
      Swal.fire({
        icon: 'success',
        text: 'Contraseña cambiada con éxito',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  cambiarAvatar(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imageChanged = event.target.files[0]; // Asignar el evento al image cropper
    }
  }

  async subirImagen() {
    if (this.imageChanged) {
      const formData = new FormData();
      formData.append('image', this.imageChanged, this.imageChanged.name);
      formData.append('id', this.user.id ? this.user.id : '');
      let uri = await this.authService.changeAvatar(formData);
      this.image = this.apiUrl + uri;
      this.user.avatar = uri;//cambia la imagen
      this.authService.setUserData(this.user);
    }
  }

  checkControl(formControlName: string, validator: string): boolean | undefined {
    return this.userForm.get(formControlName)?.hasError(validator) && this.userForm.get(formControlName)?.touched;
  }

  checkRepitPassw() {
    return this.userForm.value.reppassword != this.userForm.value.password && this.userForm.value.reppassword.length > 6.
  }
}
