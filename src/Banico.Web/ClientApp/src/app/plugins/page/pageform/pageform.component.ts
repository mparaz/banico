import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Page } from '../page';
import { PageService } from '../page.service';

@Component({
    selector: 'pageform',
    templateUrl: './pageform.component.html',
    providers: [PageService]
})
export class PageFormComponent implements OnInit {
    public page: Page;
    private parentId: string;
    private sub: any;
    private isEdit: boolean = false;

    public constructor(
        @Inject(PageService) private pageService: PageService,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    public ngOnInit() {
        this.page = new Page(null);
        this.sub = this.route.params.subscribe(async params => {
            var alias = params['alias'];
            if (alias) {
                this.pageService.GetPageByAlias(alias)
                .subscribe(page => this.setPage(page));
                
            }
        });
    }

    private setPage(page: Page) {
        this.page = page;
        this.isEdit = true;
    }

    public save() {
        if (!this.isEdit) {
            this.pageService.AddPage(this.page)
                .subscribe(result => this.savePageSuccess(this.page));
        } else {
            this.pageService.UpdatePage(this.page)
                .subscribe(response => this.SaveResponse(response));
        }
    }

    private savePageSuccess(page: Page) {
        alert('Saved.');
        this.router.navigateByUrl('page/' + page.alias);
    }
    
    private SaveResponse(data: any) {
        if (data != null) {
            if (data.value != null) {
                if (data.value == '1') {
                    alert('Saved.');
                    this.router.navigateByUrl('page/' + this.page.alias);
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
