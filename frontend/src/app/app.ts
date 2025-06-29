import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { Home } from './home/home';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,],
  template: `
  <router-outlet></router-outlet>
  `,
  styleUrl: './app.scss'
})
export class App {
}
