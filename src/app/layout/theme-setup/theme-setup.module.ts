import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeSetupRoutingModule } from './theme-setup-routing.module';
import { ThemeSetupComponent } from './theme-setup.component';

@NgModule({
  imports: [
    CommonModule,
    ThemeSetupRoutingModule
  ],
  declarations: [ThemeSetupComponent]
})
export class ThemeSetupModule { }
