import { inject } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';

import { ApiService } from './services/api-service';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'products/:category',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const ap = inject(ApiService);
      return (await ap.getCategory()).map((category) => ({ category }));
    },
  },
  {
    path: 'cart',
    renderMode: RenderMode.Client,
  },
  {
    path: 'wishlist',
    renderMode: RenderMode.Client,
  },
  {
    path: 'order-success',
    renderMode: RenderMode.Client,
  },
  {
    path: 'checkout',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
