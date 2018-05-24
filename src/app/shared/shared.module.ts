import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { RouterModule } from '@angular/router';
import { FramesComponent } from './component/frames/frames.component';
import { DataTablesModule } from 'angular-datatables/';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BankAccountTableComponent } from './component/';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ChangePassFormComponent } from './component/change-pass-form/change-pass-form.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import { ModalModule } from 'ngx-bootstrap';
import { VndCurrencyPipe } from './pipes/vnd-currency.pipe';
import { HttpModule } from '@angular/http/';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './component/alert/alert.component';
import { BusyModule, BusyConfig } from 'angular2-busy';
import { PaginationComponent } from './component/pagination/pagination.component';
import { MomentModule } from 'angular2-moment';
import { MathAbsPipe } from './pipes/math-abs.pipe';
import { AutoCompleteModule, DropdownModule } from 'primeng/primeng';
import { FormatAbsPipe } from './pipes/format-abs.pipe';
import { MathCeilPipe } from './pipes/math-ceil.pipe';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DataTablesModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    DropdownModule,
    MomentModule,
    NgbModule.forRoot(),
    NgbDatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    BusyModule.forRoot(
      new BusyConfig({
          message: 'Đang tải...',
          backdrop: true,
      })),
  ],
  exports: [RouterModule,
    CommonModule,
    HeaderComponent,
    HttpModule,
    HttpClientModule,
    FooterComponent,
    FramesComponent,
    AlertComponent,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    BankAccountTableComponent,
    ChangePassFormComponent,
    NgbModule,
    NgbDatepickerModule,
    BsDatepickerModule,
    BusyModule,
    VndCurrencyPipe,
    MathAbsPipe,
    FormatAbsPipe,
    MathCeilPipe,
    PaginationComponent,
    MomentModule,
    AutoCompleteModule,
    DropdownModule,

  ],
  declarations: [HeaderComponent, FooterComponent, FramesComponent, BankAccountTableComponent,
    ChangePassFormComponent, VndCurrencyPipe, AlertComponent, PaginationComponent, MathAbsPipe, FormatAbsPipe, MathCeilPipe]
})
export class SharedModule { }
