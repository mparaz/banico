import { Component } from '@angular/core';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../main/account.service';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: []
})
export class ForgotPasswordComponent {
  isSuccessful: boolean;
  isRequesting: boolean;
  errors: string;  

  forgotPasswordForm = this.fb.group({
    email: ['', Validators.required],
  });

  constructor(
    private accountService: AccountService,
    private router: Router,
    private fb: FormBuilder
  ) { }
  
  public forgotPassword() {
    this.isRequesting = true;
    this.accountService.forgotPassword(
      this.forgotPasswordForm.value['email']
    )
    .finally(() => this.isRequesting = false)
    .subscribe(
      result  => {
        this.isSuccessful = true;
      },
      errors =>  this.errors = errors);
  }
}