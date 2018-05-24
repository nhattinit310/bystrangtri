import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangePassRoutingModule } from './change-pass-routing.module';
import { ChangePassComponent } from './change-pass.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ChangePassRoutingModule,
    SharedModule
  ],
  declarations: [ChangePassComponent]
})
export class ChangePassModule { }
