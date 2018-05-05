import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { UserRegistration } from '../models/user.registration.interface';
import { ConfigService } from '../utils/config.service';

import {BaseService} from "./base.service";

import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx'; 

// Add the RxJS Observable operators we need in this app.
import '../../rxjs-operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable()

export class UserService extends BaseService {

  baseUrl: string = '';

  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private loggedIn = false;

  constructor(
    private http: Http, 
    private configService: ConfigService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    super();
    if (isPlatformBrowser(this.platformId)) {
      this.loggedIn = !!localStorage.getItem('auth_token');
    }
    this.baseUrl = configService.getApiURI();
  }

  public register(
    email: string, 
    password: string, 
    firstName: string, 
    lastName: string,
    location: string): 
    Observable<UserRegistration> {
    let body = JSON.stringify({ email, password, firstName, lastName,location });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.baseUrl + "/accounts", body, options)
      .map(res => true)
      .catch(this.handleError);
  }  

  public login(
    userName: string, 
    password: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(
      this.baseUrl + '/accounts/login',
      JSON.stringify({ 
        userName, 
        password 
      }),{ 
        headers 
      })
      .map(res => res.json())
      .map(res => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('auth_token', res.auth_token);
        }
        this.loggedIn = true;
        return true;
      })
      .catch(this.handleError);
  }

  public logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('auth_token');
    }
    this.loggedIn = false;
  }

  public isLoggedIn() {
    return this.loggedIn;
  }

  public facebookLogin(
    accessToken: string
  ) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = JSON.stringify({ accessToken });  
    return this.http
      .post(
      this.baseUrl + '/externalauth/facebook', body, { headers })
      .map(res => res.json())
      .map(res => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('auth_token', res.auth_token);
        }
        this.loggedIn = true;

        return true;
      })
      .catch(this.handleError);
  }
}

