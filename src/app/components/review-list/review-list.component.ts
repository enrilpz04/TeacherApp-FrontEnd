import { Component, Input } from '@angular/core';
import { IReview } from '../../interfaces/ireview.interface';
import { ReviewCardComponent } from "./review-card/review-card.component";

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [ReviewCardComponent],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.css'
})
export class ReviewListComponent {
  @Input() reviews: IReview[] = [];
}
