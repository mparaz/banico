import { Component, Inject } from '@angular/core';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as toastr from 'toastr';
import { AccountService } from '../account.service';
import { WindowRefService } from '../../../shared/services/windowref.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent {
  isRequesting: boolean = false;
  isSuccessful: boolean = false;
  errors: string[] = new Array<string>();  
  returnUrl: string = '/';

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    @Inject(WindowRefService) private windowRefService: WindowRefService,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }
  
  ngOnInit() {
    toastr.options = {
      preventDuplicates: true,
      timeOut: 0,
      extendedTimeOut: 0,
      closeButton: true
    };    

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
          this.windowRefService.nativeWindow.location.reload();                       
        } else {
        }
      },
      errors => {
        errors[''].forEach(error => toastr.error(error));
      });
  }
}