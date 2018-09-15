import { Component, Inject, OnInit } from '@angular/core';
import { AccountService } from '../../identity/account/account.service';

@Component({
  selector: 'navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded: boolean = false;
  isLoggedIn: boolean = false;
  loggedInAs: string = '';

  constructor(
    @Inject(AccountService) private accountService: AccountService,
  ) {
  }

  ngOnInit() {
    this.accountService.isLoggedIn()
      .subscribe(result => this.isLoggedIn = result);
    this.accountService.loggedInAs()
      .subscribe(result => JSON.stringify(result));
        //this.loggedInAs = result);
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
