import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteModal } from '../new-note-modal/new-note-modal';


interface Note {
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
export class NotesList {
  isModalOpen = false;

  notes: Note[] = [];
  isEditing = false;
  editIndex: number | null = null;


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

  handleSave(note: { content: string; color: string }) {
    if (this.isEditing && this.editIndex !== null) {
      this.notes[this.editIndex] = {
        ...note,
        createdAt: this.notes[this.editIndex].createdAt,
      };
    } else {
      this.notes.push({
        ...note,
        createdAt: new Date(),
      });
    }
    this.closeModal();
  }

  deleteNote(index: number) {
    this.notes.splice(index, 1);
  }

  get currentNote() {
    if (this.isEditing && this.editIndex !== null) {
      return this.notes[this.editIndex];
    }
    return null;
  }

}
