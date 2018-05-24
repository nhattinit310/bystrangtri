import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { BusinessPerformanceComponent } from './business-performance/business-performance.component';
import { SharedModule } from '../../shared/shared.module';
import { RandomNumber } from '../../shared/helpers/';
import { ReportBankAccountComponent } from './report-bank-account/report-bank-account.component';

@NgModule({
  imports: [
    CommonModule,
    ReportRoutingModule,
    SharedModule
  ],
  providers: [RandomNumber],
  declarations: [BusinessPerformanceComponent, ReportBankAccountComponent]
})
export class ReportModule { }
