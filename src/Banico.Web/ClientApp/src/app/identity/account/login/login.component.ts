import { Component } from '@angular/core';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent {
  isRequesting: boolean = false;
  isSuccessful: boolean = false;
  errors: string;  
  returnUrl: string = '/';

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }
  
  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        if (params.returnUrl) {
          this.returnUrl = params.returnUrl;
        }
      });
  }
  
  public login() {
    this.isRequesting = true;
    this.accountService.login(
      this.loginForm.value['email'],
      this.loginForm.value['password']
    )
    .finally(() => this.isRequesting = false)
    .subscribe(
      result  => {
        if (result) {
          var myResult: any = result;
          window.localStorage.setItem('auth_token', myResult.auth_token);
          this.isSuccessful = true;
          this.router.navigate([this.returnUrl]);                         
        } else {
        }
      },
      errors => {
        this.errors = errors;
      });
  }
}