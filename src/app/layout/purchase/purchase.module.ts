import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRoutingModule } from './purchase-routing.module';
import { ReportQuantityComponent } from './report-quantity/report-quantity.component';
import { ReportDebtComponent } from './report-debt/report-debt.component';
import { SharedModule } from '../../shared/shared.module';
import { RandomNumber } from '../../shared/helpers/index';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    PurchaseRoutingModule,
    SharedModule
  ],
  providers: [RandomNumber, NgbModule],
  declarations: [ReportQuantityComponent, ReportDebtComponent]
})
export class PurchaseModule { }
