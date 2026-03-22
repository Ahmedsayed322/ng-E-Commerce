import { Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-order-success',
  imports: [MatIcon, RouterLink, MatAnchor],
  templateUrl: './order-success.html',
  styleUrl: './order-success.scss',
})
export class OrderSuccess {

}
