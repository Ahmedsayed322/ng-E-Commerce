import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./layout/header/header";
import { AppContainer } from "./layout/app-container/app-container";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, AppContainer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('e-commerce');
}
