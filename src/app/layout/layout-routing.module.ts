import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../shared/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent, canActivate: [AuthGuard],
    // redirectTo: '/dashboard',
    children: [
			{ path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
			{ path: 'accounts', loadChildren: './accounts/accounts.module#AccountsModule' },
			{ path: 'sales', loadChildren: './sales/sales.module#SalesModule' },
			{ path: 'report', loadChildren: './report/report.module#ReportModule' },
			{ path: 'purchase', loadChildren: './purchase/purchase.module#PurchaseModule' },
			{ path: 'chat', loadChildren: './chat/chat.module#ChatModule' },
			{ path: 'phuquoc', loadChildren: './phu-quoc-design/phu-quoc-design.module#PhuQuocDesignModule' },
			{ path: 'group', loadChildren: './user-group/user-group.module#UserGroupModule' },
			{ path: 'theme', loadChildren: './theme-setup/theme-setup.module#ThemeSetupModule' },
			{ path: 'change-pass', loadChildren: './change-pass/change-pass.module#ChangePassModule' },
			// { path: 'history', loadChildren: './history/history.module#HistoryModule' },
			// { path: 'setting', loadChildren: './setting/setting.module#SettingModule' },
			// { path: 'contact', loadChildren: './contact/contact.module#ContactModule'},
			// { path: 'question', loadChildren: './question/question.module#QuestionModule'},
			// { path: 'event', loadChildren: './event/event.module#EventModule'},
			// { path: 'info', loadChildren: './info/info.module#InfoModule'},
			// { path: 'partner', loadChildren: './partner/partner.module#PartnerModule'},
			// { path: 'phr', loadChildren: './phr/phr.module#PhrModule'},
		]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
