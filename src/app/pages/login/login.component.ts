import { Component, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @Input() userForm: FormGroup;
  constructor(private userService: UserService) {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  login() {
    if (this.userForm.valid) {
      this.userService.login(this.userForm.value.email, this.userForm.value.password).then(
        (response: any) => {
          console.log(response);
          // Manejar la respuesta del login
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }

  checkControl(formControlName: string, validator: string): boolean | undefined {
    return this.userForm.get(formControlName)?.hasError(validator) && this.userForm.get(formControlName)?.touched;
  }
}
