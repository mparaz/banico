import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ORIGIN_URL } from '../shared/constants/baseurl.constants';
import { BaseService } from "../shared/services/base.service";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AccountService extends BaseService {
    constructor(
        private http: Http,
        @Inject(PLATFORM_ID) private platformId: Object,
        @Inject(ORIGIN_URL) private baseUrl: string
    ) {
        super();
        if (isPlatformBrowser(this.platformId)) {
            this.loggedIn = !!localStorage.getItem('auth_token');
        }
    }
    
    public changePassword(
        oldPassword: string,
        newPassword: string,
        confirmPassword: string
    ): Observable<Response> {
        let body = JSON.stringify({ 
            oldPassword,
            newPassword,
            confirmPassword 
        });
        return this.http.post(this.baseUrl + "/changePassword", body, this.jsonRequestOptions)
        .map(res => true)
        .catch(this.handleError);
    }

    public login(
        email: string,
        password: string
    ): Observable<Response> {
        let body = JSON.stringify({ 
            email, 
            password 
        });
        return this.http.post(this.baseUrl + "/login", body, this.jsonRequestOptions)
        .map(res => true)
        .catch(this.handleError);
    }

    public register(
        email: string,
        password: string,
        confirmPassword: string,
        invite: string
    ) {
        let body = JSON.stringify({ 
            email,
            password,
            confirmPassword ,
            invite
        });
        return this.http.post(this.baseUrl + "/register", body, this.jsonRequestOptions)
        .map(res => true)
        .catch(this.handleError);
    }

    public resendConfirmation(
        email: string
    ) {
        let body = JSON.stringify({ 
            email
        });
        return this.http.post(this.baseUrl + "/resendConfirmation", body, this.jsonRequestOptions)
        .map(res => true)
        .catch(this.handleError);
    }

    public resetPassword(
        code: string,
        password: string,
        resetPassword: string
    ) {
        let body = JSON.stringify({ 
            code,
            password,
            resetPassword 
        });
        return this.http.post(this.baseUrl + "/resetPassword", body, this.jsonRequestOptions)
        .map(res => true)
        .catch(this.handleError);
    }

    public setPassword(
        newPassword: string,
        confirmPassword: string
    ) {
        let body = JSON.stringify({ 
            newPassword,
            confirmPassword 
        });
        return this.http.post(this.baseUrl + "/setPassword", body, this.jsonRequestOptions)
        .map(res => true)
        .catch(this.handleError);
    }
}