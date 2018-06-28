import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from './account.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

import { AuthGuard } from '../shared/services/auth.guard';

export const ROUTES: Routes = [
  { path: 'account', component: AccountComponent, children: [
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'confirm-email', component: ConfirmEmailComponent},
    { path: 'reset-password', component: ResetPasswordComponent},
    { path: 'forgot-password', component: ForgotPasswordComponent},
    { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard] }
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