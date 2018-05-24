import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportQuantityComponent } from './report-quantity/report-quantity.component';
import { ReportDebtComponent } from './report-debt/report-debt.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'quantity'
  },
  {
    path: 'quantity',
    component: ReportQuantityComponent
  },
  {
    path: 'debt',
    component: ReportDebtComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
