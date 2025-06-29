import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteModal } from '../new-note-modal/new-note-modal';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


interface Note {
  id?: string;
  content: string;
  color: string;
  createdAt: Date;
}

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [CommonModule, NoteModal],
  templateUrl: './notes-list.html',
  styleUrls: ['./notes-list.scss']
})


export class NotesList implements OnInit {
  isModalOpen = false;
  notes: Note[] = [];
  isEditing = false;
  editIndex: number | null = null;
  readonly API_URL = 'http://localhost:5037/api/Notes';
  username: string | null = null;

  constructor(private http: HttpClient, private cd: ChangeDetectorRef, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.fetchNotes();
    this.username = this.auth.getUsernameFromToken();
  }

  fetchNotes() {
    this.http.get<Note[]>(this.API_URL).subscribe({
      next: (data) => {
        this.notes = data;
        this.cd.detectChanges();
      },
      error: (err) => console.error('שגיאה בטעינת פתקים', err)
    });
  }


  openModal() {
    this.isModalOpen = true;
    this.isEditing = false;
    this.editIndex = null;
  }

  openEditModal(index: number) {
    this.editIndex = index;
    this.isEditing = true;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  // save
  handleSave(note: { content: string; color: string }) {
    if (this.isEditing && this.editIndex !== null) {
      const noteToUpdate = this.notes[this.editIndex];
      this.http.put(`${this.API_URL}/${noteToUpdate.id}`, {
        ...noteToUpdate,
        ...note
      }).subscribe(() => {
        this.notes[this.editIndex!] = {
          ...noteToUpdate,
          ...note
        };
        this.cd.detectChanges();
        this.closeModal();
      });
    } else {
      this.http.post<Note>(this.API_URL, note).subscribe(() => {
        this.fetchNotes();
        this.closeModal();
      });
    }
  }

  deleteNote(id: string | undefined) {
    this.http.delete(`${this.API_URL}/${id}`).subscribe({
      next: () => {
        this.notes = this.notes.filter(n => n.id !== id),
          this.cd.detectChanges();;
      },

      error: (err) => {
        console.error('שגיאה במחיקת פתק:', err);
      }
    });
  }

  get currentNote() {
    if (this.isEditing && this.editIndex !== null) {
      return this.notes[this.editIndex];
    }
    return null;
  }


  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
