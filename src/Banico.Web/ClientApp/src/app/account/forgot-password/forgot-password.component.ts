import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { ForgotPassword } from './forgot-password.interface';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: []
})
export class ForgotPasswordComponent {
  isSuccessful: boolean;
  isRequesting: boolean;
  errors: string;  

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { 
  }
  
  public forgotPassword(
    form: NgForm) {
    this.isRequesting = true;
    var value = form.value;
    this.accountService.forgotPassword(
      value.email
    )
    .finally(() => this.isRequesting = false)
    .subscribe(
      result  => {
        this.isSuccessful = true;
      },
      errors =>  this.errors = errors);
  }
}