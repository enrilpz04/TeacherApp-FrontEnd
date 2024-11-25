import { Component, inject } from '@angular/core';
import { ITeacher } from '../../interfaces/iteacher.interface';
import { TeachersService } from '../../services/teachers.service';
import { ActivatedRoute } from '@angular/router';
import { ReviewsService } from '../../services/reviews.service';
import { IReview } from '../../interfaces/ireview.interface';

@Component({
  selector: 'app-teacher-view',
  standalone: true,
  imports: [],
  templateUrl: './teacher-view.component.html',
  styleUrl: './teacher-view.component.css'
})
export class TeacherViewComponent {

  teacher!: ITeacher;
  schedule!: string;
  reviews!: IReview[];
  averageRating: number = 0;
  numbers = [1, 2, 3, 4, 5];
  starPercentages: number[] = [0, 0, 0, 0, 0];

  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  teachersService: TeachersService = inject(TeachersService);
  reviewsService: ReviewsService = inject(ReviewsService);

  ngOnInit() {
    this.activatedRoute.params.subscribe( async (params: any) => {
      let id = params.id;
      this.teacher = await this.teachersService.getTeacherById(id);
      switch(this.teacher.schedule) {
        case 'Morning':
          this.schedule = '10:00h - 14:00h';
          break;
        case 'Afternoon':
          this.schedule = '14:00h - 18:00h';
          break;
        case 'Night':
          this.schedule = '18:00h - 22:00h';
          break;
      }
      this.reviews = await this.reviewsService.getAllReviewsByTeacherId(id);
      this.calculateAverageRating();
      this.calculateStarPercentages();
    })

  }

  calculateAverageRating(): void {
    if (this.reviews.length > 0) {
      const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
      this.averageRating = totalRating / this.reviews.length;
    } else {
      this.averageRating = 0;
    }
  }

  calculateStarPercentages(): void {
    const totalReviews = this.reviews.length;
    if (totalReviews > 0) {
      const starCounts = this.reviews.reduce((counts, review) => {
        counts[review.rating - 1] = (counts[review.rating - 1] || 0) + 1;
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

}
