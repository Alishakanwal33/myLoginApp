import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,  // Declare as a standalone component
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule]  // Import necessary modules here
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  onSubmit() {
    if (this.email === 'test@example.com' && this.password === 'password123') {
      this.errorMessage = ('Login successful!');
    } else {
      this.errorMessage = 'Invalid email or password';
    }
  }
}
