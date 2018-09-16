import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BaseService } from '../../shared/services/base.service';
import { ContentItemService } from './contentItem.service';
import { WindowRefService } from '../../shared/services/windowref.service';

@Injectable()
export class PluginService extends BaseService {
    accountUrl: string;
    appBaseUrl: string;

    constructor(
        protected http: HttpClient,
        @Inject(WindowRefService) windowRefService: WindowRefService,
        @Inject(PLATFORM_ID) platformId: Object,
        @Inject('BASE_URL') protected baseUrl: string,
        protected contentItemService: ContentItemService
    ) {
        super(windowRefService, platformId);

        this.accountUrl = `${this.baseUrl}/api/Account`;
        this.appBaseUrl = `${this.baseUrl}/api/Page`;
    }

    protected ExtractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Response status: ' + res.status);
        }
        let body = res.json();
        return body || {};
    }

    public IsLoggedIn(): Observable<string> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http
            .post<string>(this.accountUrl + '/IsLoggedIn', '', {
                headers: headers
            });
            //.map(this.ExtractData);
            //.subscribe({
                //next: x => console.log('Observer got a next value: ' + x),
                //error: err => alert(JSON.stringify(err)),
                //complete: () => console.log('Saved completed.'),
            //});
    }
}