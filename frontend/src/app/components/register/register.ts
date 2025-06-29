import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  username = '';
  password = '';
  message = '';
  error = ''

  constructor(private http: HttpClient, private router: Router) { }

  register() {
    if (!this.username.trim() || !this.password.trim()) {
      this.error = 'יש למלא שם משתמש וסיסמה';
      return;
    }

    this.http.post('http://localhost:5037/api/auth/register', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: () => {
        this.message = 'נרשמת בהצלחה!';
        this.router.navigate(['/login'])
      },
      error: err => this.message = 'שגיאה: ' + err.error
    });
  }

  login() {
    this.router.navigate(['/login'])
  }
}
