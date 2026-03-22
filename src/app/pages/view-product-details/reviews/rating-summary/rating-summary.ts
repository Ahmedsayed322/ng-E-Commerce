import { Component, computed, effect, input } from '@angular/core';
import { RatingObj } from '../../../../models/product';
import { Rating } from '../../../../shared/rating/rating';
import { UserReview } from '../../../../models/user-review';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-rating-summary',
  imports: [Rating],
  templateUrl: './rating-summary.html',
  styleUrl: './rating-summary.scss',
})
export class RatingSummary {
  ratingObj = input.required<RatingObj>();
  reviews = input.required<UserReview[]>();
  ratingBreakDown = computed<
    {
      star: number;
      count: number;
      percentage: number;
    }[]
  >(() => {
    const total = this.reviews().length;
    const stars = [1, 2, 3, 4, 5];
    if (total === 0) {
      return stars.map((star) => ({
        star,
        count: 0,
        percentage: 0,
      }));
    }
    const result = stars.map((star) => {
      const count = this.reviews().filter((review) => review.rating === star).length;

      return {
        star,
        count,
        percentage: (count / total) * 100,
      };
    });

    return result
  });
}
