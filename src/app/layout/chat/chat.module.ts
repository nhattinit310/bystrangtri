import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { MomentModule } from 'angular2-moment/moment.module';

@NgModule({
  imports: [
    CommonModule,
    MomentModule,
    ChatRoutingModule
  ],
  declarations: [ChatComponent]
})
export class ChatModule { }
