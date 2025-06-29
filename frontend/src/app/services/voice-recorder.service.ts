// src/app/services/voice-recorder.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VoiceRecorderService {
    private recorder?: MediaRecorder;
    private chunks: Blob[] = [];
    readonly API_URL = 'http://localhost:5037/api/audio-note';

    constructor(private http: HttpClient) { }

    /** returns true if the browser supports MediaRecorder */
    get supported(): boolean {
        return !!(navigator.mediaDevices && (window as any).MediaRecorder);
    }

    async start(): Promise<void> {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.recorder = new MediaRecorder(stream);
        this.chunks = [];

        this.recorder.ondataavailable = (e) => this.chunks.push(e.data);
        this.recorder.start();
    }

    /** stops the recorder, uploads the blob and returns server response text */
    async stopAndUpload(token: string | null): Promise<string> {
        if (!this.recorder) throw new Error('Recorder not started');

        const blob: Blob = await new Promise<Blob>((resolve) => {
            this.recorder!.onstop = () => resolve(new Blob(this.chunks, { type: 'audio/webm' }));
            this.recorder!.stop();
        });

        // build multipart/form‑data
        const form = new FormData();
        form.append('audio', blob, 'note.webm');

        const headers = token
            ? new HttpHeaders({ Authorization: `Bearer ${token}` })
            : undefined;

        return await firstValueFrom(this.http.post(this.API_URL, form, { headers, responseType: 'text' }));
    }
}
