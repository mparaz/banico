import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { InviteRoutingModule } from './invite.routing';
import { InviteComponent }  from './invite.component';
import { InviteFormComponent } from './inviteform/inviteform.component';

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule,
    InviteRoutingModule
  ],
  declarations: [ 
    InviteComponent,
    InviteFormComponent 
  ],
  bootstrap:    [ InviteComponent ]
})
export class InviteModule { }
