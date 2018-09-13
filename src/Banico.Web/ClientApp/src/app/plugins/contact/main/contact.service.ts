import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Contact } from './contact';
import { Field } from './field';
import { status, json } from '../../app/shared/fetch';
import { Observable } from 'rxjs/Observable';
import { ORIGIN_URL } from '../../app/shared/constants/baseurl.constants';

@Injectable()
export class ContactService {
    pageType: string;
    accountUrl: string;
    appBaseUrl: string;

    constructor(
        private http: Http,
        @Inject(ORIGIN_URL) private baseUrl: string
    ) {
        this.pageType = 'contact';
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

    public GetContact(id: string): Observable<Contact> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'id=' + id;

        return this.http
            .post(this.appBaseUrl + '/Get', data, {
                headers: headers
            })
            .map(this.ExtractData);
            //.catch(this.handleError);
    }
    
    public GetContactByAlias(alias: string): Observable<Contact> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'alias=' + alias + '&pageType=' + this.pageType;
        
        return this.http
            .post(this.appBaseUrl + '/GetByAliasAndPageType', data, {
                headers: headers
            })
            .map(this.ExtractData);
            //.catch(this.handleError);
    }

    // public SetField(content: string): Field[] {
    //     var output: Field[];
    //     var objects = eval('(' + content + ')');
    //     for (let object in objects) {
    //         var field = new Field();
    //         field.name = object["name"];
    //         field.type = object["type"];
    //         output.push(field);
    //     }

    //     return output;
    // }

    public AddContact(contact: Contact): Observable<Contact> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'title=' + contact.title + '&content=' + contact.content + '&alias=' + contact.alias +
            '&subject=' + contact.subject + '&pageType=' + this.pageType + '&recipientName=' + contact.recipientName + 
            '&recipientEmail=' + contact.recipientEmail;
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

    public UpdateContact(contact: Contact): Observable<Response> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'id=' + contact.id + '&title=' + contact.title + '&content=' + contact.content + 
            '&subject=' + contact.subject + '&alias=' + contact.alias + '&recipientName=' + contact.recipientName +
            '&recipientEmail=' + contact.recipientEmail;
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

    public DeleteContact(contact: Contact): Observable<Response> {
        let headers = new Headers();
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

    public SendContactEmail(contact: Contact, message: string): Observable<Response> {
        let headers = new Headers();
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

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        //return Observable.throw(error.json().error || 'Server error');
    }
}