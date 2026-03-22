import { Component, effect, inject, input } from '@angular/core';
import { MatListItem, MatListItemTitle, MatNavList } from '@angular/material/list';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { productStore } from '../../store/product';
import { TitleCasePipe, NgClass } from '@angular/common';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-app-container',
  imports: [
    TitleCasePipe,
    MatNavList,
    MatListItem,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatListItemTitle,
    RouterLink,
  ],
  templateUrl: './app-container.html',
  styleUrl: './app-container.scss',
})
export class AppContainer {
  category = input<string>('all');
  search = input<string | undefined>(undefined);
  store = inject(productStore);

  constructor() {
    effect(() => {
      this.store.setCategory(this.category());
      this.store.setSearch(this.search());
    });
  }
}
