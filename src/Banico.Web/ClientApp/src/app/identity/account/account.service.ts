import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { BaseService } from "../../shared/services/base.service";
import { Observable } from 'rxjs/Rx';
import { isPlatformBrowser } from '@angular/common';
import { JSONP_ERR_NO_CALLBACK } from '@angular/common/http/src/jsonp';
import { WindowRefService } from '../../shared/services/windowref.service';

@Injectable()
export class AccountService extends BaseService {
    public loggedIn: boolean;

    constructor(
        private http: HttpClient,
        @Inject(WindowRefService) windowRefService: WindowRefService,
        @Inject(PLATFORM_ID) platformId: Object,
        @Inject('BASE_URL') private baseUrl: string
    ) {
        super(windowRefService, platformId);

        if (isPlatformBrowser(this.platformId)) {
            this.loggedIn = !!this.windowRefService.nativeWindow.localStorage.getItem('auth_token');
        }
    }

    public isLoggedIn(): Observable<boolean> {
        return this.http.get<boolean>(this.baseUrl + "api/Account/IsLoggedIn", this.jsonAuthRequestOptions )
        .catch(this.handleError);
    }

    public loggedInAs(): Observable<string> {
        return this.http.post<any>(this.baseUrl + "api/Account/LoggedInAs", { } , this.jsonAuthRequestOptions)
        .map(data => {
            if (data.result) {
                if (data.result.userName) {
                return data.result.userName;
                }
            }

            return '';
        })
        .catch(this.handleError);
    }

    public login(
        email: string,
        password: string
    ): Observable<Object> {
        let body = JSON.stringify({ 
            email, 
            password 
        });
        return this.http.post(this.baseUrl + "api/Account/Login", body, this.jsonRequestOptions)
        .catch(this.handleError);
    }

    public logout() {
        this.http.post(this.baseUrl + "api/Account/Logout", {}, this.jsonAuthRequestOptions)
        .subscribe(data => {
            if (isPlatformBrowser(this.platformId)) {
                this.windowRefService.nativeWindow.localStorage.removeItem('auth_token');
            }
        });
    }

    public register(
        email: string,
        password: string,
        confirmPassword: string,
        invite: string
    ): Observable<boolean> {
        let body = JSON.stringify({ 
            email,
            password,
            confirmPassword ,
            invite
        });
        return this.http.post(this.baseUrl + "api/Account/Register", body, this.jsonRequestOptions)
        .map(res => true)
        .catch(this.handleError);
    }

    public confirmEmail(
        userId: string,
        code: string
    ): Observable<boolean> {
        let body = JSON.stringify({ 
            userId,
            code
        });
        return this.http.post(this.baseUrl + "api/Account/ConfirmEmail", body, this.jsonRequestOptions)
        .map(res => true)
        .catch(this.handleError);
    }

    public resendConfirmation(
        email: string
    ) {
        let body = JSON.stringify({ 
            email
        });
        return this.http.post(this.baseUrl + "api/Account/ResendConfirmation", body, this.jsonRequestOptions)
        .map(res => true)
        .catch(this.handleError);
    }

    public forgotPassword(
        email: string
    ): Observable<boolean> {
        let body = JSON.stringify({ 
            email 
        });
        return this.http.post(this.baseUrl + "api/Account/ForgotPassword", body, this.jsonRequestOptions)
        .map(res => true)
        .catch(this.handleError);
    }

    public resetPassword(
        email: string,
        code: string,
        password: string,
        confirmPassword: string
    ) {
        let body = JSON.stringify({ 
            email,
            code,
            password,
            confirmPassword 
        });
        return this.http.post(this.baseUrl + "api/Account/ResetPassword", body, this.jsonRequestOptions)
        .map(res => true)
        .catch(this.handleError);
    }
}