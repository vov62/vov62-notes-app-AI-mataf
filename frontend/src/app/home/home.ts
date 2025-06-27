import { Component, signal } from '@angular/core';
import { Header } from '../components/header/header';
import { NotesList } from '../components/notes-list/notes-list';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Header, NotesList],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
}
