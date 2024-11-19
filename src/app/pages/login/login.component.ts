import { Component, inject} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
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
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  login(): void {
    if (this.userForm.valid) {
      this.authService.login(this.userForm.value.email, this.userForm.value.password).then(() => {
        this.router.navigate(['/home']);
      }).catch((error: any) => {
        this.result = 'Ha habido un error en el login: ' + error;
        console.error(error);
      });
    }
  }


  checkControl(formControlName: string, validator: string): boolean | undefined {
    return this.userForm.get(formControlName)?.hasError(validator) && this.userForm.get(formControlName)?.touched;
  }
}
