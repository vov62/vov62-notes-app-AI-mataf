import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { JwtInterceptor } from './app/interceptors/jwt.interceptor';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideHttpClient(withInterceptors([JwtInterceptor]))
  ]
}).catch((err) => console.error(err));
