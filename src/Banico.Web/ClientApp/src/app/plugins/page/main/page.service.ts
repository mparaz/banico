import { Injectable, Inject } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ContentItem } from '../../../entities/contentitem';
import { PluginService } from '../../services/plugin.service';
import { Page } from './page';

@Injectable()
export class PageService extends PluginService {
    
    public GetPage(id: string): Observable<Page> {
        return this.contentItemService.GetContentItems(id, '', '',
        '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
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
        return this.contentItemService.GetContentItems('', '', alias,
        '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
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

    public UpdatePage(page: Page): Observable<Page> {
        let contentItem: ContentItem = page.ToContentItem();
        return this.contentItemService.UpdateContentItem(contentItem)
            .map(contentItem => new Page(contentItem))
            .catch(this.handleError);
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