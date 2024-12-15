import { Component, inject} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertUtils } from '../../utils/alert-utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userForm: FormGroup;
  result: string = '';

  router: Router = inject(Router);
  authService : AuthService = inject(AuthService);

  constructor() {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  async login(): Promise<void> {
    if (this.userForm.valid) {
      this.authService.login(this.userForm.value.email, this.userForm.value.password).then(() => {
        this.router.navigate(['/home']);
      }).catch(async (error: any) => {
        await this.error("Error en el login", "No se ha encontrado un usuario con estos credenciales", "Volver");
        this.userForm.reset()
      });
    }
  }


  checkControl(formControlName: string, validator: string): boolean | undefined {
    return this.userForm.get(formControlName)?.hasError(validator) && this.userForm.get(formControlName)?.touched;
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
