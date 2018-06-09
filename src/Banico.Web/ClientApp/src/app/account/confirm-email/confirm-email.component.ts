import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: []
})
export class ConfirmEmailComponent {
  private sub: any;
  isRequesting: boolean;
  errors: string;  

  constructor(
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.sub = this.route.params.subscribe(params => {
    //     this.id = params['id'];
    //     this.directoryService.GetDirectoryItem(this.id)
    //         .subscribe(item => this.item = item);
    // });

    alert('1');
    this.sub = this.route.queryParams
      .filter(params => params.userId)
      .subscribe(params => {
        var userId = params.userId;
        var code = params.code;
        if ((userId) && (code)) {
          this.confirmEmail(userId, code);
        }
      });

    // this.sub = this.route.params.subscribe(params => {
    //     alert('2');
    //     var userId = params['userId'];
    //     alert(JSON.stringify(params));
    //     if (userId) {
    //     }
    // });
  }
  
  public confirmEmail(
    userId: string,
    code: string) {
    this.isRequesting = true;
    this.accountService.confirmEmail(
      userId,
      code
    )
    .finally(() => this.isRequesting = false)
    .subscribe(
      result  => {
        alert('DONE!');
      },
      errors =>  this.errors = errors);
  }
}