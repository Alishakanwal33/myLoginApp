import { Component } from '@angular/core';
import { BarcodeFormat } from '@zxing/library'; // Import BarcodeFormat enum
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

@Component({
  selector: 'app-barcode',
  standalone: true,
  imports: [ZXingScannerModule, CommonModule, HttpClientModule],
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.css']
})
export class BarcodeComponent {
  // Scanned barcode value
  scannedCode: string | null = null;

  // Product object to hold fetched product details
  product: any = null;

  // Supported formats
  formats = ['QR_CODE', 'CODE_128', 'EAN_13'];

  // Inject HttpClient for API calls
  constructor(private http: HttpClient) {}

  // Method triggered when scan is successful
  onCodeResult(result: string) {
    this.scannedCode = result;

    // Hit the API to fetch product details
    this.fetchProductDetails(result);
  }

  // Method to fetch product details from API
  fetchProductDetails(barcode: string) {
    const apiUrl = `https://api.example.com/products/${barcode}`; // Replace with your actual API

    this.http.get(apiUrl).subscribe({
      next: (data) => {
        this.product = data; // Set product details
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
        this.product = {
          p_Name: 'Product Not Found',
          p_Price: 'N/A',
          p_detail: 'No details available',
          p_image: ''
        };
      }
    });
  }
}
