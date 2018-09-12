import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { ContentItem } from '../../entities/contentitem';
import { DirectoryItem } from './directoryitem';
//import { status, json } from '../../shared/fetch';
import { Observable } from 'rxjs/Observable';
import { ORIGIN_URL } from '../../shared/constants/baseurl.constants';

@Injectable()
export class DirectoryService {
    accountUrl: string;
    appBaseUrl: string;

    constructor(
        private http: HttpClient,
        @Inject(ORIGIN_URL) private baseUrl: string
    ) {
        this.accountUrl = `${this.baseUrl}/api/Account`;
        this.appBaseUrl = `${this.baseUrl}/api/Directory`;
    }

    private ExtractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Response status: ' + res.status);
        }
        let body = res.json();
        return body || {};
    }

    public GetDirectoryItem(id: string): Observable<{}> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'id=' + id;

        return this.http
            .post(this.appBaseUrl + '/Get', data, {
                headers: headers
            })
            .map(this.ExtractData);
            //.catch(this.handleError);
    }
    
    public GetAllDirectoryItems(): Observable<{}> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = '';

        return this.http
            .post(this.appBaseUrl + '/GetAll', data, {
                headers: headers
            })
            .map(this.ExtractData);
            //.catch(this.handleError);
    }

    public GetDirectoryItems(sections: string): Observable<{}> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'sections=' + sections;

        return this.http
            .post(this.appBaseUrl + '/GetAllBySections', data, {
                headers: headers
            })
            .map(this.ExtractData);
            //.catch(this.handleError);
    }

    public GetWithTextSearch(text: string): Observable<{}> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'text=' + text;

        return this.http
            .post(this.appBaseUrl + '/GetAllWithTextSearch', data, {
                headers: headers
            })
            .map(this.ExtractData);
            //.catch(this.handleError);
    }

    public IsLoggedIn(): Observable<{}> {
        let headers = new HttpHeaders();
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

    public AddDirectoryItem(directoryItem: DirectoryItem): Observable<{}> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'name=' + encodeURIComponent(directoryItem.name) + 
            '&description=' + encodeURIComponent(directoryItem.description) +
            '&address=' + encodeURIComponent(directoryItem.address) +
            '&phone=' + encodeURIComponent(directoryItem.phone) +
            '&website=' + encodeURIComponent(directoryItem.website) +
            '&email=' + encodeURIComponent(directoryItem.email) +
            '&sections=' + directoryItem.sections;
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

    public UpdateDirectoryItem(directoryItem: DirectoryItem): Observable<{}> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'id=' + directoryItem.id + 
            '&name=' + encodeURIComponent(directoryItem.name) + 
            '&description=' + encodeURIComponent(directoryItem.description) +
            '&address=' + encodeURIComponent(directoryItem.address) +
            '&phone=' + encodeURIComponent(directoryItem.phone) +
            '&website=' + encodeURIComponent(directoryItem.website) +
            '&email=' + encodeURIComponent(directoryItem.email) +
            '&sections=' + directoryItem.sections;
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

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        //return Observable.throw(error.json().error || 'Server error');
    }
}