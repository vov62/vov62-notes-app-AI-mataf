import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


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
