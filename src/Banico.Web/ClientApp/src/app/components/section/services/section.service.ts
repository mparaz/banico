import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { SectionsQuery } from './section.queries';
import { SectionItemsQuery } from './section.queries';
import { AddSectionMutation } from './section.mutations';
import { AddSectionItemMutation } from './section.mutations';
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

    public GetSections(
        id: number,
        module: string,
        name: string
    ): Observable<Section[]> {
        var result = this.apollo.watchQuery<SectionsQueryResult>({
            query: SectionsQuery
        })
            .valueChanges
            .pipe(
              map(result => result.data.sections)
            );
        return result;
    }

    public AddSection(section: Section): Observable<any> {
        var result = this.apollo.mutate({
            mutation: AddSectionMutation,
            variables: {
                name: section.name,
                modules: section.modules
            }
        }).map(this.AddResult);

        return result;
            //.subscribe({
                //next: x => console.log('Observer got a next value: ' + x),
                //error: err => alert(JSON.stringify(err)),
                //complete: () => console.log('Saved completed.'),
            //});
    }

    public GetSectionItems(
        id: number,
        section: string,
        path: string,
        alias: string,
        name: string,
        parentId: number,
        isRoot: boolean
    ): Observable<SectionItem[]> {
        var result = this.apollo.watchQuery<SectionItemsQueryResult>({
            query: SectionItemsQuery
        })
            .valueChanges
            .pipe(
              map(result => result.data.sectionItems)
            );
        return result;
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

    public AddSectionItem(sectionItem: SectionItem): Observable<any> {
        var result = this.apollo.mutate({
            mutation: AddSectionItemMutation,
            variables: {
                section: sectionItem.section,
                parentId: sectionItem.parentId,
                path: sectionItem.path,
                breadcrumb: encodeURIComponent(sectionItem.breadcrumb),
                name: encodeURIComponent(sectionItem.name),
                alias: sectionItem.alias
            }
        }).map(this.AddResult);

        return result;
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