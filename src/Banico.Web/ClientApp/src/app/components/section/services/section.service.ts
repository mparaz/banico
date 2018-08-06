import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { AllSectionsQuery } from './section.queries';
import { SectionsQueryResult } from './section.queryresults';
import { SectionItemsQueryResult } from './section.queryresults';

import { Section } from '../../../entities/section';
import { SectionItem } from '../../../entities/sectionitem';
import { Item } from '../../../entities/item';
//import { status, json } from '../../../shared/fetch';
import { ORIGIN_URL } from '../../../shared/constants/baseurl.constants';

@Injectable()
export class SectionService {
    accountUrl: string;
    sectionApiBaseUrl: string;
    sectionTypeApiBaseUrl: string;
    itemApiBaseUrl: string;

    constructor(
        private http: Http,
        private apollo: Apollo,
        @Inject(ORIGIN_URL) private baseUrl: string
    ) {
        // this.accountUrl = `${this.baseUrl}/api/Account`;
        // this.sectionApiBaseUrl = `${this.baseUrl}/api/Section`;
        // this.sectionTypeApiBaseUrl = `${this.baseUrl}/api/SectionType`;
        // this.itemApiBaseUrl = `${this.baseUrl}/api/Item`;
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

    public GetSectionsByModule(module: string): Observable<Section[]> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'module=' + module;

        var result = this.apollo.watchQuery<SectionsQueryResult>({
            query: AllSectionsQuery
          })
            .valueChanges
            .pipe(
              map(result => result.data.sections)
            );
        return this.http
            .post(this.sectionTypeApiBaseUrl + '/GetAll', data, {
                headers: headers
            })
            .map(this.ExtractData);
            //.catch(this.handleError);
    }

    public AddSection(sectionType: Section): Observable<Section> {
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

    public GetSectionItemByPath(path: string): Observable<SectionItem> {
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

    public GetSectionItemByNameAndParentId(name: string, parentId: string): Observable<SectionItem> {
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

    public GetRootSectionItemsBySection(sectionType: string): Observable<SectionItem[]> {
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

    public GetSectionItemsByPath(path: string): Observable<SectionItem[]> {
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

    public AddSectionItem(sectionItem: SectionItem): Observable<SectionItem> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'type=' + sectionItem.section + 
            '&parentId=' + sectionItem.parentId + 
            '&path=' + sectionItem.path + 
            '&breadcrumb=' + encodeURIComponent(sectionItem.breadcrumb) +
            '&name=' + encodeURIComponent(sectionItem.name) + 
            '&alias=' + sectionItem.alias;
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

    public UpdateSectionItem(sectionItem: SectionItem): Observable<Response> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'id=' + sectionItem.id + 
            '&name=' + encodeURIComponent(sectionItem.name) + 
            '&alias=' + sectionItem.alias + 
            '&description=' + encodeURIComponent(sectionItem.description);
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