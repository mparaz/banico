import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SectionItem } from '../../../entities/sectionitem';
import { NavBarService } from '../../navbar/navbar.service';
import { SectionService } from '../services/section.service';
import { SectionFileService } from '../services/sectionfile.service';

@Component({
    selector: 'sectionitemadmin',
    templateUrl: './sectionitemadmin.component.html',
    providers: [SectionFileService]
})
export class SectionItemAdminComponent implements OnInit {
    public helper: string;
    public showDropdown: boolean;

    public parentSectionItem: SectionItem;
    public newSectionItem: SectionItem;

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
        this.parentSectionItem = new SectionItem();

        this.newSectionItem = new SectionItem();
        this.newSectionItem.parentId = this.parentSectionItem.parentId;
        this.newSectionItem.path = this.parentSectionItem.path;
        this.newSectionItem.breadcrumb = this.parentSectionItem.breadcrumb;

        var path: string = "";
        var section: string = "";
        this.sub = this.route.params.subscribe(params => {
            section = params['section'];
            this.setSection(section);
            if (params['path']) {
                path = params['path'];
                section = path.split(this.TYPE_DELIM)[0];
                this.sectionService.GetSectionItems(
                    0, '', path, '', '', 0, false
                )
                    .subscribe(sections => {
                        if (sections.length > 0) {
                            this.setParentSectionItem(sections[0], path);
                        }
                    });
            }

            this.navBarService.initialize(true, '', path, section, '/sections/admin');
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
        this.sectionFileService.UploadFile(this.parentSectionItem.section, result);
    }

    private setSection(section: string) {
        this.parentSectionItem.section = section;
        //this.navBarService.setSectionType(0, sectionType);
        this.newSectionItem.section = section;
    }

    private setParentSectionItem(sectionItem: SectionItem, path: string) {
        this.parentSectionItem = sectionItem;

        this.newSectionItem.path = this.parentSectionItem.path;
        if (this.newSectionItem.path) {
            this.newSectionItem.path = this.newSectionItem.path + this.PATH_DELIM;
        }
        this.newSectionItem.path = this.newSectionItem.path + this.parentSectionItem.alias;

        this.newSectionItem.parentId = this.parentSectionItem.id;
        this.newSectionItem.section = this.parentSectionItem.section;
        this.newSectionItem.breadcrumb = this.parentSectionItem.breadcrumb
        if (this.parentSectionItem.breadcrumb > '') {
            this.newSectionItem.breadcrumb = this.newSectionItem.breadcrumb + this.PATH_DELIM;
        }
        this.newSectionItem.breadcrumb = this.newSectionItem.breadcrumb + this.parentSectionItem.name;

        // this.navBarService.setSection(0, section, path);
    }

    public addSectionItem() {
        var alias: string = this.newSectionItem.name.toLowerCase();
        alias = alias.replace(/ /g, "-");
        alias = alias.replace(/\W/g, "");
        this.newSectionItem.alias = alias;

        this.sectionService.AddSectionItem(this.newSectionItem)
            .subscribe(sectionItem => this.addSectionItemSuccess(sectionItem));
    }

    private addSectionItemSuccess(sectionItem: SectionItem) {
        if (sectionItem.id > 0) {
            alert('Saved.');
            this.navBarService.addSectionItem(0, sectionItem);
            this.resetNewSectionItem();
        }
        else {
            alert('Save failed.');
        }
    }

    private resetNewSectionItem() {
        this.newSectionItem = new SectionItem();
        this.newSectionItem.section = this.parentSectionItem.section;
        this.newSectionItem.path = this.parentSectionItem.path;
        if (this.newSectionItem.path) {
            this.newSectionItem.path = this.newSectionItem.path + this.PATH_DELIM;
        }
        this.newSectionItem.path = this.newSectionItem.path + this.parentSectionItem.alias;
        this.newSectionItem.breadcrumb = this.parentSectionItem.breadcrumb;
        if (this.newSectionItem.breadcrumb) {
            this.newSectionItem.breadcrumb = this.newSectionItem.breadcrumb + this.PATH_DELIM;
        }
        this.newSectionItem.breadcrumb = this.newSectionItem.breadcrumb + this.parentSectionItem.name;
        this.newSectionItem.parentId = this.parentSectionItem.id;
    }
    
    private updateSectionItem() {
        this.sectionService.UpdateSectionItem(this.parentSectionItem)
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
