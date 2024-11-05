import { Component, inject, Input, Output } from '@angular/core';
import { UserService } from '../../services/users.service';
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
  @Output() result: String;

  userService : UserService = inject(UserService);

  constructor() {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
    this.result = "";
  }

  login() {
    if (this.userForm.valid) {
      this.userService.login(this.userForm.value.email, this.userForm.value.password).then((response) => {
        this.result = JSON.stringify(response, null, 4);
      }), (error: any) => {
        this.result = "Ha habido un error en el login" + error;
        console.error(error);
      };
    }
  }

  checkControl(formControlName: string, validator: string): boolean | undefined {
    return this.userForm.get(formControlName)?.hasError(validator) && this.userForm.get(formControlName)?.touched;
  }
}
