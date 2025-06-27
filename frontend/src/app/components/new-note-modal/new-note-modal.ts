import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-new-note-modal',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './new-note-modal.html',
    styleUrls: ['./new-note-modal.scss']
})
export class NoteModal implements OnChanges {
    @Input() isOpen = false;
    @Output() close = new EventEmitter<void>();
    @Output() save = new EventEmitter<{ content: string; color: string }>();
    @Input() existingNote: { content: string; color: string } | null = null;

    selectedColor = 'yellow';
    noteContent = '';

    ngOnChanges(changes: SimpleChanges) {
        if (this.existingNote) {
            this.noteContent = this.existingNote.content;
            this.selectedColor = this.existingNote.color;
        } else {
            this.noteContent = '';
            this.selectedColor = 'yellow';
        }
    }

    selectColor(color: string) {
        this.selectedColor = color;
    }

    saveNote() {
        if (!this.noteContent.trim()) return;

        this.save.emit({
            content: this.noteContent.trim(),
            color: this.selectedColor,
        });

        this.closeModal();
    }

    closeModal() {
        this.close.emit();
    }
}
