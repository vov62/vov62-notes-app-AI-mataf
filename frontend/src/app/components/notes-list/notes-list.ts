import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteModal } from '../new-note-modal/new-note-modal';
import { HttpClient } from '@angular/common/http';


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

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log('ngOnInit הופעל');
    this.fetchNotes();
  }

  fetchNotes() {
    this.http.get<Note[]>(this.API_URL).subscribe({
      next: (data) => {
        this.notes = data;
        this.cd.detectChanges();
        console.log('קיבלנו מהשרת:', data);
        console.table(this.notes)

      },
      error: (err) => console.error('שגיאה בטעינת פתקים', err)
    });

  }


  openModal() {
    // this.isModalOpen = true;
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

  // handleSave(note: { content: string; color: string }) {
  //   if (this.isEditing && this.editIndex !== null) {
  //     this.notes[this.editIndex] = {
  //       ...note,
  //       createdAt: this.notes[this.editIndex].createdAt,
  //     };
  //   } else {
  //     this.notes.push({
  //       ...note,
  //       createdAt: new Date(),
  //     });
  //   }
  //   this.closeModal();
  // }


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
        this.closeModal();
      });
    } else {
      this.http.post<Note>(this.API_URL, note).subscribe(() => {
        this.fetchNotes();
        this.closeModal();
      });
    }
  }

  trackById(index: number, note: Note): string {
    return note.id ?? index.toString();
  }


  deleteNote(index: number) {
    const note = this.notes[index];
    if (!note.id) return;

    this.http.delete(`${this.API_URL}/${note.id}`).subscribe(() => {
      this.notes.splice(index, 1);
    });
  }


  get currentNote() {
    if (this.isEditing && this.editIndex !== null) {
      return this.notes[this.editIndex];
    }
    return null;
  }

  // deleteNote(index: number) {
  //   this.notes.splice(index, 1);
  // }

  // get currentNote() {
  //   if (this.isEditing && this.editIndex !== null) {
  //     return this.notes[this.editIndex];
  //   }
  //   return null;
  // }

}
