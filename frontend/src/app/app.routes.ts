import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Home } from './home/home';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: '', component: Home, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
];

