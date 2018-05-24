import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { SharedModule } from './shared/shared.module';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from './shared/services/api.service';
import { JwtService } from './shared/services/jwt.service';
import { UserService } from './shared/services/user.service';
import { Http } from '@angular/http/';
import { ApiClientService } from './shared/services/api-client.service';
import { ApiConvertHelper } from './shared/helpers/api-convert.helper';
import { AlertService } from './shared/services/alert.service';
import { LocationService } from './shared/services/location.service';
import { InstantSearchService } from './shared/services/instant-search.service';
import { MasterDataService } from './shared/services/master-data.service';
import { ReportService } from './shared/services/report.service';
import { AuthGuard } from './shared/services/auth-guard.service';
import { CommentService } from './shared/services/comment.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    NgbModule.forRoot()
  ],
  providers: [
    ApiClientService,
    ApiConvertHelper,
    AlertService,
    ApiService,
    JwtService,
    UserService,
    LocationService,
    MasterDataService,
    InstantSearchService,
    CommentService,
    AuthGuard,
    ReportService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
