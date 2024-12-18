import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IGX_CARD_DIRECTIVES, IGX_LIST_DIRECTIVES, IgxAvatarComponent, IgxButtonDirective, IgxOverlayOutletDirective, IgxRippleDirective, IgxToggleActionDirective, IgxToggleDirective } from 'igniteui-angular';
import { IgxCategoryChartModule, IgxPieChartModule } from 'igniteui-angular-charts';
import { Subject, takeUntil } from 'rxjs';
import { RevenueType } from '../models/ecommerce/revenue-type';
import { SalesType } from '../models/ecommerce/sales-type';
import { NewProductsType } from '../models/inventory-app/new-products-type';
import { InventoryAppService } from '../services/inventory-app.service';
import { ECommerceService } from '../services/ecommerce.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IGX_CARD_DIRECTIVES, IGX_LIST_DIRECTIVES, IgxToggleActionDirective, IgxOverlayOutletDirective, IgxPieChartModule, IgxCategoryChartModule, IgxButtonDirective, IgxRippleDirective, IgxToggleDirective, IgxAvatarComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public inventoryAppNewProducts: NewProductsType[] = [];
  public eCommerceSales: SalesType[] = [];
  public eCommerceRevenue: RevenueType[] = [];

  constructor(
    private inventoryAppService: InventoryAppService,
    private eCommerceService: ECommerceService,
  ) {}

  ngOnInit() {
    debugger;
    this.inventoryAppService.getNewProductsList().pipe(takeUntil(this.destroy$)).subscribe(
      data => this.inventoryAppNewProducts = data
    );
    this.eCommerceService.getSalesList().pipe(takeUntil(this.destroy$)).subscribe(
      data => this.eCommerceSales = data
    );
    this.eCommerceService.getRevenueList().pipe(takeUntil(this.destroy$)).subscribe(
      data => this.eCommerceRevenue = data
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
