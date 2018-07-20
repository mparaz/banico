import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientXsrfModule } from '@angular/common/http';
import { FormsModule }  from '@angular/forms';

import { SharedModule }   from '../shared/modules/shared.module';
import { ManageService }  from './manage.service';
import { UserService }  from '../shared/services/user.service';
import { EmailValidator } from '../directives/email.validator.directive';
import { AuthGuard } from '../shared/services/auth.guard';

import { ManageRoutingModule }  from './manage.routing';
import { ManageComponent } from './manage.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { ManageLoginsComponent } from './manage-logins/manage-logins.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ManageRoutingModule,
    SharedModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-Token'
    })  
  ],
  declarations: [
    ManageComponent,
    ChangePasswordComponent,
    SetPasswordComponent,
    ManageLoginsComponent
  ],
  providers: [ 
    ManageService,
    UserService,
    AuthGuard
  ],
    bootstrap: [ 
      ManageComponent 
  ]
})
export class ManageModule { }
