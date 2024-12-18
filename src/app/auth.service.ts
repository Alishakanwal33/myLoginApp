import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(email: string, password: string): Observable<any> {
    // Simulating a simple login check (you can replace it with API call)
    if (email === 'test@example.com' && password === 'password123') {
      return of({ token: 'fake-jwt-token' });  // Simulate token return
    } else {
      return throwError(() => new Error('Invalid credentials'));
    }
  }
}
