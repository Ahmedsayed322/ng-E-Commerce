import {
  patchState,
  signalMethod,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { dummyReviews, UserReview } from '../models/user-review';
import { Product } from '../models/product';
import { inject } from '@angular/core';
import { Toaster } from '../services/toaster';
type ReviewState = {
  reviews: UserReview[];
  selectedProductReviews: UserReview[];
  loading: boolean;
  error: null | string;
  writeReview: boolean;
  addReviewLoading: boolean;
};
const initialState: ReviewState = {
  reviews: dummyReviews,
  selectedProductReviews: [],
  writeReview: false,
  loading: false,
  addReviewLoading: false,
  error: null,
};
export const ReviewStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({})),
  withMethods((store, toast = inject(Toaster)) => ({
    getReview: signalMethod((product: Product) => {
      patchState(store, { loading: true });
      const reviews = store.reviews().filter((r) => {
        return r.productId == product?.id;
      });
      console.log(reviews);

      patchState(store, { selectedProductReviews: [...reviews], loading: false });
    }),
    toggleWriteReview: () => {
      if (store.writeReview()) {
        patchState(store, { writeReview: false });
        return;
      }
      patchState(store, { writeReview: true });
    },
    addReview: signalMethod(async (data: UserReview) => {
      patchState(store, { addReviewLoading: true });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      patchState(store, {
        reviews: [...store.reviews(), data],
        selectedProductReviews: [...store.selectedProductReviews(), data],
        addReviewLoading: false,
      });
      patchState(store, { writeReview: false });
      toast.success('Review Added Successfully');
    }),
  })),
);
