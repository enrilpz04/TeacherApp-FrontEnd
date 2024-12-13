import { Component, inject } from '@angular/core';
import { UserService } from '../../../services/users.service';
import { IUser } from '../../../interfaces/iuser.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [],
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.css'
})
export class StudentsListComponent {
  usersService: UserService = inject(UserService)
  students!: IUser[]
  page: number = 1
  size: number = 5
  totalPages!: number

  ngOnInit() {
    this.loadStudents();
  }

  async loadStudents() {
    try {
      const response = await this.usersService.getStudentsWithPagination(this.page, this.size);
      this.students = response.students
      console.log(this.students)
      this.totalPages = response.totalPages
    } catch (error) {
      console.error('Error loading students:', error);
    }
  }

  async updateStudentValidation(student: IUser, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const word = student.validated ? 'desactivar' : 'activar';
    const accepted = await this.alert('Alerta', `¿Estás seguro de ${word} a este estudiante?`, 'Aceptar', 'Cancelar');
    if (!accepted) {
      checkbox.checked = student.validated ? true : false; // Revert the checkbox state if not accepted
      return;
    }

    student.validated = !student.validated;

    try {
      const response = await this.usersService.updateStudent(student);
      console.log(response)
      this.confirmation('Cambio realizado', 'Se ha modificado el estado del estudiante', 'Ok');
    } catch (error) {
      console.error('Error updating student validation:', error);
      student.validated = !student.validated; // Revert the change if the update fails
      checkbox.checked = student.validated; // Update the checkbox state
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
