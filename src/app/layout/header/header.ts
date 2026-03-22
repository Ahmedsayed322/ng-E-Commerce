import { Component, ElementRef, inject, input, viewChild } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { HeaderIcons } from '../header-icons/header-icons';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { productStore } from '../../store/product';
import { Panel } from "../../directives/panel";
@Component({
  selector: 'app-header',
  imports: [
    MatToolbar,
    HeaderIcons,
    MatIconButton,
    MatIcon,
    
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
   
],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  search = viewChild<ElementRef<HTMLInputElement>>('searchValue');
  router = inject(Router);
  productStore = inject(productStore);

  do(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const value = this.search()?.nativeElement.value;

      this.router.navigate(['products', this.productStore.category()], {
        queryParams: {
          search: value ? value : undefined,
        },
      });
    }
  }

  clearSearch() {
    const input = this.search();
    if (input) {
      input.nativeElement.value = '';
    }
    if (this.router.url.split('/')[1] === 'products')
      this.router.navigate(['products', this.productStore.category()]);
  }
}
