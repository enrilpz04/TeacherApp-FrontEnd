import { Component, inject, Input } from '@angular/core';
import { ITeacher } from '../../interfaces/iteacher.interface';
import { RouterLink } from '@angular/router';
import { ReviewsService } from '../../services/reviews.service';
import { IReview } from '../../interfaces/ireview.interface';

@Component({
  selector: 'app-teacher-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './teacher-card.component.html',
  styleUrl: './teacher-card.component.css'
})
export class TeacherCardComponent {
  @Input() teacher : any;

  reviews! : IReview[]

  reviewsService : ReviewsService = inject(ReviewsService)

  async ngOnInit() {
    this.reviews = await this.reviewsService.getAllReviewsByTeacherId(this.teacher.id!)
    this.teacher.rating = await this.calculateAverageRating()
  }

  // Calculate average rating
  async calculateAverageRating(): Promise<number> {
    if (this.reviews.length > 0) {
      const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / this.reviews.length;
      return parseFloat(averageRating.toFixed(1));
    } else {
      return 0;
    }
  }

}
