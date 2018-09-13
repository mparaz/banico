import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BaseService } from "../../../shared/services/base.service";
import { ContentItem } from '../../../entities/contentitem';
import { DirectoryItem } from './directoryitem';
import { ContentItemService } from '../../services/contentItem.service';

@Injectable()
export class DirectoryService extends BaseService {
    accountUrl: string;
    appBaseUrl: string;

    constructor(
        private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string,
        private contentItemService: ContentItemService
    ) {
        super();

        this.accountUrl = `${this.baseUrl}/api/Account`;
        this.appBaseUrl = `${this.baseUrl}/api/Directory`;
    }

    private ExtractData(res: Response): Promise<string> {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Response status: ' + res.status);
        }
        let body = res.json();
        return body;
    }

    public GetDirectoryItem(id: string): Observable<DirectoryItem> {
        return this.contentItemService.GetContentItems(id, '', '',
        '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '')
        .map(items => {
            if (items.length >= 1) {
                return new DirectoryItem(items[0]);
            } else {
                return new DirectoryItem(null);
            }
        });
    }
    
    public GetAllDirectoryItems(): Observable<DirectoryItem[]> {
        return this.contentItemService.GetContentItems('', '', '',
        'directory', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '')
        .map(items => {
            var directoryItems: DirectoryItem[] = new Array<DirectoryItem>();
            items.forEach(function(item: ContentItem) {
                directoryItems.push(new DirectoryItem(item));                
            });

            return directoryItems;
        });
    }

    public GetDirectoryItems(sectionItems: string): Observable<DirectoryItem[]> {
        return this.contentItemService.GetContentItems('', '', '',
        'directory', '', '', sectionItems, '', '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '')
        .map(items => {
            var directoryItems: DirectoryItem[] = new Array<DirectoryItem>();
            items.forEach(function(item: ContentItem) {
                directoryItems.push(new DirectoryItem(item));                
            });

            return directoryItems;
        });
    }

    public GetWithTextSearch(text: string): Observable<DirectoryItem[]> {
        return this.contentItemService.GetContentItems('', '', '',
        'directory', '', '', '', text, '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '')
        .map(items => {
            var directoryItems: DirectoryItem[] = new Array<DirectoryItem>();
            items.forEach(function(item: ContentItem) {
                directoryItems.push(new DirectoryItem(item));                
            });

            return directoryItems;
        });
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

    public AddDirectoryItem(directoryItem: DirectoryItem): Observable<DirectoryItem> {
        let contentItem: ContentItem = directoryItem.ToContentItem();
        return this.contentItemService.AddContentItem(contentItem)
            .map(contentItem => new DirectoryItem(contentItem))
            .catch(this.handleError);
    }

    public UpdateDirectoryItem(directoryItem: DirectoryItem): Observable<{}> {
        let contentItem: ContentItem = directoryItem.ToContentItem();
        return this.contentItemService.UpdateContentItem(contentItem)
            .map(contentItem => new DirectoryItem(contentItem))
            .catch(this.handleError);
    }

    public DeleteDirectoryItem(directoryItem: DirectoryItem): Observable<{}> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'id=' + directoryItem.id;
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
}