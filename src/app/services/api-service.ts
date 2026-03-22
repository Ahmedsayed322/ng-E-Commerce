import { DestroyRef, inject, Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  http = inject(HttpClient);
  destroy = inject(DestroyRef);
  private categories = ['all', 'electronics', 'jewelery', 'mens-clothing', 'womens-clothing'];
  getProductApi(id: string) {
    return this.http.get<Product>(`https://fakestoreapi.com/products/${id}`).pipe(take(1));
  }
  async getCategory() {
    return this.categories;
  }
}
