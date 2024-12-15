import { Component, inject } from '@angular/core';
import { ITeacher } from '../../interfaces/iteacher.interface';
import { TeachersService } from '../../services/teachers.service';
import { ActivatedRoute } from '@angular/router';
import { ReviewsService } from '../../services/reviews.service';
import { IReview } from '../../interfaces/ireview.interface';
import { ReviewListComponent } from '../../components/review-list/review-list.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../interfaces/iuser.interface';
import { BookingsService } from '../../services/bookings.service';
import { IBooking } from '../../interfaces/ibooking.interface';

@Component({
  selector: 'app-teacher-view',
  standalone: true,
  imports: [ReviewListComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './teacher-view.component.html',
  styleUrl: './teacher-view.component.css'
})
export class TeacherViewComponent {

  // Teacher, Active user and reviews data
  teacher!: ITeacher;
  user!: IUser;
  reviews!: IReview[];


  // Average rating and star percentages for progress bars
  averageRating: number = 0;
  numbers = [1, 2, 3, 4, 5];
  starPercentages: number[] = [0, 0, 0, 0, 0];

  // Booking Dialog boolean
  isDialogOpen: boolean = false;

  // Booking form and available time slots
  bookingForm: FormGroup;
  timeSlots = [
    { time: '08:00:00', available: true },
    { time: '09:00:00', available: true },
    { time: '10:00:00', available: true },
    { time: '11:00:00', available: true }
  ];

  // Show time slots boolean and selected time slot
  showTimeSlots: boolean = false;
  selectedTimeSlot!: string;

  // Total price for booking
  totalPrice: number = 0;

  // Inject services and activated route
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  teachersService: TeachersService = inject(TeachersService);
  reviewsService: ReviewsService = inject(ReviewsService);
  authService: AuthService = inject(AuthService);
  bookingsService: BookingsService = inject(BookingsService);

  // Form initialization
  constructor() {
    this.bookingForm = new FormGroup({
      date: new FormControl("", []),
      startTime: new FormControl("", []),
      status: new FormControl("", []),
      student: new FormControl("", []),
      teacher: new FormControl("", [])
    })
  }

  ngOnInit() {

    // Get teacher, reviews and user
    this.activatedRoute.params.subscribe(async (params: any) => {
      let id = params.id;
      this.teacher = await this.teachersService.getTeacherById(id);
      this.setTimeSlot()
      this.reviews = await this.reviewsService.getAllReviewsByTeacherId(this.teacher.id.toString());
      this.authService.getUser().subscribe(user => {
        if (user) {
          this.user = user;
        }
      });
      this.calculateAverageRating();
      this.calculateStarPercentages();
    })

    // Listen to date changes
    this.bookingForm.get('date')?.valueChanges.subscribe(date => {
      if(date === null) return;
      this.setTimeSlot();
      this.getAvailableTimeSlots(date);
    });

    // Listen to start time changes
    this.bookingForm.get('startTime')?.valueChanges.subscribe(startTime => {
      this.selectedTimeSlot = startTime;
      if (startTime !== '') {
        this.totalPrice = this.teacher.price_p_hour;
      } else {
        this.totalPrice = 0;
      }
    });
  }

  getReviewsLength(): number {
    return this.reviews ? this.reviews.length : 0;
  }

  // Set time slot
  setTimeSlot(): void {
    switch (this.teacher.schedule) {
      case 'Morning':
        this.timeSlots = [
          { time: '08:00:00', available: true },
          { time: '09:00:00', available: true },
          { time: '10:00:00', available: true },
          { time: '11:00:00', available: true }
        ]
        break;
      case 'Afternoon':
        this.timeSlots = [
          { time: '12:00:00', available: true },
          { time: '13:00:00', available: true },
          { time: '14:00:00', available: true },
          { time: '15:00:00', available: true }
        ]
        break;
      case 'Night':
        this.timeSlots = [
          { time: '16:00:00', available: true },
          { time: '17:00:00', available: true },
          { time: '18:00:00', available: true },
          { time: '19:00:00', available: true }
        ]
        break;
    }
  }

  // Calculate average rating
  calculateAverageRating(): void {
    if (this.reviews.length > 0) {
      const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
      this.averageRating = totalRating / this.reviews.length;
    } else {
      this.averageRating = 0;
    }
  }

  // Calculate star percentages
  calculateStarPercentages(): void {
    const totalReviews = this.getReviewsLength();
    if (totalReviews > 0) {
      const starCounts = this.reviews.reduce((counts, review) => {
        const rating = Math.floor(review.rating); // Redondear hacia abajo para obtener el valor entero
        counts[rating - 1] = (counts[rating - 1] || 0) + 1;
        return counts;
      }, [0, 0, 0, 0, 0]);

      for (let star = 0; star < 5; star++) {
        this.starPercentages[star] = (starCounts[star] / totalReviews) * 100;
      }
      console.log(this.starPercentages);
    } else {
      this.starPercentages = [0, 0, 0, 0, 0];
    }
  }

  // Open and close booking dialog
  openDialog(): void {
    this.isDialogOpen = true;
  }

  closeDialog(): void {
    this.isDialogOpen = false;
    this.bookingForm.reset();
    this.removeStartTime();
    this.setTimeSlot();
    this.showTimeSlots = false;
  }

  // Get available time slots
  async getAvailableTimeSlots(date: Date): Promise<void> {
    const bookings = await this.bookingsService.getBookingsByDateAndTeacherId(date, this.teacher.id);
    this.timeSlots.forEach(slot => slot.available = true);
    bookings.forEach(booking => {
      const startIndex = this.timeSlots.findIndex(slot => slot.time === booking.startTime);
      if (startIndex !== -1) {
        this.timeSlots.splice(startIndex, 1); // Eliminar la posición del array si cumple la condición
      }
    });
    this.showTimeSlots = true;
  };

  // Set start time and remove start time
  setStartTime(time: string): void {
    this.bookingForm.get('startTime')?.setValue(time);
  }

  removeStartTime(): void {
    this.bookingForm.get('startTime')?.setValue('');
  }

  // Submit booking
  async submitBooking(): Promise<void> {
    const booking : IBooking = {
      date: this.bookingForm.get('date')?.value,
      startTime: this.bookingForm.get('startTime')?.value,
      status: 'pending',
      student: this.user,
      teacher: this.teacher
    }
    const response = await this.bookingsService.createBooking(booking);
    this.closeDialog();
  }
}
