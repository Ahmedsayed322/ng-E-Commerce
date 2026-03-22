import { Component, effect, inject, input } from '@angular/core';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatNavList, MatListItem, MatListItemTitle } from '@angular/material/list';
import { ProductCard } from '../../shared/product-card/product-card';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { productStore } from '../../store/product';
import { ToggleWishlist } from '../../shared/toggle-wishlist/toggle-wishlist';
import { Spinner } from '../../shared/spinner/spinner';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-products-grid',
  imports: [ProductCard, TitleCasePipe, ToggleWishlist, Spinner],
  templateUrl: './products-grid.html',
  styleUrl: './products-grid.scss',
})
export class ProductsGrid {
  category = input<string>('all');
  search = input<string | undefined>(undefined);
  store = inject(productStore);
  categories = this.store.categories;

  constructor() {
    this.store.setCategory(this.category);
    this.store.setSearch(this.search);
    this.store.seoProductsListTags(this.category);
  }
}
