import { Component, input } from '@angular/core';
import { Panel } from '../../../../directives/panel';
import { UserReview } from '../../../../models/user-review';
import { Rating } from "../../../../shared/rating/rating";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comments',
  imports: [Panel, Rating,DatePipe],
  templateUrl: './comments.html',
  styleUrl: './comments.scss',
})
export class Comments {
  comment = input.required<UserReview>();
}
