import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly API_URL = 'http://localhost:5037/api/auth';
    private readonly TOKEN_KEY = 'jwt_token';

    constructor(private http: HttpClient) { }

    login(username: string, password: string): Observable<{ token: string }> {
        return this.http.post<{ token: string }>(`${this.API_URL}/login`, { username, password });
    }

    register(username: string, password: string) {
        return this.http.post(`${this.API_URL}/register`, { username, password });
    }

    saveToken(token: string) {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    logout() {
        localStorage.removeItem(this.TOKEN_KEY);
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }


    getUsernameFromToken(): string | null {
        const token = this.getToken();
        if (!token) return null;

        try {
            const payload = token.split('.')[1];
            const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
            const binary = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
            const jsonString = new TextDecoder().decode(binary); // ⬅️ UTF‑8 תקין
            const parsed = JSON.parse(jsonString);

            return parsed["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
                ?? parsed.username
                ?? parsed.sub
                ?? null;
        } catch {
            return null;
        }
    }

}
