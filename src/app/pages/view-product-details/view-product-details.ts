import { Component, inject, input } from '@angular/core';
import { productStore } from '../../store/product';
import { Spinner } from '../../shared/spinner/spinner';
import { BackButton } from '../../shared/back-button/back-button';
import { ProductInfo } from './product-info/product-info';
import { ReviewStore } from '../../store/reviews';
import { Reviews } from './reviews/reviews';

@Component({
  selector: 'app-view-product-details',
  imports: [Spinner, BackButton, ProductInfo, Reviews],
  templateUrl: './view-product-details.html',
  styleUrl: './view-product-details.scss',
})
export class ViewProductDetails {
  productId = input.required<string>();
  productStore = inject(productStore);
  constructor() {
    this.productStore.getProduct(this.productId);
    this.productStore.seoSelectedProductTags(this.productStore.selectedProduct);
  }
}
