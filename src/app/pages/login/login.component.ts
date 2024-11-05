import { Component, Input, Output } from '@angular/core';
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
  @Input() searchForm: FormGroup;
  @Output() result: String;
  @Output() result_search: String;
  constructor(private userService: UserService) {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
    this.searchForm = new FormGroup({
      filtro1: new FormControl('', [Validators.required]),
      filtro2: new FormControl('', [Validators.required]),
    });
    this.result = "";
    this.result_search = "";
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

  search() {
    if (this.searchForm.valid) {
      this.userService.search(this.searchForm.value.filtro1, this.searchForm.value.filtro2).then((response) => {
        this.result_search = JSON.stringify(response, null, 4);
      }), (error: any) => {
        this.result_search = "Ha habido un error en el search" + error;
        console.error(error);
      };
    }
  }

  checkControl(formControlName: string, validator: string): boolean | undefined {
    return this.userForm.get(formControlName)?.hasError(validator) && this.userForm.get(formControlName)?.touched;
  }
}
