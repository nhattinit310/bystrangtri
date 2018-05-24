import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhuQuocDesignRoutingModule } from './phu-quoc-design-routing.module';
import { BankAccountComponent } from './bank-account/bank-account.component';
import { SharedModule } from '../../shared/shared.module';
import { RandomNumber } from '../../shared/helpers/';
import { CashBookComponent } from './cash-book/cash-book.component';
import { ListMerchandiseComponent } from './list-merchandise/list-merchandise.component';
import { OutputExistsComponent } from './output-exists/output-exists.component';

@NgModule({
  imports: [
    CommonModule,
    PhuQuocDesignRoutingModule,
    SharedModule
  ],
  providers: [RandomNumber],
  declarations: [BankAccountComponent, CashBookComponent, ListMerchandiseComponent, OutputExistsComponent]
})
export class PhuQuocDesignModule { }
