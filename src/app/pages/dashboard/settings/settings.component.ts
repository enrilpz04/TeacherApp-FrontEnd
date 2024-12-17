import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IUser } from '../../../interfaces/iuser.interface';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
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
    this.isLoading = false;
  }

  async changePassword() {
    if (this.userForm.valid) {
      const { password, reppassword } = this.userForm.value;
      if (password === reppassword) {
        if (this.user.id) { // Verificar que this.user.id no sea undefined
          try {
            await this.authService.changePassword(this.user.id, password);
            Swal.fire('Success', 'Password changed successfully', 'success');
          } catch (err: any) {
            Swal.fire('Error', err.message, 'error');
          }
        } else {
          Swal.fire('Error', 'User ID is undefined', 'error');
        }
      } else {
        Swal.fire('Error', 'Passwords do not match', 'error');
      }
    }
  }

  async changeAvatar(event: any) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);
      try {
        let uri = await this.authService.changeAvatar(formData);
        this.user.avatar = uri;
        this.authService.setUserData(this.user);
        Swal.fire('Success', 'Avatar changed successfully', 'success');
      } catch (err: any) {
        Swal.fire('Error', err.message, 'error');
      }
    }
  }

  checkControl(formControlName: string, validator: string): boolean | undefined {
    return this.userForm.get(formControlName)?.hasError(validator) && this.userForm.get(formControlName)?.touched;
  }

  checkRepitPassw(): boolean {
    const password = this.userForm.get('password')?.value;
    const reppassword = this.userForm.get('reppassword')?.value;
    return password === reppassword;
  }

  subirImagen(): void {
    // Implementar la lógica para subir la imagen si es necesario
  }
}
