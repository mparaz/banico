import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
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

@Injectable()
export class SectionService {
    accountUrl: string;
    sectionApiBaseUrl: string;
    sectionTypeApiBaseUrl: string;
    itemApiBaseUrl: string;

    constructor(
        private http: HttpClient,
        private apollo: Apollo,
        @Inject('BASE_URL') private baseUrl: string
    ) {
        // this.accountUrl = `${this.baseUrl}/api/Account`;
        // this.sectionApiBaseUrl = `${this.baseUrl}/api/Section`;
        // this.sectionTypeApiBaseUrl = `${this.baseUrl}/api/SectionType`;
        // this.itemApiBaseUrl = `${this.baseUrl}/api/Item`;
    }

    private AddResult(res: any) {
        var id = 0;
        var output;
        if (res.data.addSection) {
            id = res.data.addSection.id;
            output = res.data.addSection;
        }
        if (res.data.addSectionItem) {
            id = res.data.addSectionItem.id;
            output = res.data.addSectionItem;
        }

        if (id == 0){
            throw new Error('Unable to create object.');
        }
        return output || {};
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
            query: SectionsQuery,
            variables: {
                id: id,
                module: module,
                name: name
            }
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
        pathUrl: string,
        alias: string,
        name: string,
        parentId: number,
        isRoot: boolean
    ): Observable<SectionItem[]> {
        var result = this.apollo.watchQuery<SectionItemsQueryResult>({
            query: SectionItemsQuery,
            variables: {
                id: id,
                section: section,
                pathUrl: pathUrl,
                alias: alias,
                name: name,
                parentId: parentId,
                isRoot: isRoot
            }
        })
            .valueChanges
            .pipe(
              map(result => {
                  alert('RESULT = ' + JSON.stringify(result)); 
                  return result.data.sectionItems;
              })
            );
        return result;
    }
    
    // Observable<Item[]>
    public GetItemsByPathUrl(pathUrl: string): Observable<Item[]> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'pathUrl=' + pathUrl;

        return this.http
            .post<Item[]>(this.itemApiBaseUrl + '/GetByPathUrl', data, {
                headers: headers
            });
            //.map(this.ExtractData);
            //.catch(this.handleError);
    }
    
    // Observable<string>
    public IsLoggedIn(): Observable<string> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http
            .post<string>(this.accountUrl + '/IsLoggedIn', '', {
                headers: headers
            });
            //.map(this.ExtractData);
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
                pathUrl: sectionItem.pathUrl,
                pathName: encodeURIComponent(sectionItem.pathName),
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

    // Observable<Response>
    public UpdateSectionItem(sectionItem: SectionItem): Observable<{}> {
        let headers = new HttpHeaders();
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
        return Observable.throw(error.json() || 'Server error');
    }
}