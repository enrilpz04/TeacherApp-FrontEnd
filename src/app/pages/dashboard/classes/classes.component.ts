import { Component, inject } from '@angular/core';
import { BookingsService } from '../../../services/bookings.service';
import { AuthService } from '../../../services/auth.service';
import { IBooking } from '../../../interfaces/ibooking.interface';
import { IUser } from '../../../interfaces/iuser.interface';
import { TeachersService } from '../../../services/teachers.service';
import { ITeacher } from '../../../interfaces/iteacher.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.css'
})
export class ClassesComponent {

  bookings!: IBooking[];
  user!: IUser;
  teacher!: ITeacher;

  bookingsService = inject(BookingsService);
  teachersService = inject(TeachersService);
  authService = inject(AuthService);

  ngOnInit() {
    this.authService.getUser().subscribe(async user => {
      if (user) {
        this.user = user;
        if (this.user.rol === 'student') {
          this.bookingsService.getAllBookingsFromStudent(this.user.id!).then(bookings => {
            this.bookings = bookings;
            console.log(this.bookings);
          });
        } else {
          this.teacher = await this.teachersService.getTeacherByUserId(this.user.id!);
          this.bookingsService.getAllBookingsFromTeacher(this.teacher.id!).then(bookings => {
            this.bookings = bookings;
            console.log(this.bookings);
          })
        }
      }

    });

  }

}
