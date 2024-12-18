import { Routes } from '@angular/router';
import { NotFoundComponent } from './features/error-routing/not-found/not-found.component'; // Fixed import
import {ErrorComponent } from './features/error-routing/error/error.component'; // Fixed path
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { BarcodeComponent } from './features/barcode/barcode.component';

import { BrowserModule } from '@angular/platform-browser';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
// Ensure all components exist in the correct paths and their class names match

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirect empty path to login
  { path: 'error', component: ErrorComponent }, // Error page route
  {
    path: 'login',
    component: LoginComponent,
    data: { text: 'login' } // Data can be used for page titles or metadata
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { text: 'home' }
  },
  {
    path: 'barcode',
    component: BarcodeComponent,
    data: { text: 'barcode' }
  },
  { path: '**', component: NotFoundComponent } // Catch-all for undefined routes
];
