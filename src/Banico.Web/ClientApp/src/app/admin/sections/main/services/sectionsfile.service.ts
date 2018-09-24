import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { SectionItem } from '../../../../entities/sectionitem';
//import { status, json } from '../../../shared/fetch';
//import { Observable } from 'rxjs/Observable';
import { SectionsService } from './sections.service';

@Injectable()
export class SectionsFileService {
    sectionApiBaseUrl: string;

    readonly PATH_DELIM: string = '_';
    readonly TYPE_DELIM: string = '~';
    readonly SECTION_DELIM: string = '*';

    constructor(
        @Inject(SectionsService) private sectionService: SectionsService,
        private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string
    ) {
        this.sectionApiBaseUrl = `${this.baseUrl}api/Section`;
    }

    public UploadFile(sectionType: string, inputString: string) {
        var lines = inputString.split('\n');
        this.ProcessPair(new SectionItem(), sectionType, '', '', '', lines[0].split(','), lines);
    }

    public ProcessPair(
        sectionItem: SectionItem, 
        section: string, 
        parentId: string, 
        pathName: string, 
        path: string, 
        remainingFields: string[], 
        lines: string[]) {
        if (remainingFields.length > 0) {
            var name: string = remainingFields[0];
            if (name) {
                var alias: string = remainingFields[1].replace(/(\r\n|\n|\r)/gm,"");;
                remainingFields.splice(0, 2);

                this.sectionService.GetSectionItems(
                    '', '', '', '', name, parentId, false
                )
                    .subscribe(sectionItem => this.ProcessSectionItem(
                        sectionItem[0], 
                        section, 
                        name, 
                        alias, 
                        parentId, 
                        pathName, 
                        path, 
                        remainingFields, 
                        lines));
            } else {
                if (lines.length > 0) {
                    lines.splice(0, 1);
                    this.ProcessPair(new SectionItem(), section, '', '', '', lines[0].split(','), lines);
                }
            }
        }
        else {
            if (lines.length > 0) {
                lines.splice(0, 1);
                this.ProcessPair(new SectionItem(), section, '', '', '', lines[0].split(','), lines);
            }
        }
    }

    public ProcessSectionItem(
        section: SectionItem, 
        sectionType: string, 
        name: string, 
        alias: string, 
        parentId: string, 
        pathName: string, 
        path: string, 
        remainingFields: string[], 
        lines: string[]) {
        if (isNaN(Number(section.id)) || (Number(section.id) == 0)) {
            if (name != '') {
                section.name = name;
                section.alias = alias;
                section.section = sectionType;
                section.pathName = pathName;
                section.pathUrl = path;
                section.parentId = parentId;

                if (pathName) {
                    pathName = section.pathName + this.PATH_DELIM;
                }

                if (path) {
                    path = section.pathUrl + this.PATH_DELIM;
                }

                this.sectionService.AddSectionItem(section)
                    .subscribe(newSection => this.ProcessPair(newSection,
                        sectionType, 
                        newSection.id, 
                        pathName + section.name, 
                        path + newSection.alias, 
                        remainingFields,
                        lines));
            }
        } 
        else {
            if (pathName) {
                pathName = pathName + this.PATH_DELIM;
            }

            if (path) {
                path = path + this.PATH_DELIM;
            }

            this.ProcessPair(section,
                sectionType, 
                section.id, 
                pathName + section.name, 
                path + section.alias, 
                remainingFields,
                lines);
        }
    }
}