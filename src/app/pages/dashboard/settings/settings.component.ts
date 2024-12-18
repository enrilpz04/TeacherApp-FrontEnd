import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IUser, Rol } from '../../../interfaces/iuser.interface';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { UserService } from '../../../services/users.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  private apiUrl = 'http://localhost:3000/uploads/avatars/';

  userForm: FormGroup;
  user!: IUser;
  result: string = '';
  isLoading: boolean = true;
  isLoggedIn: boolean = false;
  usersService: UserService = inject(UserService);
  authService: AuthService = inject(AuthService)

  imageURL = 'user-icon.png'
  selectedFile: File | null = null;

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
            this.imageURL = this.apiUrl + (this.user.avatar == null ? this.imageURL : this.user.avatar);
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

            const formData = new FormData();
            formData.append('id', this.user.id);
            formData.append('name', this.user.name);
            formData.append('surname', this.user.surname);
            formData.append('email', this.user.email);
            formData.append('password', password);
            formData.append('validated', this.user.validated!.toString());
            formData.append('rol', Rol.STUDENT);
            formData.append('avatar', this.user.avatar!);

            const response = await this.usersService.updateUser(formData);

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

  async onFileSelected(event: any): Promise<void> {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageURL = e.target.result;
      };
      reader.readAsDataURL(file);

      try {

        const formData = new FormData();
        formData.append('id', this.user.id!);
        formData.append('name', this.user.name);
        formData.append('surname', this.user.surname);
        formData.append('email', this.user.email);
        formData.append('validated', this.user.validated!.toString());
        formData.append('rol', Rol.STUDENT);
        if (this.selectedFile) {
          const resizedFile = await this.resizeImage(this.selectedFile, 200, 200); // Redimensionar la imagen a 200x200
          formData.append('avatar', resizedFile);
        }

        const response = await this.usersService.updateUser(formData);

        this.user.avatar = response.avatar;
        Swal.fire('Success', 'Avatar changed successfully', 'success');
      } catch (err: any) {
        Swal.fire('Error', err.message, 'error');
      }
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
