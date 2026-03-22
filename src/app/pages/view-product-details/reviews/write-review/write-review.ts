import { Component, inject, input } from '@angular/core';
import { Panel } from '../../../../directives/panel';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { ReviewStore } from '../../../../store/reviews';
import { MatSelectModule } from '@angular/material/select';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { productStore } from '../../../../store/product';
import { UserStore } from '../../../../store/user';
import { UserReview } from '../../../../models/user-review';

@Component({
  selector: 'app-write-review',
  imports: [
    Panel,
    MatFormField,
    MatButton,
    MatLabel,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './write-review.html',
  styleUrl: './write-review.scss',
})
export class WriteReview {
  reviewStore = inject(ReviewStore);
  productStore = inject(productStore);
  userStore = inject(UserStore);
  productId = input();
  stars = [
    {
      stars: 5,
      label: '5 Stars-Excellent',
    },
    {
      stars: 4,
      label: '4 Stars-Good',
    },
    {
      stars: 3,
      label: '3 Stars-Average',
    },
    {
      stars: 2,
      label: '2 Stars-Poor',
    },
    {
      stars: 1,
      label: '1 Stars-Terrible',
    },
  ];
  fb = inject(NonNullableFormBuilder);
  form = this.fb.group({
    title: ['', Validators.required],
    rating: [3, Validators.required],
    comment: ['', Validators.required],
  });
  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    const { comment, rating, title } = this.form.value;

    this.reviewStore.addReview({
      id: `${crypto.randomUUID()}`,
      title: title,
      rating: rating,
      comment: comment,
      productId: this.productStore.selectedProduct()?.id,
      reviewDate: new Date(),
      userImageUrl: this.userStore.user()?.imageUrl,
      userName: this.userStore.user()?.name!,
    } as UserReview);
    this.form.reset();
  }
}
