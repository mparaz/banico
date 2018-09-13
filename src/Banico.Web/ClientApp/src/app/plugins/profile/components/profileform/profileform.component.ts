import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Profile } from '../profile';
import { ProfileService } from '../profile.service';

@Component({
    selector: 'profileform',
    templateUrl: './profileform.component.html',
    providers: [ProfileService]
})
export class ProfileFormComponent implements OnInit {
    public profile: Profile;
    private sub: any;
    private isEdit: boolean = false;

    public constructor(
        @Inject(ProfileService) private profileService: ProfileService,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    public ngOnInit() {
        this.profile = new Profile();
        this.profileService.GetProfile()
            .subscribe(profile => this.setProfile(profile));
        this.profileService.GetUser()
            .subscribe(profile => this.setUser(profile));
    }

    public setUser(profile: Profile) {
        this.profile.firstName = profile.firstName;
        this.profile.lastName = profile.lastName;
        this.profile.alias = profile.alias;
        this.isEdit = true;
    }

    public setProfile(profile: Profile) {
        this.profile.lastUpdate = profile.lastUpdate;
        this.profile.content = profile.content;
        this.profile.htmlContent = profile.htmlContent;
    }

    public save() {
        this.saveProfile();
        this.saveUser();
    }

    public saveProfile() {
        this.profileService.AddOrUpdateProfile(this.profile)
        .subscribe(response => this.SaveResponse(response));
    }

    public saveUser() {
        this.profileService.UpdateUser(this.profile)
        .subscribe(response => this.SaveResponse(response));
    }

    private saveProfileSuccess(profile: Profile) {
        if (profile.id != '0') {
            alert('Saved.');
            this.router.navigateByUrl('page/' + profile.alias);
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
                    // this.router.navigateByUrl('profile');
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
