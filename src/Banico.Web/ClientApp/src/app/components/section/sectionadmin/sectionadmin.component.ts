import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Section } from '../../../entities/section';
import { NavBarService } from '../../navbar/navbar.service';
import { SectionService } from '../services/section.service';
import { SectionFileService } from '../services/sectionfile.service';

@Component({
    selector: 'sectionadmin',
    templateUrl: './sectionadmin.component.html',
    providers: [SectionFileService]
})
export class SectionAdminComponent implements OnInit {
    public helper: string;
    public showDropdown: boolean;

    public section: Section;
    public newSection: Section;

    private sub: any;
    private file: any;

    readonly PATH_DELIM: string = '_';
    readonly TYPE_DELIM: string = '~';
    readonly SECTION_DELIM: string = '*';

    public constructor(
        @Inject(NavBarService) private navBarService: NavBarService,
        @Inject(SectionService) private sectionService: SectionService,
        @Inject(SectionFileService) private sectionFileService: SectionFileService,
        private route: ActivatedRoute
    ) {
    }

    public ngOnInit() {
        this.section = new Section();

        this.newSection = new Section();
        this.newSection.parentId = this.section.parentId;
        this.newSection.path = this.section.path;
        this.newSection.breadcrumb = this.section.breadcrumb;

        var path: string = "";
        var type: string = "";
        this.sub = this.route.params.subscribe(params => {
            type = params['type'];
            this.setSectionType(type);
            if (params['path']) {
                path = params['path'];
                type = path.split(this.TYPE_DELIM)[0];
                this.sectionService.GetSectionByPath(path)
                    .subscribe(section => this.setSection(section, path));
            }

            this.navBarService.initialize(true, '', path, type, '/section/admin');
        });
    }

    private setFile($event) {
        this.file = $event.target;
    }

    private uploadFile() {
        var file: File = this.file.files[0]; 
        var reader: FileReader = new FileReader();
        reader.readAsText(file);
        reader.onload = (e) => this.onLoadCallback(reader.result);
    }

    private onLoadCallback(result: any) {
        this.sectionFileService.UploadFile(this.section.type, result);
    }

    private setSectionType(sectionType: string) {
        this.section.type = sectionType;
        //this.navBarService.setSectionType(0, sectionType);
        this.newSection.type = sectionType;
    }

    private setSection(section: Section, path: string) {
        this.section = section;

        this.newSection.path = this.section.path;
        if (this.newSection.path) {
            this.newSection.path = this.newSection.path + this.PATH_DELIM;
        }
        this.newSection.path = this.newSection.path + this.section.alias;

        this.newSection.parentId = this.section.id;
        this.newSection.type = this.section.type;
        this.newSection.breadcrumb = this.section.breadcrumb
        if (this.section.breadcrumb > '') {
            this.newSection.breadcrumb = this.newSection.breadcrumb + this.PATH_DELIM;
        }
        this.newSection.breadcrumb = this.newSection.breadcrumb + this.section.name;

        // this.navBarService.setSection(0, section, path);
    }

    public addSection() {
        var alias: string = this.newSection.name.toLowerCase();
        alias = alias.replace(/ /g, "-");
        alias = alias.replace(/\W/g, "");
        this.newSection.alias = alias;
        this.sectionService.AddSection(this.newSection)
            .subscribe(section => this.addSectionSuccess(section));
    }

    private addSectionSuccess(section: Section) {
        if (section.id != '0') {
            alert('Saved.');
            this.navBarService.addSection(0, section);
            this.resetNewSection();
        }
        else {
            alert('Save failed.');
        }
    }

    private resetNewSection() {
        this.newSection = new Section();
        this.newSection.type = this.section.type;
        this.newSection.path = this.section.path;
        if (this.newSection.path) {
            this.newSection.path = this.newSection.path + this.PATH_DELIM;
        }
        this.newSection.path = this.newSection.path + this.section.alias;
        this.newSection.breadcrumb = this.section.breadcrumb;
        if (this.newSection.breadcrumb) {
            this.newSection.breadcrumb = this.newSection.breadcrumb + this.PATH_DELIM;
        }
        this.newSection.breadcrumb = this.newSection.breadcrumb + this.section.name;
        this.newSection.parentId = this.section.id;
    }
    
    private updateSection() {
        this.sectionService.UpdateSection(this.section)
            .subscribe(data => this.SaveResponse(data));
    }

    private SaveResponse(data: any) {
        if (data != null) {
            if (data.value != null) {
                if (data.value == '0') {
                    alert('Saved.');
                } else {
                    alert('Save failed.');
                }
            } else {
                alert('Save failed.');
            }
        } else {
            alert('Save failed.');
        }
    }
}
