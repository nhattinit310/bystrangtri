import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ArticlesCreateComponent } from './articles-create/articles-create.component';

const routes: Routes = [{
  path: '',
  component: DashboardComponent
},
{
  path: 'articles-create',
  component: ArticlesCreateComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
