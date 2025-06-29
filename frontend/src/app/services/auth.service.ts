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
}
