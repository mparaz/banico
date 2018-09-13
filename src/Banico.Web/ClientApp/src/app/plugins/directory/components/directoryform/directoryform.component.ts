import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContentItem } from '../../../../entities/contentitem';
import { DirectoryItem } from '../../main/directoryitem';
import { NavBarService } from '../../../../common/navbar/navbar.service';
import { DirectoryService } from '../../main/directory.service';

@Component({
    selector: 'directoryform',
    templateUrl: './directoryform.component.html',
    providers: [DirectoryService]
})
export class DirectoryFormComponent implements OnInit {
    public directoryItem: DirectoryItem;
    private sub: any;
    private isEdit: boolean = false;

    public constructor(
        @Inject(NavBarService) private navBarService: NavBarService,
        @Inject(DirectoryService) private directoryService: DirectoryService,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    public ngOnInit() {
        this.directoryItem = new DirectoryItem(null);
        this.sub = this.route.params.subscribe(params => {
            var id = params['id'];
            var path = params['path'];
            if (id) {
                this.directoryService.GetDirectoryItem(id)
                    .subscribe(directoryItem => this.setDirectoryItem(directoryItem));
            }
            if (path) {
                this.navBarService.initialize('directory', path, '', '/directory');
                this.directoryItem.sectionItems = path;
            }
        });
    }

    private setDirectoryItem(directoryItem: DirectoryItem) {
        this.directoryItem = directoryItem;
        this.navBarService.initialize('directory', directoryItem.sectionItems, '', '/directory');
        this.isEdit = true;
    }

    public saveDirectoryItem() {
        if (!this.isEdit) {
            this.directoryService.AddDirectoryItem(this.directoryItem)
                .subscribe(directoryItem => this.saveDirectoryItemSuccess(directoryItem));
        } else {
            this.directoryService.UpdateDirectoryItem(this.directoryItem)
                .subscribe(response => this.SaveResponse(response));
        }
    }

    private saveDirectoryItemSuccess(directoryItem: DirectoryItem) {
        if (directoryItem.id != '0') {
            alert('Saved.');
            this.router.navigateByUrl('directory/item/' + directoryItem.id);
        }
        else {
            alert('Save failed.');
        }
    }

    private SaveResponse(data: any) {
        if (data != null) {
            if (data.value != null) {
                if (data.value == '1') {
                    alert('Saved.');
                    this.router.navigateByUrl('directory/item/' + this.directoryItem.id);
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
