import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router, private cd: ChangeDetectorRef) { }

  login() {
    if (!this.username.trim() || !this.password.trim()) {
      this.error = 'יש למלא שם משתמש וסיסמה';
      this.cd.detectChanges()
      return;
    }

    this.auth.login(this.username, this.password).subscribe({
      next: (res) => {
        this.auth.saveToken(res.token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.error = 'שם משתמש או סיסמה שגויים. נסה שוב או עבור להרשמה';
        this.cd.detectChanges()
      }
    });
  }

  register() {
    this.router.navigate(['/register'])
  }
}
