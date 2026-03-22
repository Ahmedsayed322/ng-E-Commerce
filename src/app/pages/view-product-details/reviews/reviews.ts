import { Component, computed, effect, inject, input } from '@angular/core';
import { Panel } from '../../../directives/panel';
import { ReviewStore } from '../../../store/reviews';
import { Product } from '../../../models/product';
import { RatingSummary } from './rating-summary/rating-summary';
import { Comments } from './comments/comments';
import { UserReview } from '../../../models/user-review';

import { UserStore } from '../../../store/user';
import { MatButton } from "@angular/material/button";
import { WriteReview } from "./write-review/write-review";

@Component({
  selector: 'app-reviews',
  imports: [Panel, RatingSummary, Comments, MatButton, WriteReview],
  templateUrl: './reviews.html',
  styleUrl: './reviews.scss',
})
export class Reviews {
  product = input.required<Product>();
  reviewStore = inject(ReviewStore);
  userStore = inject(UserStore);
  sortedReviews = computed<UserReview[]>(() =>
    [...this.reviewStore.selectedProductReviews()].sort((a, b) =>
      a.reviewDate > b.reviewDate ? -1 : 1,
    ),
  );
  constructor() {
    this.reviewStore.getReview(this.product);
  }
}
