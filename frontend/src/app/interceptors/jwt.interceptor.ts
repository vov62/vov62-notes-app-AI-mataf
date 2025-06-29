// src/app/interceptors/jwt.interceptor.ts
import { inject } from '@angular/core';
import {
    HttpEvent,
    HttpHandlerFn,
    HttpInterceptorFn,
    HttpRequest,
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

export const JwtInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
    const auth = inject(AuthService);
    const token = auth.getToken();

    if (token) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    return next(req);
};
