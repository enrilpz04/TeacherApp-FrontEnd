import { Component, inject } from '@angular/core';
import { TeachersService } from '../../../services/teachers.service';
import { ITeacher } from '../../../interfaces/iteacher.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teachers-list',
  standalone: true,
  imports: [],
  templateUrl: './teachers-list.component.html',
  styleUrl: './teachers-list.component.css'
})
export class TeachersListComponent {

  teachersService: TeachersService = inject(TeachersService)
  teachers!: ITeacher[]
  page: number = 1
  size: number = 5
  totalPages!: number

  ngOnInit() {
    this.loadStudents();
  }

  async loadStudents() {
    try {
      const response = await this.teachersService.getTeachersWithPagination(this.page, this.size);
      this.teachers = response.teachers
      this.totalPages = response.totalPages
    } catch (error) {
      console.error('Error loading students:', error);
    }
  }

  async updateTeacherValidation(teacher: ITeacher, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const word = teacher.validated ? 'desactivar' : 'activar';
    const accepted = await this.alert('Alerta', `¿Estás seguro de ${word} a este profesor?`, 'Aceptar', 'Cancelar');
    if (!accepted) {
      checkbox.checked = teacher.validated ? true : false; // Revert the checkbox state if not accepted
      return;
    }

    teacher.validated = !teacher.validated;

    try {
      const response = await this.teachersService.updateTeacher(teacher);
      this.confirmation('Cambio realizado', 'Se ha modificado el estado del profesor', 'Ok');
    } catch (error) {
      console.error('Error updating student validation:', error);
      teacher.validated = !teacher.validated; // Revert the change if the update fails
      checkbox.checked = teacher.validated; // Update the checkbox state
    }
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadStudents();
    }
  }

  async alert(title: string, text: string, confirmButtonText: string, cancelButtonText: string): Promise<boolean> {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText
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

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.loadStudents();
    }
  }
}
