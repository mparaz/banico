import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SectionType } from '../../../entities/sectiontype';
import { SectionService } from '../services/section.service';

@Component({
    selector: 'sectiontypeadmin',
    templateUrl: './sectiontypeadmin.component.html',
    providers: [SectionService]
})
export class SectionTypeAdminComponent implements OnInit {
    public sectionTypes: SectionType[];
    public sectionType: SectionType;

    constructor(
        @Inject(SectionService) public sectionService: SectionService
    ) {
    }

    ngOnInit() {
        this.sectionTypes = new Array();
        this.sectionType = new SectionType();
        this.sectionType.initialize();
        this.sectionService.GetSectionTypes('')
            .subscribe(sectionTypes => this.setSectionTypes(sectionTypes));
    }

    private setSectionTypes(sectionTypes: SectionType[])
    {
        this.sectionTypes = sectionTypes;
    }

    public addSectionType() {
        this.sectionService.AddSectionType(this.sectionType)
            .subscribe(sectionType => this.addSectionTypeSuccess(sectionType));
    }

    private addSectionTypeSuccess(sectionType: SectionType) {
        if (sectionType.id != '0') {
            alert('Saved.');
            this.sectionType = sectionType;
            this.sectionTypes.push(this.sectionType);
            this.sectionType = new SectionType();
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
