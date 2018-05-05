import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { ChangePassword } from './change-password.interface';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: []
})
export class ChangePasswordComponent {
  isSuccessful: boolean;
  isRequesting: boolean;
  errors: string;  

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }
  
  public changePassword(value: ChangePassword) {
    this.isRequesting = true;
    this.accountService.changePassword(
      value.oldPassword,
      value.newPassword,
      value.confirmPassword
    )
    .finally(() => this.isRequesting = false)
    .subscribe(
      result  => {
        this.isSuccessful = true;
      },
      errors =>  this.errors = errors);
  }
}