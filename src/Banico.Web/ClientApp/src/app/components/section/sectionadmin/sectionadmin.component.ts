import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Section } from '../../../entities/section';
import { SectionService } from '../services/section.service';

@Component({
    selector: 'sectionadmin',
    templateUrl: './sectionadmin.component.html',
    providers: [SectionService]
})
export class SectionAdminComponent implements OnInit {
    public sectionTypes: Section[];
    public sectionType: Section;

    constructor(
        @Inject(SectionService) public sectionService: SectionService
    ) {
    }

    ngOnInit() {
        this.sectionTypes = new Array();
        this.sectionType = new Section();
        this.sectionType.initialize();
        this.sectionService.GetSectionsByModule('')
            .subscribe(sectionTypes => this.setSectionTypes(sectionTypes));
    }

    private setSectionTypes(sectionTypes: Section[])
    {
        this.sectionTypes = sectionTypes;
    }

    public addSectionType() {
        this.sectionService.AddSectionType(this.sectionType)
            .subscribe(sectionType => this.addSectionTypeSuccess(sectionType));
    }

    private addSectionTypeSuccess(sectionType: Section) {
        if (sectionType.id != '0') {
            alert('Saved.');
            this.sectionType = sectionType;
            this.sectionTypes.push(this.sectionType);
            this.sectionType = new Section();
        }
        else {
            alert('Save failed.');
        }
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
