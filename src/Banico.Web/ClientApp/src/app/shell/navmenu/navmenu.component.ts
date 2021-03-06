import { Component, Inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AccountService } from '../../identity/account/main/account.service';

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
    private location: Location
  ) {
  }

  ngOnInit() {
    this.accountService.isLoggedIn()
      .subscribe(result => this.isLoggedIn = result);
    this.accountService.loggedInAs()
      .subscribe(data => this.loggedInAs = data);
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
