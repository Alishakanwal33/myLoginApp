import { Component } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-barcode',
  standalone: true,
  imports: [ZXingScannerModule, CommonModule], // Import required modules
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.css']
})
export class BarcodeComponent {
  // Property to hold the scanned code
  scannedCode: string | null = null;

  // Supported barcode formats
  formats = ['QR_CODE', 'CODE_128', 'EAN_13']; // Adjust formats as needed

  // Product object to display details
  product = {
    p_Name: '',
    p_Price: 0,
    p_detail: '',
    p_image: ''
  };

  // Method to handle scan success
  onCodeResult(result: string) {
    this.scannedCode = result;

    // Simulate fetching product data based on the scanned code
    this.product = {
      p_Name: 'Sample Product',
      p_Price: 999,
      p_detail: 'This is a sample product detail.',
      p_image: 'https://via.placeholder.com/150' // Example image URL
    };
  }
}
