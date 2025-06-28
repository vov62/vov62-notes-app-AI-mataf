import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';


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

    constructor(private http: HttpClient, private cd: ChangeDetectorRef) { }

    selectedColor = 'yellow';
    noteContent = '';
    aiPostUrl = 'http://localhost:5037/api/ai/suggest'
    isLoadingAi = false;

    ngOnChanges() {
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


    generateWithAi() {

        if (!this.noteContent?.trim()) {
            alert('נא למלא תוכן לפני שליחת הניסוח ל-AI');
            return;
        }
        this.isLoadingAi = true;
        this.http.post<{ content: string }>(this.aiPostUrl, {
            text: this.noteContent
        }).subscribe({
            next: (res) => {
                this.noteContent = res.content.trim();
                this.isLoadingAi = false;
                this.cd.detectChanges();

            },
            error: (err) => {
                console.error('שגיאה בניסוח AI:', err);
                alert('אירעה שגיאה בעת ניסוח הפתק עם AI');
                this.isLoadingAi = false;
                this.cd.detectChanges();
            }
        });
    }


}
