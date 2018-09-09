import { Component } from '@angular/core';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ManageService } from '../manage.service';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: []
})
export class ChangePasswordComponent {
  isSuccessful: boolean;
  isRequesting: boolean;
  errors: string;  

  changePasswordForm = this.fb.group({
    oldPassword: ['', Validators.required],
    newPassword: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });

  private getCookie(name): string {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
    return null;
  }

  constructor(
    private manageService: ManageService,
    private router: Router,
    private fb: FormBuilder
  ) { 
  }

public changePassword() {
  this.isRequesting = true;
  this.manageService.changePassword(
    this.changePasswordForm.value['oldPassword'],
    this.changePasswordForm.value['newPassword'],
    this.changePasswordForm.value['confirmPassword']
  )
  .finally(() => this.isRequesting = false)
  .subscribe(
    result  => {
      this.isSuccessful = true;
    },
    errors =>  this.errors = errors);
  }
}