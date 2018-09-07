import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Page } from '../page';
import { PageService } from '../page.service';
import { ModalComponent } from '../../../app/components/modal/modal.component';

@Component({
    selector: 'pagedisplay',
    templateUrl: './pagedisplay.component.html',
    providers: [PageService]
})
export class PageDisplayComponent implements OnInit, OnDestroy {
    public page: Page;
    private sub: any;
    public isAdmin: boolean;

    constructor(
        @Inject(PageService) private pageService: PageService,
        private route: ActivatedRoute,
        private router: Router,
        private modalService: NgbModal
    ) {
    }

    ngOnInit() {
        this.page = new Page();
        this.sub = this.route.params.subscribe(params => {
            var alias = params['alias'];
            this.pageService.GetPageByAlias(alias)
                .subscribe(page => this.setPage(page));
        });

        this.isAdmin = false;
        this.pageService.IsLoggedIn()
            .subscribe(result => this.setAdmin(result));
    }

    public setAdmin(isLoggedIn: string) {
        if (isLoggedIn == 'True') {
            this.isAdmin = true;
        }
    }

    public setPage(page: Page) {
        this.page = page;
    }

    delete() {
        const modalRef = this.modalService.open(ModalComponent)
        modalRef.componentInstance.title = "Delete Confirmation"
        modalRef.componentInstance.body = "Delete this item?";
        modalRef.componentInstance.button = "Delete";
        modalRef.result.then((result) => {
            if (result == 'success') {
                this.pageService.DeletePage(this.page)
                    .subscribe(response => this.SaveResponse(response));
            }
        });
    }

    private SaveResponse(data: any) {
        if (data != null) {
            if (data.value != null) {
                if (data.value == '1') {
                    alert('Saved.');
                    this.router.navigateByUrl('front');
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
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
