import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { SectionType } from '../../../entities/sectiontype';
import { Section } from '../../../entities/section';
import { Item } from '../../../entities/item';
//import { status, json } from '../../../shared/fetch';
import { Observable } from 'rxjs/Observable';
import { ORIGIN_URL } from '../../../shared/constants/baseurl.constants';

@Injectable()
export class SectionService {
    accountUrl: string;
    sectionApiBaseUrl: string;
    sectionTypeApiBaseUrl: string;
    itemApiBaseUrl: string;

    constructor(
        private http: Http,
        @Inject(ORIGIN_URL) private baseUrl: string
    ) {
        this.accountUrl = `${this.baseUrl}/api/Account`;
        this.sectionApiBaseUrl = `${this.baseUrl}/api/Section`;
        this.sectionTypeApiBaseUrl = `${this.baseUrl}/api/SectionType`;
        this.itemApiBaseUrl = `${this.baseUrl}/api/Item`;
    }

    private AddResult(res: any) {
        // console.log('HELLO LOOK HERE! HTTP RESPONSE...');
        // console.log(res.json());
        if (res.id == 0){
            throw new Error('Unable to create object.');
        }
        let body = res.json();
        return body || {};
    }

    private ExtractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Response status: ' + res.status);
        }
        let body = res.json();
        return body || {};
    }

    public GetSectionTypes(module: string): Observable<SectionType[]> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'module=' + module;

        return this.http
            .post(this.sectionTypeApiBaseUrl + '/GetAll', data, {
                headers: headers
            })
            .map(this.ExtractData);
            //.catch(this.handleError);
    }

    public AddSectionType(sectionType: SectionType): Observable<SectionType> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'name=' + sectionType.name + 
            '&modules=' + sectionType.modules;
        return this.http
            .post(this.sectionTypeApiBaseUrl + '/Add', data, {
                headers: headers
            })
            .map(this.AddResult);
            //.subscribe({
                //next: x => console.log('Observer got a next value: ' + x),
                //error: err => alert(JSON.stringify(err)),
                //complete: () => console.log('Saved completed.'),
            //});
    }

    public GetSectionByPath(path: string): Observable<Section> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'path=' + path;

        return this.http
            .post(this.sectionApiBaseUrl + '/GetByPath', data, {
                headers: headers
            })
            .map(this.ExtractData);
            //.catch(this.handleError);
    }

    public GetSectionByNameAndParentId(name: string, parentId: string): Observable<Section> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'name=' + encodeURIComponent(name) + 
            '&parentId=' + parentId;

        return this.http
            .post(this.sectionApiBaseUrl + '/GetByNameAndParentId', data, {
                headers: headers
            })
            .map(this.ExtractData);
            //.catch(this.handleError);
    }

    public GetRootSectionsBySectionType(sectionType: string): Observable<Section[]> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'sectionType=' + sectionType;

        return this.http
            .post(this.sectionApiBaseUrl + '/GetRootByType', data, {
                headers: headers
            })
            .map(this.ExtractData);
            //.catch(this.handleError);
    }

    public GetSectionsByPath(path: string): Observable<Section[]> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'path=' + path;

        return this.http
            .post(this.sectionApiBaseUrl + '/GetAllByPath', data, {
                headers: headers
            })
            .map(this.ExtractData);
            //.catch(this.handleError);
    }

    public GetItemsByPath(path: string): Observable<Item[]> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'path=' + path;

        return this.http
            .post(this.itemApiBaseUrl + '/GetByPath', data, {
                headers: headers
            })
            .map(this.ExtractData);
            //.catch(this.handleError);
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

    public AddSection(section: Section): Observable<Section> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'type=' + section.type + 
            '&parentId=' + section.parentId + 
            '&path=' + section.path + 
            '&breadcrumb=' + encodeURIComponent(section.breadcrumb) +
            '&name=' + encodeURIComponent(section.name) + 
            '&alias=' + section.alias;
        return this.http
            .post(this.sectionApiBaseUrl + '/Add', data, {
                headers: headers
            })
            .map(this.AddResult);
            //.subscribe({
                //next: x => console.log('Observer got a next value: ' + x),
                //error: err => alert(JSON.stringify(err)),
                //complete: () => console.log('Saved completed.'),
            //});
    }

    public UpdateSection(section: Section): Observable<Response> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'id=' + section.id + 
            '&name=' + encodeURIComponent(section.name) + 
            '&alias=' + section.alias + 
            '&description=' + encodeURIComponent(section.description);
        return this.http
            .post(this.sectionApiBaseUrl + '/Update', data, {
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
        return Observable.throw(error.json().error || 'Server error');
    }
}