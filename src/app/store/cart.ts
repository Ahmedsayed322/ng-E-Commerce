import {
  patchState,
  signalMethod,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { afterNextRender, computed, inject } from '@angular/core';
import { CartItem } from '../models/cart';
import { Product } from '../models/product';
import { Toaster } from '../services/toaster';
import { MatDialog } from '@angular/material/dialog';
import { SigninDialog } from '../shared/signin-dialog/signin-dialog';
import { WishlistStore } from './wishlist';
import { UserStore } from './user';
import { Router } from '@angular/router';
import { Order } from '../models/order';


export type cartState = {
  cartItems: CartItem[];
  error: string | null;
  placeOrderLoading: boolean;
  loading: boolean;
};
const initialState: cartState = {
  cartItems: [],
  placeOrderLoading: false,
  error: null,
  loading: true,
};
export const CartStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    cartItemsCounter: computed(() => store.cartItems().reduce((acc, i) => i.quantity + acc, 0)),
    totalCartAmount: computed(() => {
      const total = store.cartItems().reduce((acc, i) => i.product.price * i.quantity + acc, 0);
      const totalAfterTax = total * 0.05 + total;
      return {
        total,
        tax: total * 0.05,
        totalAfterTax,
      };
    }),
  })),
  withMethods(
    (
      store,
      wishlistStore = inject(WishlistStore),
      toast = inject(Toaster),
      dialog = inject(MatDialog),
      userStore = inject(UserStore),
      router = inject(Router),
    ) => ({
      addToCart: signalMethod((data: { product: Product; quantity: number }) => {
        const cartItems = store.cartItems();
        const index = cartItems.findIndex((item) => item.product.id === data.product.id);

        if (index === -1) {
          patchState(store, {
            cartItems: [...cartItems, { product: data.product, quantity: data.quantity }],
            loading: false,
          });
          localStorage.setItem('cart', JSON.stringify(store.cartItems()));
          toast.success('Product added to the cart');
          return;
        }

        const newCart = [...cartItems];

        const newQuantity = newCart[index].quantity + data.quantity;

        newCart[index] = {
          ...newCart[index],
          quantity: newQuantity,
        };

        patchState(store, {
          cartItems: newCart,
          loading: false,
        });
        localStorage.setItem('cart', JSON.stringify(store.cartItems()));
        toast.success(`Product ${data.product.id} quantity is now ${newQuantity}`);
      }),
      removeFromCart: signalMethod((productId) => {
        const newCart = [...store.cartItems().filter((p) => p.product.id != productId)];
        patchState(store, {
          cartItems: newCart,
          error: undefined,
          loading: false,
        });
        localStorage.setItem('cart', JSON.stringify(store.cartItems()));
      }),
      changeQuantity: signalMethod((data: { product: Product; quantity: number }) => {
        const index = store
          .cartItems()
          .findIndex(({ product, quantity }) => product.id === data.product.id);

        const newCart = [...store.cartItems()];
        newCart[index] = { ...newCart[index], quantity: data.quantity };
        patchState(store, { error: undefined, cartItems: newCart, loading: false });
        localStorage.setItem('cart', JSON.stringify(store.cartItems()));
      }),
      proceedToCheckout: () => {
        if (userStore.user()) {
          router.navigate(['/checkout']);
          return;
        }
        dialog.open(SigninDialog, {
          disableClose: false,
          data: {
            checkout: true,
          },
        });
      },
      addToCartFromWhishList: () => {
        if (wishlistStore.wishlist().length === 0) {
          toast.error('no items in wishlist');
          return;
        }
        const newCart = [...store.cartItems()];
        wishlistStore.wishlist().forEach((p) => {
          const index = store.cartItems().findIndex((c) => c.product.id === p.id);
          if (index === -1) {
            newCart.push({ product: p, quantity: 1 });
          }
        });
        patchState(store, {
          cartItems: newCart,
          loading: false,
        });
        wishlistStore.clearWishlist();
        localStorage.setItem('cart', JSON.stringify(store.cartItems()));
      },
      moveToWishlist: signalMethod((product: Product) => {
        const newCart = store.cartItems().filter((p) => p.product.id != product.id);
        const index = wishlistStore.wishlist().findIndex((i) => i.id === product.id);

        if (index === -1) {
          wishlistStore.addToWishList(product);
          patchState(store, {
            cartItems: newCart,
            loading: false,
          });
        }
        localStorage.setItem('cart', JSON.stringify(store.cartItems()));
        toast.success(`${product.title} added to wishlist`);
      }),
      placeOrder: async () => {
        patchState(store, { placeOrderLoading: true });
        if (!userStore.user()) {
          toast.error('please login first');
          patchState(store, { placeOrderLoading: false });
          return;
        }
        const order: Order = {
          id: crypto.randomUUID(),
          userId: userStore.user()?.id!,
          items: store.cartItems(),
          total: store.totalCartAmount().totalAfterTax,
          paymentStatus: 'success',
        };
        await new Promise((resolve) => setTimeout(resolve, 1000));
        patchState(store, { placeOrderLoading: false, cartItems: [] });
        localStorage.setItem('cart', JSON.stringify(store.cartItems()));
        router.navigate(['/order-success']);
      },
    }),
  ),
  withHooks({
    onInit(store) {
      afterNextRender(() => {
        const cart = JSON.parse(localStorage.getItem('cart')!) as CartItem[];
        if (cart) {
          patchState(store, { error: null, loading: false, cartItems: cart });
        }
      });
    },
  }),
);
