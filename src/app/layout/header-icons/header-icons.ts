import { Component, computed, inject } from '@angular/core';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatBadge } from '@angular/material/badge';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CartStore } from '../../store/cart';
import { WishlistStore } from '../../store/wishlist';
import { UserStore } from '../../store/user';
import { MatDivider } from "@angular/material/divider";

@Component({
  selector: 'app-header-icons',
  imports: [
    MatIcon,

    MatButton,
    RouterLink,
    MatBadge,
    MatButtonModule,
    MatMenuModule,
    MatDivider
],
  templateUrl: './header-icons.html',
  styleUrl: './header-icons.scss',
  host: {
    class: 'flex items-center gap-2',
  },
})
export class HeaderIcons {
  cartStore = inject(CartStore);
  wishlistStore = inject(WishlistStore);
  userStore = inject(UserStore);
}
