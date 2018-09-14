import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Profile } from '../../main/profile';
import { ProfileService } from '../../main/profile.service';

@Component({
    selector: 'profiledisplay',
    templateUrl: './profiledisplay.component.html',
    providers: [ProfileService]
})
export class ProfileDisplayComponent implements OnInit, OnDestroy {
    public profile: Profile;
    private sub: any;
    public isAdmin: boolean;

    constructor(
        @Inject(ProfileService) private profileService: ProfileService,
        private route: ActivatedRoute,
        private router: Router,
        private modalService: NgbModal
    ) {
    }

    ngOnInit() {
        this.profile = new Profile();
        this.isAdmin = false;
        this.sub = this.route.params.subscribe(params => {
            var alias = params['alias'];
            if (alias) {
                this.profileService.GetProfileByAlias(alias)
                .subscribe(profile => this.setProfile(profile));
            } else {
                this.profileService.GetProfile()
                .subscribe(profile => this.setProfile(profile));
                this.profileService.GetUser()
                .subscribe(profile => this.setUser(profile));
                this.profileService.IsLoggedIn()
                .subscribe(result => this.setAdmin(result));
            }
        });

    }

    public setAdmin(isLoggedIn: string) {
        if (isLoggedIn == 'True') {
            this.isAdmin = true;
        }
    }

    public setUser(profile: Profile) {
        this.profile.firstName = profile.firstName;
        this.profile.lastName = profile.lastName;
        this.profile.alias = profile.alias;
    }

    public setProfile(profile: Profile) {
        this.profile.lastUpdate = profile.lastUpdate;
        this.profile.content = profile.content;
        this.profile.htmlContent = profile.htmlContent;
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
