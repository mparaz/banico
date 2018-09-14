import { Injectable, Inject } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PluginService } from '../../services/plugin.service';
import { ContentItem } from '../../../entities/contentitem';
import { Faq } from './faq';
import { Qa } from './qa';

@Injectable()
export class FaqService extends PluginService {

    public GetFaq(id: string): Observable<Faq> {
        return this.contentItemService.GetContentItems(id, '', '',
        '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '')
        .map(items => {
            if (items.length >= 1) {
                return new Faq(items[0]);
            } else {
                return new Faq(null);
            }
        });
    }
    
    public GetFaqByAlias(alias: string): Observable<Faq> {
        return this.contentItemService.GetContentItems('', '', alias,
        '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '')
        .map(items => {
            if (items.length >= 1) {
                return new Faq(items[0]);
            } else {
                return new Faq(null);
            }
        });
    }

    public SetQa(content: string): Qa[] {
        var output: Qa[] = Array<Qa>();
        var objects = eval('(' + content + ')');
        for (let object in objects) {
            var qa = new Qa();
            qa.question = object["question"];
            qa.answer = object["answer"];
            output.push(qa);
        }

        return output;
    }

    public AddFaq(faq: Faq): Observable<Faq> {
        let contentItem: ContentItem = faq.ToContentItem();
        return this.contentItemService.AddContentItem(contentItem)
            .map(contentItem => new Faq(contentItem))
            .catch(this.handleError);
    }

    public UpdateFaq(faq: Faq): Observable<Faq> {
        let contentItem: ContentItem = faq.ToContentItem();
        return this.contentItemService.UpdateContentItem(contentItem)
            .map(contentItem => new Faq(contentItem))
            .catch(this.handleError);
    }

    public DeleteFaq(faq: Faq): Observable<{}> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'id=' + faq.id;
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