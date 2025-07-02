import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteModal } from '../new-note-modal/new-note-modal';
import { HttpClient } from '@angular/common/http';
import { NotesService } from '../../services/notes.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
// import { VoiceNote } from '../voice-note/voice-note';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [CommonModule, NoteModal],
  templateUrl: './notes-list.html',
  styleUrls: ['./notes-list.scss']
})

export class NotesList implements OnInit {
  isModalOpen = false;
  notes: any[] = [];
  isEditing = false;
  editIndex: number | null = null;
  username: string | null = null;

  constructor(private http: HttpClient, private notesSrv: NotesService, private cd: ChangeDetectorRef, private auth: AuthService, private router: Router) {
    this.getNotes()
  }

  ngOnInit(): void {
    this.getNotes();
    this.username = this.auth.getUsernameFromToken();
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


  getNotes() {
    this.notesSrv.loadNotes().subscribe({
      next: (data) => {
        this.notes = data
        this.cd.detectChanges();
      },
      error: (err) => console.error('שגיאה בטעינת פתקים', err)

    })
  }

  handleSave(note: { content: string; color: string }) {
    const username = this.auth.getUsernameFromToken();
    if (this.isEditing && this.editIndex !== null) {
      const noteToUpdate = this.notes[this.editIndex];
      this.notesSrv.updateNote(`${noteToUpdate.id}`, {
        ...noteToUpdate,
        ...note,
        username
      }).subscribe(() => {
        this.notes[this.editIndex!] = {
          ...noteToUpdate,
          ...note,
        };
        this.cd.detectChanges();
        this.closeModal();
      });
    } else {
      this.notesSrv.createNote(note).subscribe(() => {
        this.getNotes();
        this.closeModal();
      });
    }
  }

  deleteNote(id: string) {
    this.notesSrv.deleteNote(id).subscribe({
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

