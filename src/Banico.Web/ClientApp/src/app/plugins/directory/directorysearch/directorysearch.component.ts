import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DirectoryItem } from '../directoryitem';
import { NavBarService } from '../../../common/navbar/navbar.service';
import { SectionService } from '../../../common/section/services/section.service';
import { DirectoryService } from '../directory.service';

@Component({
    selector: 'directorysearch',
    templateUrl: './directorysearch.component.html',
    providers: [DirectoryService]
})
export class DirectorySearchComponent implements OnInit, OnDestroy {
    private id: string;
    private sub: any;
    public path: string;
    public directoryItems: DirectoryItem[];
    public isAdmin: boolean;

    constructor(
        @Inject(NavBarService) private navBarService: NavBarService,
        @Inject(DirectoryService) private directoryService: DirectoryService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        // this.sub = this.route.params.subscribe(params => {
        //     this.id = params['id'];
        //     this.directoryService.GetDirectoryItem(this.id)
        //         .subscribe(item => this.item = item);
        // });

        this.isAdmin = false;
        this.directoryService.IsLoggedIn()
            .subscribe(result => this.setAdmin(result));
        this.sub = this.route.params.subscribe(params => {
            var search = params['search'];
            this.navBarService.initialize('directory', '', '', '/directory');

        if (search)
            {
                this.directoryService.GetWithTextSearch(search)
                .subscribe(directoryItems => this.setDirectoryItems(directoryItems));
            }
        });
    }

    public setAdmin(isLoggedIn: string) {
        if (isLoggedIn == 'True') {
            this.isAdmin = true;
        }
    }
    
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    private setDirectoryItems(directoryItems: DirectoryItem[]) {
        this.directoryItems = directoryItems;
    }
}
