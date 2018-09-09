import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Page } from './page';
import { Observable } from 'rxjs/Observable';
import { ContentItemService } from '../services/contentItem.service';

@Injectable()
export class PageService {
    pageType: string;
    accountUrl: string;
    appBaseUrl: string;

    constructor(
        private http: Http,
        @Inject('BASE_URL') private baseUrl: string,
        private contentItemService: ContentItemService
    ) {
        this.pageType = 'page';
        this.accountUrl = `${this.baseUrl}/api/Account`;
        this.appBaseUrl = `${this.baseUrl}/api/Page`;
    }

    private ExtractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Response status: ' + res.status);
        }
        let body = res.json();
        return body || {};
    }

    public IsLoggedIn(): Observable<string> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http
            .post(this.accountUrl + '/IsLoggedIn', '', {
                headers: headers
            })
            .map(this.ExtractData);
            //.subscribe({
                //next: x => console.log('Observer got a next value: ' + x),
                //error: err => alert(JSON.stringify(err)),
                //complete: () => console.log('Saved completed.'),
            //});
    }

    public async GetPage(id: number): Promise<Page> {
        var contentItem = await this.contentItemService.GetContentItems(id, '', '',
        '', 0, '', '', '', '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '').first().toPromise();

        if (contentItem.length >= 1) {
            return new Page(await contentItem[0]);
        } else {
            return null;
        }
    }
    
    public async GetPageByAlias(alias: string): Promise<Page> {
        var contentItem = await this.contentItemService.GetContentItems(0, '', alias,
        '', 0, '', '', '', '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '').first().toPromise();

        if (contentItem.length >= 1) {
            return new Page(contentItem[0]);
        } else {
            return null;
        }
    }

    public AddPage(page: Page): Observable<Page> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'title=' + page.title + '&content=' + page.content + '&alias=' + page.alias +
            '&pageType=' + this.pageType;
        return this.http
            .post(this.appBaseUrl + '/Add', data, {
                headers: headers
            })
            .map(this.ExtractData);
            //.subscribe({
                //next: x => console.log('Observer got a next value: ' + x),
                //error: err => alert(JSON.stringify(err)),
                //complete: () => console.log('Saved completed.'),
            //});
    }

    public UpdatePage(page: Page): Observable<Response> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'id=' + page.id + '&title=' + page.title + '&content=' + page.content + 
            '&alias=' + page.alias;
        return this.http
            .post(this.appBaseUrl + '/Update', data, {
                headers: headers
            })
            .map(this.ExtractData);
            //.subscribe({
                //next: x => console.log('Observer got a next value: ' + x),
                //error: err => alert(JSON.stringify(err)),
                //complete: () => console.log('Saved completed.'),
            //});
    }

    public DeletePage(page: Page): Observable<Response> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'id=' + page.id;
        return this.http
            .post(this.appBaseUrl + '/Delete', data, {
                headers: headers
            })
            .map(this.ExtractData);
            //.subscribe({
                //next: x => console.log('Observer got a next value: ' + x),
                //error: err => alert(JSON.stringify(err)),
                //complete: () => console.log('Saved completed.'),
            //});
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        //return Observable.throw(error.json().error || 'Server error');
    }
}