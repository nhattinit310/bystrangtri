import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { DataTablesModule } from 'angular-datatables/';

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
    DataTablesModule
  ],
  exports: [
    
  ],
  declarations: [LayoutComponent]
})
export class LayoutModule { }
