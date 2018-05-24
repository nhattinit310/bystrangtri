import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertRoutingModule } from './alert-routing.module';
import { AlertComponent } from './alert.component';

@NgModule({
  imports: [
    CommonModule,
    AlertRoutingModule
  ],
  declarations: [AlertComponent]
})
export class AlertModule { }
