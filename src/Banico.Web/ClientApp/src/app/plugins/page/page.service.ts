import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { BaseService } from "../../shared/services/base.service";
import { Page } from './page';
import { Observable } from 'rxjs/Observable';
import { ContentItemService } from '../services/contentItem.service';
import { ContentItem } from '../../entities/contentitem';
import { ObservableQuery } from 'apollo-client';

@Injectable()
export class PageService extends BaseService {
    pageType: string;
    accountUrl: string;
    appBaseUrl: string;

    constructor(
        private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string,
        private contentItemService: ContentItemService
    ) {
        super();

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

    public GetPage(id: number): Observable<Page> {
        return this.contentItemService.GetContentItems(id, '', '',
        '', 0, '', '', '', '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '')
        .map(items => {
            if (items.length >= 1) {
                return new Page(items[0]);
            } else {
                return new Page(null);
            }
        });
    }
    
    public GetPageByAlias(alias: string): Observable<Page> {
        return this.contentItemService.GetContentItems(0, '', alias,
        '', 0, '', '', '', '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '')
        .map(items => {
            if (items.length >= 1) {
                return new Page(items[0]);
            } else {
                return new Page(null);
            }
        });
    }

    public AddPage(page: Page): Observable<Page> {
        let contentItem: ContentItem = page.ToContentItem();
        return this.contentItemService.AddContentItem(contentItem)
            .map(contentItem => new Page(contentItem))
            .catch(this.handleError);
    }

    public UpdatePage(page: Page): Observable<boolean> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'id=' + page.id + '&title=' + page.title + '&content=' + page.content + 
            '&alias=' + page.alias;
        return this.http
            .post(this.appBaseUrl + '/Update', data, {
                headers: headers
            })
            .map(res => true)
            .catch(this.handleError);
                //.subscribe({
                //next: x => console.log('Observer got a next value: ' + x),
                //error: err => alert(JSON.stringify(err)),
                //complete: () => console.log('Saved completed.'),
            //});
    }

    public DeletePage(page: Page): Observable<boolean> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'id=' + page.id;
        return this.http
            .post(this.appBaseUrl + '/Delete', data, {
                headers: headers
            })
            .map(res => true)
            .catch(this.handleError);
                //.subscribe({
                //next: x => console.log('Observer got a next value: ' + x),
                //error: err => alert(JSON.stringify(err)),
                //complete: () => console.log('Saved completed.'),
            //});
    }
}