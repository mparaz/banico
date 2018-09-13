import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Faq } from './faq';
import { Qa } from './qa';
import { status, json } from '../../app/shared/fetch';
import { Observable } from 'rxjs/Observable';
import { ORIGIN_URL } from '../../app/shared/constants/baseurl.constants';

@Injectable()
export class FaqService {
    pageType: string;
    accountUrl: string;
    appBaseUrl: string;

    constructor(
        private http: Http,
        @Inject(ORIGIN_URL) private baseUrl: string
    ) {
        this.pageType = 'faq';
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

    public GetFaq(id: string): Observable<Faq> {
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
    
    public GetFaqByAlias(alias: string): Observable<Faq> {
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
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'title=' + faq.title + '&content=' + faq.content + '&alias=' + faq.alias +
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

    public UpdateFaq(faq: Faq): Observable<Response> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'id=' + faq.id + '&title=' + faq.title + '&content=' + faq.content + '&alias=' + faq.alias;
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

    public DeleteFaq(faq: Faq): Observable<Response> {
        let headers = new Headers();
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

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        //return Observable.throw(error.json().error || 'Server error');
    }
}