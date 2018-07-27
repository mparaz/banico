import { Component, OnInit, Inject } from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'front',
    templateUrl: '../../../../../config/front.component.html'
})
export class FrontComponent implements OnInit {
    public location: string;
    public content: string;

    readonly SECTION_DELIM: string = '*';

    constructor(private router: Router) {
    }

    ngOnInit() {
        this.location = '';
        this.content = '';
    }

    public search() {
        this.router.navigateByUrl('directory/search/' + this.content + this.SECTION_DELIM + this.location);
    }
}
