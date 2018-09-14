import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Profile } from './profile';
import { Observable } from 'rxjs/Observable';
import { ORIGIN_URL } from '../../../shared/constants/baseurl.constants';

@Injectable()
export class ProfileService {
    accountUrl: string;
    appBaseUrl: string;

    constructor(
        private http: Http,
        @Inject(ORIGIN_URL) private baseUrl: string
    ) {
        this.accountUrl = `${this.baseUrl}/api/Account`;
        this.appBaseUrl = `${this.baseUrl}/api/Profile`;
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

    public GetUser(): Observable<Profile> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = '';
        
        return this.http
            .post(this.accountUrl + '/GetProfile', data, {
                headers: headers
            })
            .map(this.ExtractData);
            //.catch(this.handleError);
    }

    public GetProfile(): Observable<Profile> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = '';
        
        return this.http
            .post(this.appBaseUrl + '/Get', data, {
                headers: headers
            })
            .map(this.ExtractData);
            //.catch(this.handleError);
    }
    
    public GetProfileByAlias(alias: string): Observable<Profile> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'alias=' + alias;

        return this.http
            .post(this.appBaseUrl + '/GetByAlias', data, {
                headers: headers
            })
            .map(this.ExtractData);
            //.catch(this.handleError);
    }

    public UpdateUser(profile: Profile): Observable<Response> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'firstName=' + profile.firstName + 
            '&lastName=' + profile.lastName + '&alias=' + profile.alias;
        return this.http
            .post(this.accountUrl + '/SetProfile', data, {
                headers: headers
            })
            .map(this.ExtractData);
            //.subscribe({
                //next: x => console.log('Observer got a next value: ' + x),
                //error: err => alert(JSON.stringify(err)),
                //complete: () => console.log('Saved completed.'),
            //});
    }

    public AddOrUpdateProfile(profile: Profile): Observable<Response> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'content=' + profile.content;
        return this.http
            .post(this.appBaseUrl + '/AddOrUpdate', data, {
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