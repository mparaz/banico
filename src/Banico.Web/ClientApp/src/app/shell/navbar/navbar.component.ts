import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NavBarService } from './navbar.service';
import { SectionsService } from '../../admin/sections/main/services/sections.service';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html'
})
export class NavBarComponent implements OnInit {
    public href: string = "";

      constructor(
        @Inject(NavBarService) public navBarService: NavBarService,
        private location: Location,
        private router: Router
    ) {
        router.events.subscribe((val) => {
            if(location.path() != ''){
              this.href = location.path();
            }
        });
      }

    ngOnInit() {
    }
}
