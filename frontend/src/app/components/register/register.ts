import { ChangeDetectorRef, Component } from '@angular/core';
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
  error = ''
  isLoading = false
  apiPostUrl = 'http://localhost:5037/api/auth/register'

  constructor(private http: HttpClient, private router: Router, private cd: ChangeDetectorRef) { }

  register() {
    if (!this.username.trim() || !this.password.trim()) {
      this.error = 'יש למלא שם משתמש וסיסמה';
      return;
    }
    this.isLoading = true
    this.http.post(this.apiPostUrl, {
      username: this.username,
      password: this.password
    }).subscribe({
      next: () => {
        alert('נרשמת בהצלחה!');
        this.isLoading = false;
        this.router.navigate(['/login']);
      }, error: () => {
        this.isLoading = false;
        this.error = 'שגיאה בהרשמה: ';
      },
    });
  }

  login() {
    this.router.navigate(['/login'])
  }
}
