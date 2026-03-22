import { Component, computed, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RatingObj } from '../../models/product';


@Component({
  selector: 'app-rating',
  imports: [MatIcon, ],
  templateUrl: './rating.html',
  styleUrl: './rating.scss',
})
export class Rating {
  rating = input.required<number>();

  stars = [1, 2, 3, 4, 5];
}
