import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../../../entities/item';
import { SectionItem } from '../../../entities/sectionitem';
import { SectionService } from '../services/section.service';

@Component({
    selector: 'sectionlist',
    templateUrl: './sectionlist.component.html',
    providers: [SectionService]
})
export class SectionListComponent implements OnInit, OnDestroy {
    public isAdmin: boolean;
    //private section: string;
    private pathUrl: string;
    public items: Item[];
    public sectionItems: SectionItem[];
    private sub: any;

    constructor(
        @Inject(SectionService) public sectionService: SectionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.isAdmin = false;
        this.sectionService.IsLoggedIn()
            .subscribe(result => alert(JSON.stringify(result)));
        this.sub = this.route.params.subscribe(params => {
            this.pathUrl = params['path'];
            if (this.pathUrl != null)
            {
                this.sectionService.GetItemsByPathUrl(this.pathUrl)
                    .subscribe(items => this.items = items);
            }
        });
    }

    public setAdmin(isLoggedIn: string) {
        if (isLoggedIn == 'true') {
            this.isAdmin = true;
        }
    }
    
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
