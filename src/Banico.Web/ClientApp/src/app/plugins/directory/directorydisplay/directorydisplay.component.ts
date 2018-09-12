﻿import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DirectoryItem } from '../directoryitem';
import { NavBarService } from '../../../common/navbar/navbar.service';
import { SectionService } from '../../../common/section/services/section.service';
import { DirectoryService } from '../directory.service';

@Component({
    selector: 'directorydisplay',
    templateUrl: './directorydisplay.component.html',
    providers: [DirectoryService]
})
export class DirectoryDisplayComponent implements OnInit, OnDestroy {
    private id: string;
    private sub: any;
    private path: string;
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

        this.sub = this.route.params.subscribe(params => {
            this.path = params['path'];
            this.navBarService.initialize('directory', this.path, '', '/directory');

            if (this.path) {
                this.directoryService.GetDirectoryItems(this.path)
                .subscribe(directoryItems => this.setDirectoryItems(directoryItems));
            }
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
