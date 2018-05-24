import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessPerformanceComponent } from './business-performance/business-performance.component';
import { ReportBankAccountComponent } from './report-bank-account/report-bank-account.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'business'
  },
  {
    path: 'business',
    component: BusinessPerformanceComponent
  },
  {
    path: 'bank',
    component: ReportBankAccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
