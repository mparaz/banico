import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Section } from '../../../../entities/section';
import { DirectoryItem } from '../../main/directoryitem';
import { NavBarService } from '../../../../shell/navbar/navbar.service';
import { SectionService } from '../../../../shell/section/services/section.service';
import { DirectoryService } from '../../main/directory.service';

@Component({
    selector: 'directoryfront',
    templateUrl: './directoryfront.component.html',
    providers: [DirectoryService]
})
export class DirectoryFrontComponent implements OnInit, OnDestroy {
    private id: string;
    private sub: any;
    private path: string;
    public directoryItems: DirectoryItem[];
    public isAdmin: boolean;

    constructor(
        @Inject(NavBarService) private navBarService: NavBarService,
        @Inject(SectionService) private sectionService: SectionService,
        @Inject(DirectoryService) private directoryService: DirectoryService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.path = '';
            this.navBarService.initialize('directory', this.path, '', '/directory');

            this.directoryService.GetAllDirectoryItems()
                .subscribe(directoryItems => this.setDirectoryItems(directoryItems));
        });

        this.isAdmin = false;
        this.directoryService.IsLoggedIn()
            .subscribe(result => this.setAdmin(result));
    }

    public setAdmin(isLoggedIn: string) {
        if (this.path) {
            if (isLoggedIn == 'True') {
                this.isAdmin = true;
            }
        }
    }
    
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    private setDirectoryItems(directoryItems: DirectoryItem[]) {
        this.directoryItems = directoryItems;
    }
}
