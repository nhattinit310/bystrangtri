import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { ReportProductivityComponent } from './report-productivity/report-productivity.component';
import { SharedModule } from '../../shared/shared.module';
import { ReportDebtComponent } from './report-debt/report-debt.component';

@NgModule({
  imports: [
    CommonModule,
    SalesRoutingModule,
    SharedModule
  ],
  declarations: [ReportProductivityComponent, ReportDebtComponent]
})
export class SalesModule { }
