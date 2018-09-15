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
    public sections: Section[];
    public section: Section;

    constructor(
        @Inject(SectionService) public sectionService: SectionService
    ) {
    }

    ngOnInit() {
        this.sections = new Array();
        this.section = new Section();
        this.section.initialize();
        this.sectionService.GetSections('', '', '')
            .subscribe(sections => this.setSections(sections));
    }

    private setSections(sections: Section[])
    {
        this.sections = sections;
    }

    public addSection() {
        this.sectionService.AddSection(this.section)
            .subscribe(section => this.addSectionSuccess(section));
    }

    private addSectionSuccess(section: Section) {
        if (section.id != '0') {
            alert('Saved.');
            this.section = section;
            this.sections.push(this.section);
            this.section = new Section();
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
