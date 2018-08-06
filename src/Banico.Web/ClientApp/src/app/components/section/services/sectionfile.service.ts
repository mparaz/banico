import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { SectionItem } from '../../../entities/sectionitem';
//import { status, json } from '../../../shared/fetch';
//import { Observable } from 'rxjs/Observable';
import { ORIGIN_URL } from '../../../shared/constants/baseurl.constants';
import { SectionService } from './section.service';

@Injectable()
export class SectionFileService {
    sectionApiBaseUrl: string;

    readonly PATH_DELIM: string = '_';
    readonly TYPE_DELIM: string = '~';
    readonly SECTION_DELIM: string = '*';

    constructor(
        @Inject(SectionService) private sectionService: SectionService,
        private http: Http,
        @Inject(ORIGIN_URL) private baseUrl: string
    ) {
        this.sectionApiBaseUrl = `${this.baseUrl}/api/Section`;
    }

    public UploadFile(sectionType: string, inputString: string) {
        var lines = inputString.split('\n');
        this.ProcessPair(new SectionItem(), sectionType, '0', '', '', lines[0].split(','), lines);
    }

    public ProcessPair(section: SectionItem, sectionType: string, parentId: string, breadcrumb: string, path: string, remainingFields: string[], lines: string[]) {
        if (remainingFields.length > 0) {
            var name: string = remainingFields[0];
            if (name) {
                var alias: string = remainingFields[1].replace(/(\r\n|\n|\r)/gm,"");;
                remainingFields.splice(0, 2);

                this.sectionService.GetSectionItemByNameAndParentId(name, parentId)
                    .subscribe(section => this.ProcessSectionItem(section, sectionType, name, alias, parentId, breadcrumb, path, remainingFields, lines));
            } else {
                if (lines.length > 0) {
                    lines.splice(0, 1);
                    this.ProcessPair(new SectionItem(), sectionType, '0', '', '', lines[0].split(','), lines);
                }
            }
        }
        else {
            if (lines.length > 0) {
                lines.splice(0, 1);
                this.ProcessPair(new SectionItem(), sectionType, '0', '', '', lines[0].split(','), lines);
            }
        }
    }

    public ProcessSectionItem(section: SectionItem, sectionType: string, name: string, alias: string, parentId: string, breadcrumb: string, path: string, remainingFields: string[], lines: string[]) {
        if (isNaN(Number(section.id)) || (Number(section.id) == 0)) {
            if (name != '') {
                section.name = name;
                section.alias = alias;
                section.section = sectionType;
                section.breadcrumb = breadcrumb;
                section.path = path;
                section.parentId = parentId;

                if (breadcrumb) {
                    breadcrumb = section.breadcrumb + this.PATH_DELIM;
                }

                if (path) {
                    path = section.path + this.PATH_DELIM;
                }

                this.sectionService.AddSectionItem(section)
                    .subscribe(newSection => this.ProcessPair(newSection,
                        sectionType, 
                        newSection.id, 
                        breadcrumb + section.name, 
                        path + newSection.alias, 
                        remainingFields,
                        lines));
            }
        } 
        else {
            if (breadcrumb) {
                breadcrumb = breadcrumb + this.PATH_DELIM;
            }

            if (path) {
                path = path + this.PATH_DELIM;
            }

            this.ProcessPair(section,
                sectionType, 
                section.id, 
                breadcrumb + section.name, 
                path + section.alias, 
                remainingFields,
                lines);
        }
    }
}