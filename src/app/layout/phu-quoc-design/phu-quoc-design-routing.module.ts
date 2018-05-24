import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankAccountComponent } from './bank-account/bank-account.component';
import { CashBookComponent } from './cash-book/cash-book.component';
import { ListMerchandiseComponent } from './list-merchandise/list-merchandise.component';
import { OutputExistsComponent } from './output-exists/output-exists.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'bank'
  },
  {
    path: 'bank',
    component: BankAccountComponent
  },
  {
    path: 'cash-book',
    component: CashBookComponent
  },
  {
    path: 'merchandise',
    component: ListMerchandiseComponent
  },
  {
    path: 'output-exists',
    component: OutputExistsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhuQuocDesignRoutingModule { }
