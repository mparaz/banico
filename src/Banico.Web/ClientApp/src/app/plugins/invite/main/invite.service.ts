import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Invite } from './invite';
import { status, json } from '../../app/shared/fetch';
import { Observable } from 'rxjs/Observable';
import { ORIGIN_URL } from '../../app/shared/constants/baseurl.constants';

@Injectable()
export class InviteService {
    inviteUrl: string;

    constructor(
        private http: Http,
        @Inject(ORIGIN_URL) private baseUrl: string
    ) {
        this.inviteUrl = `${this.baseUrl}/api/Invite`;
    }

    private ExtractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Response status: ' + res.status);
        }
        let body = res.json();
        return body || {};
    }

    public AddInvite(invite: Invite): Observable<Invite> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'emails=' + invite.emails;
        return this.http
            .post(this.inviteUrl + '/Add', data, {
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
        // return Observable.throw(error.json().error || 'Server error');
    }
}