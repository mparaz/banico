import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  ) { 
    this.accountService.loggedInAs()
    .subscribe(
      result => {
        alert(JSON.stringify(result));
      }
    );
  }
  
  public changePassword(
    form: NgForm) {
    this.isRequesting = true;
    var value = form.value;
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