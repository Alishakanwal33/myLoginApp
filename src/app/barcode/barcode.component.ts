import { Component } from '@angular/core'; // Add this import for NgModule
import { CommonModule } from '@angular/common';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { AuthService } from '../auth.service';
import { product } from '../models/User';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ZXingScannerModule // Import ZXingScannerModule here
  ]

 
})
export class BarcodeComponent {
  scannedCode: string | null = null;

  formats: BarcodeFormat[] = [BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128];

  product: product = new product();
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private authService: AuthService
  ){

  }
  onCodeResult(resultString: string): void {
    this.scannedCode = resultString;
    this.product.barcodenumber= resultString;
    
    this.authService.getProductByBarcode(this.product).subscribe(
      (response) => {
        console.error(response);
        this.product=response.productDetails;
        console.log(this.product);
        //alert(response.productName);
      }, 
      (error) => {
        if (error.status === 401) {
          alert('Invalid barcode');
        } else {
          alert('An error occurred. Please try again later.');
        }
        console.error(error);
      } 
    ); 
  } 


}