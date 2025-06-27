import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './home/home';
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home,],
  template: `
  <app-home/>
  
  `,
  styleUrl: './app.scss'
})
export class App {
}
