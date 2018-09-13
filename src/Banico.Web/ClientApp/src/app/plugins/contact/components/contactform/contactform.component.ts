import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Contact } from '../contact';
import { Field } from '../field';
import { ContactService } from '../contact.service';
import { ModalComponent } from '../../../app/components/modal/modal.component';

@Component({
    selector: 'contactform',
    templateUrl: './contactform.component.html',
    providers: [ContactService]
})
export class ContactFormComponent implements OnInit {
    public contact: Contact;
    private parentId: string;
    private sub: any;
    private isEdit: boolean = false;
    private fieldId: number;
    public name: string;
    public type: string;

    public constructor(
        @Inject(ContactService) private contactService: ContactService,
        private router: Router,
        private route: ActivatedRoute,
        private modalService: NgbModal        
    ) {
    }

    public ngOnInit() {
        this.contact = new Contact();
        this.contact.fields = [];
        this.fieldId = -1;
        
        this.sub = this.route.params.subscribe(params => {
            var alias = params['alias'];
            this.contactService.GetContactByAlias(alias)
                .subscribe(contact => this.setContact(contact));
        });
    }

    private setContact(contact: Contact) {
        this.contact = contact;
        this.contact.fields = [];
        var fields = JSON.parse(contact.content);
        for (var i = 0; i < fields.length; i++) {
            var fieldItem = fields[i];
            var field = new Field();
            field.name = fieldItem.name;
            field.type = fieldItem.type;
            this.contact.fields.push(field);
        }

        this.isEdit = true;
    }

    public saveField() {
        var field = new Field();
        field.name = this.name;
        field.type = this.type;

        if (this.fieldId == -1) {
            this.contact.fields.push(field);
        } else {
            this.contact.fields[this.fieldId] = field;
        }

        this.contact.content = JSON.stringify(this.contact.fields);

        this.fieldId = -1;
        this.name = '';
        this.type = '';
    }
    
    public cancelField() {
        this.fieldId = -1;
        this.name = '';
        this.type = '';
    }

    public edit(fieldId: number) {
        this.fieldId = fieldId;
        var field = this.contact.fields[fieldId];
        this.name = field.name;
        this.type = field.type;
    }

    public delete(fieldId: number) {
        const modalRef = this.modalService.open(ModalComponent)
        modalRef.componentInstance.title = "Delete Confirmation"
        modalRef.componentInstance.body = "Delete this item?";
        modalRef.componentInstance.button = "Delete";
        modalRef.result.then((result) => {
            if (result == 'success') {
                this.contact.fields.splice(fieldId, 1);
                this.contact.content = JSON.stringify(this.contact.fields);
            }
        });
    }
    
    public save() {
        this.contact.content = JSON.stringify(this.contact.fields);
        if (!this.isEdit) {
            this.contactService.AddContact(this.contact)
                .subscribe(contact => this.saveContactSuccess(contact));
        } else {
            this.contactService.UpdateContact(this.contact)
                .subscribe(response => this.SaveResponse(response));
        }
    }

    private saveContactSuccess(contact: Contact) {
        if (contact.id != '0') {
            alert('Saved.');
            this.router.navigateByUrl('contact/' + contact.alias);
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
                    this.router.navigateByUrl('contact/' + this.contact.alias);
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
