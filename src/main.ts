import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';  // Correct path to AppComponent
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';  // Ensure you're importing `routes` from `app.routes.ts`

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
});