import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThemeSetupComponent } from './theme-setup.component';

const routes: Routes = [{
  path: '',
  component: ThemeSetupComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeSetupRoutingModule { }
