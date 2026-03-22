import { Component, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-back-button',
  imports: [MatIcon, MatButton, RouterLink],
  templateUrl: './back-button.html',
  styleUrl: './back-button.scss',
  host: {
    class: 'block',
  },
})
export class BackButton {
  title = input<string>();
  navigateTo = input<string>();
}
