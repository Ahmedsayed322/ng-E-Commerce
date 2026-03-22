import { Routes } from '@angular/router';

import { MyWishlist } from './pages/my-wishlist/my-wishlist';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products/all',
  },
  {
    path: 'products/:category',
    loadComponent: () =>
      import('./pages/products-grid/products-grid').then((component) => component.ProductsGrid),
  },
  {
    path: 'wishlist',
    component: MyWishlist,
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart').then((component) => component.Cart),
  },
  {
    path: 'order-success',
    loadComponent: () =>
      import('./pages/checkout/order-success/order-success').then(
        (component) => component.OrderSuccess,
      ),
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./pages/checkout/check-out').then((component) => component.CheckOut),
  },
  {
    path: 'product/:productId',
    loadComponent: () =>
      import('./pages/view-product-details/view-product-details').then(
        (component) => component.ViewProductDetails,
      ),
  },

  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found').then((component) => component.NotFound),
  },
];
