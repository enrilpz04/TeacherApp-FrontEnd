import { Component, Input } from '@angular/core';
import { IReview } from '../../../interfaces/ireview.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css'
})
export class ReviewCardComponent {
  @Input() review!: IReview;

  numbers = [1, 2, 3, 4, 5];
}
