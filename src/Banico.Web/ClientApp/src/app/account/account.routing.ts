import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from './account.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

export const ROUTES: Routes = [
  { path: 'account', component: AccountComponent, children: [
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'reset-password', component: ResetPasswordComponent}
  ] }
];

@NgModule({
  imports: [
      RouterModule.forChild(ROUTES)
  ],
  exports: [
      RouterModule
  ]
})
export class AccountRoutingModule {}