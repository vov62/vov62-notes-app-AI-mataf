import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Note {
    id?: string;
    content: string;
    color: string;
    createdAt?: Date;
}

@Injectable({
    providedIn: 'root',
})
export class NotesService {
    private apiUrl = 'http://localhost:5037/api/notes';

    constructor(private http: HttpClient) { }

    loadNotes(): Observable<Note[]> {
        return this.http.get<Note[]>(this.apiUrl);
    }

    createNote(note: Note): Observable<Note> {
        return this.http.post<Note>(this.apiUrl, note);
    }

    updateNote(id: string, note: Note): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, note);
    }

    deleteNote(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
