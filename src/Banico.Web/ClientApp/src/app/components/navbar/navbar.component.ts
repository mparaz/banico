import { Component, OnInit, Inject } from '@angular/core';
import { NavBarService } from './navbar.service';
import { SectionService } from '../section/services/section.service';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html'
})
export class NavBarComponent implements OnInit {

    constructor(
        @Inject(NavBarService) public navBarService: NavBarService,
    ) {
    }

    ngOnInit() {
    }
}
