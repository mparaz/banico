import { Component, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html'
})

export class ModalComponent  {
    @Input() title;
    @Input() body;
    @Input() button;
    
    constructor (public activeModal: NgbActiveModal) {
    }
}
