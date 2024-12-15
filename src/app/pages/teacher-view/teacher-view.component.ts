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
import { IMessage } from '../../interfaces/imessage.interface';
import { MessagesService } from '../../services/messages.service';
import { NotificationsService } from '../../services/notifications.service';
import { AlertUtils } from '../../utils/alert-utils';

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
  messageText: string = ""
  schedule = ""

  // Booking Dialog boolean
  isDialogOpen: boolean = false;
  isReviewDialogOpen: boolean = false;

  // Booking form and available time slots
  bookingForm: FormGroup;
  timeSlots = [
    { time: '08:00:00', available: true },
    { time: '09:00:00', available: true },
    { time: '10:00:00', available: true },
    { time: '11:00:00', available: true }
  ];

  //Review form
  reviewForm: FormGroup
  canReview: boolean = false

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
  messagesService: MessagesService = inject(MessagesService)
  notificationsService: NotificationsService = inject(NotificationsService)

  // Form initialization
  constructor() {
    this.bookingForm = new FormGroup({
      date: new FormControl("", []),
      startTime: new FormControl("", []),
      duration: new FormControl("", []),
      status: new FormControl("", []),
      totalPrice: new FormControl("", []),
      student: new FormControl("", []),
      teacher: new FormControl("", [])
    })

    this.reviewForm = new FormGroup({
      rating: new FormControl("", []),
      comment: new FormControl("", []),
      date: new FormControl("", []),
      user: new FormControl("", []),
      teacher: new FormControl("", [])
    })

  }

  loading: boolean = true;

  ngOnInit() {

    // Get user
    this.authService.getUser().subscribe(user => {
      if (user) {
        this.user = user;
      }
    });

    // Suscripcion a los parámetros de la ruta
    this.activatedRoute.params.subscribe(async (params: any) => {
      let id = params.id;

      // Realizar operaciones asincrónicas
      try {

        // Obtener profesor
        this.teacher = await this.teachersService.getTeacherById(id);
        if (this.teacher.schedule === "Morning") this.schedule = "Mañana"
        if (this.teacher.schedule === "Afternoon") this.schedule = "Tarde"
        if (this.teacher.schedule === "Night") this.schedule = "Noche"
        this.setTimeSlot();

        if(this.user) {
          if (this.user.rol === 'student') {
            const response = await this.bookingsService.getAllBookingsBetweenStudentAndTeacher(this.user.id!, this.teacher.id!)
            if (response.length > 0) this.canReview = true
          }
        }

        // Obtener reviews
        this.reviews = await this.reviewsService.getAllReviewsByTeacherId(this.teacher.id!.toString());
        this.calculateAverageRating();
        this.calculateStarPercentages();

      } catch (error) {
        console.error('Error al cargar los datos:', error);
      } finally {
        this.loading = false;
      }
    });

    // Listen to date changes
    this.bookingForm.get('date')?.valueChanges.subscribe(date => {
      if (date === null) return;
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

  get reviewsLength(): number {
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
    const totalReviews = this.reviewsLength;
    if (totalReviews > 0) {
      const starCounts = this.reviews.reduce((counts, review) => {
        const rating = Math.floor(review.rating); // Redondear hacia abajo para obtener el valor entero
        counts[rating - 1] = (counts[rating - 1] || 0) + 1;
        return counts;
      }, [0, 0, 0, 0, 0]);

      for (let star = 0; star < 5; star++) {
        this.starPercentages[star] = (starCounts[star] / totalReviews) * 100;
      }
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

  openReviewDialog(): void {
    this.isReviewDialogOpen = true;
  }

  closeReviewDialog(): void {
    this.isReviewDialogOpen = false;
    this.reviewForm.reset();
  }

  // Get available time slots
  async getAvailableTimeSlots(date: Date): Promise<void> {
    const bookings = await this.bookingsService.getAllBookingsFromUserByDateAndStatus(this.teacher.user.id!, date, null);
    console.log(bookings)
    this.timeSlots.forEach(slot => slot.available = true);
    bookings.forEach(booking => {
      const startIndex = this.timeSlots.findIndex(slot => slot.time === booking.startTime);
      if (startIndex !== -1) {
        this.timeSlots.splice(startIndex, 1); // Eliminar la posición del array si cumple la condición
      }
    });
    this.showTimeSlots = true;
    console.log(this.timeSlots)
  };

  // Set start time and remove start time
  setStartTime(time: string): void {
    this.bookingForm.get('startTime')?.setValue(time);
  }

  removeStartTime(): void {
    this.bookingForm.get('startTime')?.setValue('');
  }

  // Reserva una clase
  async submitBooking(): Promise<void> {
    if (this.bookingForm.get('startTime')?.value === "") return;

    // Alert window
    const accepted = await AlertUtils.alert('Alerta', '¿Estás seguro de reservar esta clase?', 'Aceptar', 'Cancelar')
    if (!accepted) return;

    // Booking creation
    const booking: IBooking = {
      date: this.bookingForm.get('date')?.value,
      startTime: this.bookingForm.get('startTime')?.value,
      duration: 1,
      status: 'pending',
      totalPrice: this.totalPrice,
      student: this.user,
      teacher: this.teacher
    }
    const response = await this.bookingsService.createBooking(booking);

    this.closeDialog();

    // Confirmation alert
    AlertUtils.confirmation('Clase Reservada', 'Tu clase se ha reservado correctamente.', 'Ok');
  }

  async submitReview(): Promise<void> {
    if(this.reviewForm.get('rating')?.value === "") return

    // Alert window
    const accepted = await AlertUtils.alert('Alerta', '¿Estás seguro de enviar esta reseña?', 'Aceptar', 'Cancelar')
    if (!accepted) return;

    const review : IReview = {
      rating: this.reviewForm.get('rating')?.value,
      comment: this.reviewForm.get('comment')?.value,
      date: new Date(),
      user: this.user,
      teacher: this.teacher
    }
    const response = await this.reviewsService.createReview(review)
    this.reviews.push(review)

    this.closeReviewDialog()

    // Confirmation alert
    AlertUtils.confirmation('Reseña Creada', 'Tu reseña se ha enviado correctamente.', 'Ok');
  }

  // Enviar un mensaje al profesor
  async sendMessage(): Promise<void> {
    if (this.messageText === "") return;

    // Alert window
    const accepted = await AlertUtils.alert('Alerta', '¿Estás seguro de enviar este mensaje?', 'Aceptar', 'Cancelar')
    if (!accepted) return;

    // Message creation
    const message: IMessage = {
      text: this.messageText,
      date: new Date(),
      watched: false,
      sender: this.user,
      recipient: this.teacher.user
    };
    const response = await this.messagesService.createMessage(message)

    // Notification creation
    const responseNotification = await this.notificationsService.createNotification(
      {
        type: 'new_message',
        message: 'Tienes un nuevo mensaje de ' + message.sender.name + ' ' + message.sender.surname + ' , el día ' + message.date.toString(),
        date: new Date(),
        read: false,
        user: message.recipient
      }
    )

    // Confirmation alert
    AlertUtils.confirmation('Mensaje Enviado', 'Tu mensaje se ha enviado correctamente.', 'Ok');
  }
}
