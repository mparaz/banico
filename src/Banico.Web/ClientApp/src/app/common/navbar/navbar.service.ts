import { Injectable, Inject } from '@angular/core';
import { NavBarItem } from '../../entities/navbaritem';
import { SectionItem } from '../../entities/sectionitem';
import { Section } from '../../entities/section';
import { SectionService } from '../section/services/section.service';

@Injectable()
export class NavBarService {
    public isAdmin: boolean;
    public navBarItems: NavBarItem[];
    public pathUrlRoot: string;
    private inputPathUrl: string;

    public readonly PATH_DELIM: string = '_';
    public readonly TYPE_DELIM: string = '~';
    public readonly SECTION_DELIM: string = '*';

    public constructor(
        @Inject(SectionService) private sectionService: SectionService
    ) {
    }

    public async initialize(
        module: string, 
        inputPathUrl: string, 
        adminSection: string, 
        pathRoot: string
    ) {
        this.isAdmin = false;
        this.inputPathUrl = inputPathUrl;
        this.pathUrlRoot = pathRoot;
        this.navBarItems = new Array<NavBarItem>();

        var sections = new Array<Section>();
        if (adminSection) {
            this.isAdmin = true;
            var section = new Section();
            section.name = adminSection;
            sections.push(section);
        } else {
            sections = await this.sectionService.GetSections(0, module, '').first().toPromise();
        }

        this.initializeNavBarItems(sections);

        for (var i: number = 0; i < sections.length; i++) {
            this.setup(this.navBarItems[i]);
        }
    }

    // Initializes each nav bar
    private initializeNavBarItems(sections: Section[]) {
        for (var i: number = 0; i < sections.length; i++) {
            var navBarItem = new NavBarItem();
            navBarItem.showDropdown = false;
            navBarItem.childrenVisible = false;
            navBarItem.section = sections[i];
            navBarItem.sectionItem = new SectionItem();
            navBarItem.childSectionItems = new Array<SectionItem>();

            this.navBarItems.push(navBarItem);
        }
    }

    public async setup(navBarItem: NavBarItem) {
        var sectionName: string = navBarItem.section.name;
        navBarItem.homePathUrl = this.fullPathUrl(sectionName, "");
        var sectionPathUrl: string = this.pathUrlSegmentBySection(sectionName);

        if (sectionPathUrl) {
            var sectionItems = await this.sectionService.GetSectionItemByPath(sectionName + this.TYPE_DELIM + 
                sectionPathUrl).first().toPromise();
            await this.setNavBarItem(navBarItem, sectionItems[0]);
        }

        if (!sectionPathUrl) {
            sectionItems = await this.sectionService.GetSectionItems(0, sectionName, 
                '', '', '', 0, true).first().toPromise();
            navBarItem.childSectionItems = this.cleanChildSectionItems(navBarItem, sectionItems);
        }

        // set dropdown
        navBarItem.showDropdown = (navBarItem.childSectionItems.length > 0);
    }

    public async setNavBarItem(navBarItem: NavBarItem, sectionItem: SectionItem) {
        if (!navBarItem) {
            navBarItem = this.navBarItems[0];
        }

        navBarItem.sectionItem = sectionItem;        

        // set path names
        navBarItem.pathNames = this.setPathNames(navBarItem);

        // set path url
        var sectionPathUrl: string = navBarItem.sectionItem.pathUrl;
        if (sectionPathUrl) {
            sectionPathUrl = sectionPathUrl + this.PATH_DELIM;
        }
        sectionPathUrl = sectionPathUrl + navBarItem.sectionItem.alias;
        this.setPathUrls(navBarItem, sectionPathUrl);

        // set child section items
        var sectionItems = await this.sectionService.GetSectionItems(0, '', '', '', '', navBarItem.sectionItem.id, false).first().toPromise();
        navBarItem.childSectionItems = this.cleanChildSectionItems(navBarItem, sectionItems);
    }

    private setPathNames(navBarItem: NavBarItem) {
        var pathNames = new Array<string>();

        if (navBarItem.sectionItem.pathName) {
           pathNames = navBarItem.sectionItem.pathName.split(this.PATH_DELIM);
        }

        var i: number;
        for (i = 0; i < (pathNames.length); i++) {
            if (pathNames[i].length == 0) {
                pathNames.splice(i, 1);
            }
        }

        return pathNames;
    }

    private setPathUrls(navBarItem: NavBarItem, sectionPathUrl: string) {
        var pathUrls: string[];
        pathUrls = navBarItem.sectionItem.pathUrl.split(this.PATH_DELIM);
        var sectionName: string;
        if (navBarItem.section != null) {
            sectionName = navBarItem.section.name;
        }
            
        var i: number;
        for (i = 0; i < pathUrls.length; i++) {
            if (pathUrls[i] != null) {
                if (pathUrls[i].length == 0) {
                    pathUrls.splice(i, 1);
                }
            }
        }

        navBarItem.pathUrls = [];
        var currentPathUrl: string = "";
        for (i = 0; i < pathUrls.length; i++) {
            if (i > 0) {
                currentPathUrl = currentPathUrl + this.PATH_DELIM;
            }
            currentPathUrl = currentPathUrl + pathUrls[i];
            var newCurrentPathUrl: string = this.fullPathUrl(sectionName, currentPathUrl);

            navBarItem.pathUrls.push(newCurrentPathUrl);
        }
    }

    public cleanChildSectionItems(navBarItem: NavBarItem, sectionItems: SectionItem[]) {
        if (sectionItems && (sectionItems.length > 0)) {
            var i: number;
            for (i = 0; i < sectionItems.length; i++) {
                //sectionItems[i].fullpath = this.pathWithAlias(sectionItems[i].path, sectionItems[i].alias);

                if (sectionItems[i]) {
                    if (sectionItems[i].section != navBarItem.section.name) {
                        sectionItems.splice(i, 1);
                    }
                }
            }
        }

        return sectionItems;
    }

    private pathWithAlias(sectionItem: SectionItem): string {
        var pathUrlWithAlias: string = sectionItem.pathUrl;
        if (pathUrlWithAlias) {
            pathUrlWithAlias = pathUrlWithAlias + this.PATH_DELIM;
        }
        pathUrlWithAlias = pathUrlWithAlias + sectionItem.alias;
        return this.fullPathUrl(sectionItem.section, pathUrlWithAlias);
    }    

    private fullPathUrl(section: string, localPathUrl: string): string {
        var fullPathUrl: string = "";
        for (var i: number = 0; i < this.navBarItems.length; i++) {
            var pathUrlToAdd: string = "";

            if (this.navBarItems[i].section.name != section) {
                pathUrlToAdd = this.navBarItems[i].section.name + this.TYPE_DELIM + 
                    this.pathUrlSegmentBySection(this.navBarItems[i].section.name);
            } else {
                if (localPathUrl) {
                    pathUrlToAdd = this.navBarItems[i].section.name + this.TYPE_DELIM + localPathUrl;
                }
            }

            if (pathUrlToAdd) {
                if (fullPathUrl) {
                    fullPathUrl = fullPathUrl + this.SECTION_DELIM;
                }
                fullPathUrl = fullPathUrl + pathUrlToAdd;
            }
        }

        return fullPathUrl;
    }

    private pathUrlSegmentBySection(inputSection: string): string {
        if (this.inputPathUrl) {
            var pathUrls: string[] = this.inputPathUrl.split(this.SECTION_DELIM);
            for (var i: number = 0; i < pathUrls.length; i++) {
                var pathUrl = pathUrls[i];
                var section = pathUrl.split(this.TYPE_DELIM)[0];
                if (section == inputSection) {
                    return pathUrl.split(this.TYPE_DELIM)[1];
                }
            }
        }

        return "";
    }

    public addSectionItem(index: number, sectionItem: SectionItem) {
        //sectionItem.fullpath = this.pathWithAlias(sectionItem.path, sectionItem.alias);
        this.navBarItems[index].childSectionItems.push(sectionItem);
        this.navBarItems[index].showDropdown = true;
    }

    public setVisible($event: any, navBarItem: NavBarItem) {
        //$event.preventDefault();
        navBarItem.childrenVisible = !navBarItem.childrenVisible;
    }
}
