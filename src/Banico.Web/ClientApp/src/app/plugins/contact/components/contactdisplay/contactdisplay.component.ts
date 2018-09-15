import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Contact } from '../../main/contact';
import { Field } from '../../main/field';
import { AccountService } from '../../../../identity/account/account.service';
import { ContactService } from '../../main/contact.service';
import { ModalComponent } from '../../../../common/modal/modal.component';

@Component({
    selector: 'contactdisplay',
    templateUrl: './contactdisplay.component.html',
    providers: [ContactService]
})
export class ContactDisplayComponent implements OnInit, OnDestroy {
    public contact: Contact;
    private sub: any;
    public isAdmin: boolean;
    public fieldValue: string[];

    constructor(
        @Inject(AccountService) private accountService: AccountService,
        @Inject(ContactService) private contactService: ContactService,
        private route: ActivatedRoute,
        private router: Router,
        private modalService: NgbModal
    ) {
    }

    ngOnInit() {
        this.contact = new Contact(null);
        this.sub = this.route.params.subscribe(params => {
            var alias = params['alias'];
            this.contactService.GetContactByAlias(alias)
                .subscribe(contact => this.setContact(contact));
        });

        this.isAdmin = false;
        this.accountService.isLoggedIn()
            .subscribe(result => this.setAdmin(result));
    }

    public setAdmin(isLoggedIn: any) {
        if (isLoggedIn == 'True') {
            this.isAdmin = true;
        }
    }

    private setContact(contact: Contact) {
        this.contact = contact;
        this.contact.fields = [];
        this.fieldValue = [];
        var fields = JSON.parse(contact.content);
        for (var i = 0; i < fields.length; i++) {
            var fieldItem = fields[i];
            var field = new Field();
            field.name = fieldItem.name;
            field.type = fieldItem.type;
            this.contact.fields.push(field);
            this.fieldValue.push('');
        }
    }

    public delete() {
        const modalRef = this.modalService.open(ModalComponent)
        modalRef.componentInstance.title = "Delete Confirmation"
        modalRef.componentInstance.body = "Delete this item?";
        modalRef.componentInstance.button = "Delete";
        modalRef.result.then((result) => {
            if (result == 'success') {
                this.contactService.DeleteContact(this.contact)
                    .subscribe(response => this.SaveResponse(response));
            }
        });
    }

    public send() {
        var message = '';
        message = message + "Sender Name: " + this.contact.senderName + "\n";
        message = message + "Sender Email: " + this.contact.senderEmail + "\n";
        for (var i = 0; i < this.contact.fields.length; i++) {
            var fieldItem = this.contact.fields[i];
            message = message + fieldItem.name + ": " + this.fieldValue[i] + "\n";
        }        

        this.contactService.SendContactEmail(this.contact, message)
            .subscribe(response => alert(JSON.stringify(response)));
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
