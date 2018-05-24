import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportProductivityComponent } from './report-productivity/report-productivity.component';
import { ReportDebtComponent } from './report-debt/report-debt.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'productivity',
    // component: ReportProductivityComponent
  },
  {
    path: 'productivity',
    component: ReportProductivityComponent
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
export class SalesRoutingModule { }
