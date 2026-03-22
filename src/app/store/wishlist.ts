import {
  patchState,
  signalMethod,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Product } from '../models/product';
import { afterNextRender, computed, inject } from '@angular/core';
import { Toaster } from '../services/toaster';

export type cartState = {
  wishlist: Product[];
  error: string | null;
  loading: boolean;
};
const initialState = {
  wishlist: [] as Product[],
  error: null,
  loading: true,
};
export const WishlistStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    whishListCounter: computed(() => store.wishlist().length),
  })),

  withMethods((store, toast = inject(Toaster)) => ({
    addToWishList: signalMethod((product: Product) => {
      patchState(store, {
        wishlist: [...store.wishlist(), product],
        error: undefined,
        loading: false,
      });
      localStorage.setItem('wishlist', JSON.stringify(store.wishlist()));
      toast.success('product added to wishlist successfully');
    }),
    removeFromWishList: signalMethod((productId: string) => {
      patchState(store, {
        wishlist: [...store.wishlist().filter((i) => i.id !== productId)],
        loading: false,
      });
      localStorage.setItem('wishlist', JSON.stringify(store.wishlist()));
      toast.success('product removed from wishlist successfully');
    }),
    clearWishlist: () => {
      patchState(store, {
        wishlist: [],
        loading: false,
        error: undefined,
      });
      localStorage.setItem('wishlist', JSON.stringify(store.wishlist()));
    },
  })),
  withHooks({
    onInit(store) {
      afterNextRender(() => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')!);
        if (wishlist) {
          patchState(store, { error: null, loading: false, wishlist });
        }
      });
    },
  }),
);
