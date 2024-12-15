import { Component, inject } from '@angular/core';
import { BookingsService } from '../../../services/bookings.service';
import { AuthService } from '../../../services/auth.service';
import { IBooking } from '../../../interfaces/ibooking.interface';
import { IUser } from '../../../interfaces/iuser.interface';
import { TeachersService } from '../../../services/teachers.service';
import { ITeacher } from '../../../interfaces/iteacher.interface';
import { CommonModule } from '@angular/common';
import { Form, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.css'
})
export class ClassesComponent {

  bookings!: IBooking[];
  user!: IUser;
  teacher!: ITeacher;
  filterForm!: FormGroup;
  showArchived = false;

  bookingsService = inject(BookingsService);
  teachersService = inject(TeachersService);
  authService = inject(AuthService);

  constructor() {
    this.filterForm = new FormGroup({
      date: new FormControl("", []),
      status: new FormControl("", []),
    })
  }

  ngOnInit() {
    this.authService.getUser().subscribe(async user => {
      if (user) {
        this.user = user;
        if (this.user.rol === 'student') {
          this.bookingsService.getAllBookingsFromStudent(this.user.id!).then(bookings => {
            this.bookings = bookings;
          });
        } else {
          this.teacher = await this.teachersService.getTeacherByUserId(this.user.id!);
          this.bookingsService.getAllBookingsFromTeacher(this.teacher.id!).then(bookings => {
            this.bookings = bookings;
          })
        }
      }
    });
  }

  getBookingsLength() {
    return this.bookings.length;
  }

  async cancelBooking(booking: IBooking) {
    const accepted = await this.alert('Alerta', '¿Estas seguro de cancelar esta clase?', 'Aceptar', 'Cancelar');
    if (!accepted) return;
    booking.status = 'cancelled'
    const updatedBooking = await this.bookingsService.updateBooking(booking.id!, booking);
    this.updateBookingInList(updatedBooking);
    this.confirmation('Cambio realizado', 'La clase ha sido cancelada', 'Ok');
  }

  async acceptBooking(booking: IBooking) {
    const accepted = await this.alert('Alerta', '¿Estas seguro de confirmar esta clase?', 'Aceptar', 'Cancelar');
    if (!accepted) return;
    booking.status = 'confirmed'
    const updatedBooking = await this.bookingsService.updateBooking(booking.id!, booking);
    this.updateBookingInList(updatedBooking);
    this.confirmation('Cambio realizado', 'La clase ha sido confirmada', 'Ok');
  }

  async completeBooking(booking: IBooking) {
    const accepted = await this.alert('Alerta', '¿Estas seguro de completar esta clase?', 'Aceptar', 'Cancelar');
    if (!accepted) return;
    booking.status = 'completed'
    const updatedBooking = await this.bookingsService.updateBooking(booking.id!, booking);
    this.updateBookingInList(updatedBooking);
    this.confirmation('Cambio realizado', 'La clase ha sido completada', 'Ok');
  }

  async archiveBooking(booking: IBooking) {
    const accepted = await this.alert('Alerta', '¿Estas seguro de archivar esta clase?', 'Aceptar', 'Cancelar');
    if (!accepted) return;
    booking.status = 'archived'
    const updatedBooking = await this.bookingsService.updateBooking(booking.id!, booking);
    this.updateBookingInList(updatedBooking);
    this.confirmation('Cambio realizado', 'La clase ha sido archivada', 'Ok');
  }

  async activeBooking(booking: IBooking) {
    const accepted = await this.alert('Alerta', '¿Estas seguro de confirmar esta clase?', 'Aceptar', 'Cancelar');
    if (!accepted) return;
    booking.status = 'confirmed'
    const updatedBooking = await this.bookingsService.updateBooking(booking.id!, booking);
    this.updateBookingInList(updatedBooking);
    this.confirmation('Cambio realizado', 'La clase se ha reactivado', 'Ok');
  }

  updateBookingInList(updatedBooking: IBooking) {
    const index = this.bookings.findIndex(b => b.id === updatedBooking.id);
    if (index !== -1) {
      this.bookings[index] = updatedBooking;
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

  cleanFilters() {
    this.filterForm.reset();
  }

  viewArchived() {
    this.showArchived = !this.showArchived;
  }

  getDataForm() {
    this.bookingsService.getAllBookingsFromUserByDateAndStatus(this.user.id!, this.filterForm.value.date, this.filterForm.value.status).then(bookings => {
      this.bookings = bookings;
    });
  }
}
