import { Injectable, Inject } from '@angular/core';
import { Contact } from './contact';
import { Observable } from 'rxjs/Observable';
import { PluginService } from '../../services/plugin.service';
import { ContentItem } from '../../../entities/contentitem';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ContactService extends PluginService {
    public GetContact(id: string): Observable<Contact> {
        return this.contentItemService.GetContentItems(id, '', '',
        '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '')
        .map(items => {
            if (items.length >= 1) {
                return new Contact(items[0]);
            } else {
                return new Contact(null);
            }
        });
    }
    
    public GetContactByAlias(alias: string): Observable<Contact> {
        return this.contentItemService.GetContentItems('', '', alias,
        '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '')
        .map(items => {
            if (items.length >= 1) {
                return new Contact(items[0]);
            } else {
                return new Contact(null);
            }
        });
    }

    public AddContact(contact: Contact): Observable<Contact> {
        let contentItem: ContentItem = contact.ToContentItem();
        return this.contentItemService.AddContentItem(contentItem)
            .map(contentItem => new Contact(contentItem))
            .catch(this.handleError);
    }

    public UpdateContact(contact: Contact): Observable<Contact> {
        let contentItem: ContentItem = contact.ToContentItem();
        return this.contentItemService.UpdateContentItem(contentItem)
            .map(contentItem => new Contact(contentItem))
            .catch(this.handleError);
    }

    public DeleteContact(contact: Contact): Observable<{}> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'id=' + contact.id;
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

    public SendContactEmail(contact: Contact, message: string): Observable<{}> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'id=' + contact.id + '&message=' + message;
        return this.http
            .post(this.appBaseUrl + '/SendContactEmail', data, {
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