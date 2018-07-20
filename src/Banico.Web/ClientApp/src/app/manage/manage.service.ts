import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { BaseService } from "../shared/services/base.service";
import { Observable } from 'rxjs/Rx';
import { isPlatformBrowser } from '@angular/common';
import { JSONP_ERR_NO_CALLBACK } from '@angular/common/http/src/jsonp';

@Injectable()
export class ManageService extends BaseService {
    public loggedIn: boolean;

    constructor(
        private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: Object,
        @Inject('BASE_URL') private baseUrl: string
    ) {
        super();

        if (isPlatformBrowser(this.platformId)) {
            this.loggedIn = !!window.localStorage.getItem('auth_token');
        }
    }

    public changePassword(
        oldPassword: string,
        newPassword: string,
        confirmPassword: string
    ): Observable<boolean> {
        let body = JSON.stringify({ 
            oldPassword,
            newPassword,
            confirmPassword 
        });
        return this.http.post(this.baseUrl + "api/Manage/ChangePassword", body, this.jsonAuthRequestOptions)
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
        return this.http.post(this.baseUrl + "/api/Account/SetPassword", body, this.jsonRequestOptions)
        .map(res => true)
        .catch(this.handleError);
    }
}