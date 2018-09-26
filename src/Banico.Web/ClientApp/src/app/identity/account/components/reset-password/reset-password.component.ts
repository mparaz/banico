import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../../main/account.service';
 
@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: []
})
export class ResetPasswordComponent {
  private sub: any;
  isRequesting: boolean;
  isSuccessful: boolean;
  errors: string;

  resetPasswordForm = this.fb.group({
    email: ['', Validators.required],
    code: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });
  
  constructor(
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }
  
  ngOnInit() {
    this.sub = this.route.queryParams
      .subscribe(params => {
        var email = params.email;
        var code = params.code;
        if (email) {
          this.resetPasswordForm.controls['email'].setValue(email);
          this.resetPasswordForm.controls['code'].setValue(code);
        }
      });
  }
  
  public resetPassword() {
    this.isRequesting = true;
    this.accountService.resetPassword(
      this.resetPasswordForm.value['email'],
      this.resetPasswordForm.value['code'],
      this.resetPasswordForm.value['password'],
      this.resetPasswordForm.value['confirmPassword']
    )
    .finally(() => this.isRequesting = false)
    .subscribe(
      result  => {if (result){
          this.router.navigate(
            ['/login'], {
              queryParams: {
                brandNew: true,
                email: this.resetPasswordForm.value['email']
              }
            }
          );                         
      }},
      errors =>  this.errors = errors);
  }
}