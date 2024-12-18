import { Component, ElementRef, inject, Inject, signal, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { KnowledgesService } from '../../services/knowledges.service';
import { IKnowledge } from '../../interfaces/iknowledge.interface';
import { ITeacher } from '../../interfaces/iteacher.interface';
import { Rol } from '../../interfaces/iuser.interface';
import { AuthService } from '../../services/auth.service';
import { GoogleMap } from '@angular/google-maps';
import { TeachersService } from '../../services/teachers.service';
import { UserService } from '../../services/users.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teacher-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './teacher-form.component.html',
  styleUrl: './teacher-form.component.css',
})
export class TeacherFormComponent {

  // Variables para manegar subida del avatar
  imageURL = 'user-icon.png'
  selectedFile: File | null = null;

  myposition = new google.maps.LatLng(0, 0);
  myposition2 = [0,0]
  mapa = new GoogleMap();
  mapa1 = new google.maps.Geocoder();
  loc = new google.maps.Geocoder();

  // Array de knowledges
  knowledges!: IKnowledge[]

  // Formulario válido
  valido: boolean = true;

  // Formulario de registor
  registerForm: FormGroup;

  // Servicios y router
  serviceUser = inject(UserService)
  authService = inject(AuthService)
  knowdelgesServices = inject(KnowledgesService);
  teacherServices = inject(TeachersService);
  router = inject(Router)

  constructor() {
    // Init del formulario
    this.registerForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      surname: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      pssw: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      repssw: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      schedule: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      experience: new FormControl(null, [Validators.required]),
      knowledges: new FormControl([], [(Validators.required)])
    }, []);
  }

  ngOnInit(): void {
    this.loadKnowledges();
    //2º aqui cogemos la posicion actual
    navigator.geolocation.getCurrentPosition((position) => {
      this.myposition2[0]= position.coords.latitude;
      this.myposition2[1]=position.coords.longitude;
      this.myposition = new google.maps.LatLng(position.coords.latitude,position.coords.longitude)
      console.log(this.myposition)
    });
  }

  async loadKnowledges() {
    try {
      this.knowledges = await this.knowdelgesServices.getAllKnowledges();
    } catch (err) {
      console.log('Error loading knowledges:', err);
    }
  }

  onKnowledgeChange(event: any, knowledgeId: number) {
    const selectedKnowledges = this.registerForm.value.knowledges;
    const index = selectedKnowledges.indexOf(knowledgeId);

    if (index === -1) {
      if (selectedKnowledges.length < 2) {
        selectedKnowledges.push(knowledgeId);
      } else {
        event.target.checked = false;
        Swal.fire({
          title: 'Límite de selección',
          text: 'Solo puedes seleccionar hasta 2 conocimientos.',
          icon: 'warning',
          confirmButtonText: 'Aceptar'
        });
      }
    } else {
      selectedKnowledges.splice(index, 1);
    }

    this.registerForm.patchValue({ knowledges: selectedKnowledges });
  }

  async getDataForm() {
    try {
      // Crear FormData para enviar la imagen y los datos del usuario
      const formData = new FormData();
      formData.append('name', this.registerForm.value.name);
      formData.append('surname', this.registerForm.value.surname);
      formData.append('email', this.registerForm.value.email);
      formData.append('password', this.registerForm.value.pssw);
      formData.append('validated', "true");
      formData.append('rol', Rol.TEACHER);
      if (this.selectedFile) {
        const resizedFile = await this.resizeImage(this.selectedFile, 200, 200); // Redimensionar la imagen a 200x200
        formData.append('avatar', resizedFile);
      }
      formData.append('description', this.registerForm.value.description)
      formData.append('schedule', this.registerForm.value.schedule)
      formData.append('price_p_hour', this.registerForm.value.price)
      formData.append('experience', this.registerForm.value.experience)
      formData.append('rating', "0")
      formData.append("latitude", this.myposition ? this.myposition2[0].toString() : "0")
      formData.append("longitude", this.myposition ? this.myposition2[1].toString() : "0")
      formData.append("knowledgeIds", JSON.stringify(this.registerForm.value.knowledges));

      const response = await this.teacherServices.createTeacher(formData)

      if (response) {
        await this.confirmation("Registro completado", "Usuario registrado correctamente", "Aceptar");
        await this.authService.login(response.user.email, this.registerForm.value.pssw)
        this.router.navigate(['/home']);
        this.registerForm.reset();
      }

    } catch (error: any) {
      await this.error("Error en el registro", error.message || "Error al registrar el usuario", "Volver");
    }
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

  selectChanged(): any {
    return { 'checkSelect': true }
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
