import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Faq } from '../faq';
import { Qa } from '../qa';
import { FaqService } from '../faq.service';
import { ModalComponent } from '../../../app/components/modal/modal.component';

@Component({
    selector: 'faqdisplay',
    templateUrl: './faqdisplay.component.html',
    providers: [FaqService]
})
export class FaqDisplayComponent implements OnInit, OnDestroy {
    public faq: Faq;
    private sub: any;
    public isAdmin: boolean;

    constructor(
        @Inject(FaqService) private faqService: FaqService,
        private route: ActivatedRoute,
        private router: Router,
        private modalService: NgbModal
    ) {
    }

    ngOnInit() {
        this.faq = new Faq();
        this.sub = this.route.params.subscribe(params => {
            var alias = params['alias'];
            this.faqService.GetFaqByAlias(alias)
                .subscribe(faq => this.setFaq(faq));
        });

        this.isAdmin = false;
        this.faqService.IsLoggedIn()
            .subscribe(result => this.setAdmin(result));
    }

    public setAdmin(isLoggedIn: string) {
        if (isLoggedIn == 'True') {
            this.isAdmin = true;
        }
    }

    private setFaq(faq: Faq) {
        this.faq = faq;
        this.faq.qas = [];
        var qas = JSON.parse(faq.content);
        for (var i = 0; i < qas.length; i++) {
            var qaItem = qas[i];
            var qa = new Qa();
            qa.question = qaItem.question;
            qa.answer = qaItem.answer;
            this.faq.qas.push(qa);
        }
    }

    delete() {
        const modalRef = this.modalService.open(ModalComponent)
        modalRef.componentInstance.title = "Delete Confirmation"
        modalRef.componentInstance.body = "Delete this item?";
        modalRef.componentInstance.button = "Delete";
        modalRef.result.then((result) => {
            if (result == 'success') {
                this.faqService.DeleteFaq(this.faq)
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
