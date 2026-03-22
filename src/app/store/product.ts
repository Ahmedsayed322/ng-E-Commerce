import { afterNextRender, computed, inject, PLATFORM_ID } from '@angular/core';
import { Product } from '../models/product';
import {
  patchState,
  signalMethod,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { catchError, EMPTY, tap } from 'rxjs';

import { ApiService } from '../services/api-service';
import { withResource } from '@angular-architects/ngrx-toolkit';
import { HttpClient, httpResource } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { SeoService } from '../services/seo-service';

export type productState = {
  category: string;
  search: string;
  error: string | null;
  loading: boolean;
  selectedProduct: Product | null;
  selectedProductLoading: boolean;
  openSideNav: boolean;
};
const initialState: productState = {
  error: null,
  search: '',
  openSideNav: false,
  selectedProduct: null,
  selectedProductLoading: false,
  category: 'all',
  loading: true,
};
export const productStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withResource((store) => {
    const platformId = inject(PLATFORM_ID);
    return {
      products: httpResource<Product[]>(
        () => (isPlatformBrowser(platformId) ? 'https://fakestoreapi.com/products' : undefined),
        {
          defaultValue: [],
        },
      ),
    };
  }),
  withComputed((store) => ({
    filteredProducts: computed(() => {
      if (!store.productsValue()?.length) return [];
      if (store.category() === 'all') {
        if (!store.search()) {
          return store.productsValue();
        }
        return store
          .productsValue()!
          .filter((p) => p.title.toLowerCase().includes(store.search().toLowerCase()));
      }
      if (!store.search()) {
        return store.productsValue()!.filter((p) => p.category === store.category());
      }
      return store
        .productsValue()!
        .filter(
          (p) =>
            p.category === store.category() &&
            p.title.toLowerCase().includes(store.search().toLowerCase()),
        );
    }),
    categories: computed(() => {
      const products = store.productsValue();
      if (!products?.length) return ['all'];
      return ['all', ...new Set(products.map((p) => p.category))];
    }),
  })),

  withMethods((store, apis = inject(ApiService), seo = inject(SeoService)) => ({
    seoProductsListTags: signalMethod<string | undefined>((category) => {
      const catName = category!.charAt(0).toUpperCase() + category!.slice(1);
      const description = `Browse our collection of ${category} products`;
      seo.updateSeoTags({ title: catName, description });
    }),
    ///////////////////////
    seoSelectedProductTags: signalMethod<Product | null>((product) => {
      if (!product) return;
      seo.updateSeoTags({
        title: product.title,
        description: product.description,
        image: product.image,
        type: 'product',
      });
    }),
    ///////////////////////
    setCategory: signalMethod<string>((category: string) => {
      patchState(store, { category });
    }),
    /////////////////////
    setSearch: signalMethod((query: string | undefined) => {
      patchState(store, { search: query });
    }),
    ///////////////////////
    toggleSideNav: () => {
      store.openSideNav()
        ? patchState(store, { openSideNav: false })
        : patchState(store, { openSideNav: true });
    },
    /////////////////////
    getProduct: signalMethod<string>((productId) => {
      if (store.selectedProduct()?.id == productId) {
        return;
      }
      patchState(store, { selectedProductLoading: true, error: null, selectedProduct: null });

      apis
        .getProductApi(productId)
        .pipe(
          tap((product) => {
            patchState(store, {
              selectedProduct: product,
              selectedProductLoading: false,
              error: null,
            });
          }),
          catchError(() => {
            patchState(store, {
              error: 'error occurred',
              selectedProductLoading: false,
              selectedProduct: null,
            });
            return EMPTY;
          }),
        )
        .subscribe();
    }),
  })),
);
