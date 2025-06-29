import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-voice-note',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './voice-note.html',
  styleUrls: ['./voice-note.scss']
})
export class VoiceNote {
  isRecording = false;
  text = '';
  mediaRecorder: MediaRecorder | null = null;
  audioChunks: Blob[] = [];

  constructor(private http: HttpClient) { }

  async toggleRecording() {
    if (this.isRecording) {
      this.mediaRecorder?.stop();
    } else {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (e) => {
        this.audioChunks.push(e.data);
      };

      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.audioChunks, { type: 'audio/webm' });
        this.sendAudio(blob);
      };

      this.mediaRecorder.start();
    }

    this.isRecording = !this.isRecording;
  }

  sendAudio(blob: Blob) {
    const formData = new FormData();
    formData.append('audio', blob, 'voice.webm');

    this.http.post<any>('http://localhost:5037/api/speech-to-text', formData)
      .subscribe({
        next: (res) => {
          const json = typeof res === 'string' ? JSON.parse(res) : res;
          this.text = json.text || 'לא הוחזר טקסט';
        },
        error: (err) => {
          console.error('שגיאה בשליחת אודיו:', err);
        }
      });
  }
}
