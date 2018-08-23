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
    private index: number;

    public readonly PATH_DELIM: string = '_';
    public readonly TYPE_DELIM: string = '~';
    public readonly SECTION_DELIM: string = '*';

    public constructor(
        @Inject(SectionService) private sectionService: SectionService
    ) {
    }

    public initialize(isAdmin: boolean, module: string, inputPathUrl: string, adminSection: string, pathRoot: string) {
        alert('initialize');
        this.isAdmin = isAdmin;
        this.inputPathUrl = inputPathUrl;
        this.pathUrlRoot = pathRoot;
        this.navBarItems = new Array<NavBarItem>();

        if (isAdmin) {
            var section = new Section();
            if (adminSection) {
                section.name = adminSection;
            }

            var sections = new Array<Section>();
            sections.push(section);
            this.initializeSections(sections);
        } else {
            this.sectionService.GetSections(0, module, '')
                .subscribe(sections => this.initializeSections(sections));
        }
    }

    private initializeSections(sections: Section[]) {
        alert('initializeSections');
        for (var i: number = 0; i < sections.length; i++) {
            var navBarItem = new NavBarItem();
            navBarItem.showDropdown = false;
            navBarItem.section = sections[i];
            navBarItem.sectionItem = new SectionItem();
            navBarItem.sectionItems = new Array<SectionItem>();

            this.navBarItems.push(navBarItem);
        }

        this.index = 0;
        this.setPathUrl();
    }

    public setPathUrl() {
        alert('setPathUrl');
        if (this.index < this.navBarItems.length) {
            this.navBarItems[this.index].homePathUrl = this.fullPathUrl("");
            var sectionName: string = this.navBarItems[this.index].section.name;
            var sectionPathUrl: string = this.pathUrlSegmentByType(sectionName);

            if (!sectionPathUrl) {
                // root level section items
                this.sectionService.GetSectionItems(0, sectionName, '', '', '', 0, false)
                    .subscribe(sectionItems => this.setSectionItems(sectionItems));
            } else {
                this.sectionService.GetSectionItems(0, '', sectionPathUrl, '', '', 0, false)
                        .subscribe(sectionItems => this.setSectionItem(sectionItems[0]));
            }
        }
    }

    private getIndex(typeName: string) {
        alert('getIndex');
        var index: number = -1;
        for (var i: number = 0; i < this.navBarItems.length; i++) {
            if ((this.navBarItems[i].section.name == typeName) ||
                (!this.navBarItems[i].section.name)) {
                    if (index == -1) {
                        index = i;
                    }
                }
        }

        return index;
    }

    public setSectionItem(sectionItem: SectionItem) {
        alert('setSectionItem');
        this.navBarItems[this.index].sectionItem = sectionItem;
        this.setSection(sectionItem.section);
        this.setPathNameNodes();
        var sectionPathUrl: string = sectionItem.pathUrl;
        if (sectionPathUrl) {
            sectionPathUrl = sectionPathUrl + this.PATH_DELIM;
        }
        sectionPathUrl = sectionPathUrl + sectionItem.alias;
        this.setPathUrls(sectionPathUrl);
        if (!sectionPathUrl) {
            this.sectionService.GetSectionItems(0, sectionItem.section, '', '', '', 0, false)
                .subscribe(sectionItems => this.setSectionItems(sectionItems));
        }
        if (sectionPathUrl) {
            this.sectionService.GetSectionItems(0, '', 
                sectionItem.section + this.TYPE_DELIM + sectionPathUrl,
                '', '', 0, false)
                .subscribe(sectionItems => this.setSectionItems(sectionItems));
        }
    }

    public setSection(sectionName: string) {
        alert('setSection');
        if (sectionName) {
            var section = new Section();
            section.name = sectionName;
            this.navBarItems[this.index].section = section;
        }
    }

    private setPathNameNodes() {
        alert('setPathNameNodes');
        if ((this.navBarItems[this.index].sectionItem.pathName == null) || 
            (this.navBarItems[this.index].sectionItem.pathName == "")) {
            this.navBarItems[this.index].pathNameNodes = [];
        }
        else {
           this.navBarItems[this.index].pathNameNodes = this.navBarItems[this.index].sectionItem.pathName.split(this.PATH_DELIM);
        }

        var i: number;
        for (i = 0; i < (this.navBarItems[this.index].pathNameNodes.length); i++) {
            if (this.navBarItems[this.index].pathNameNodes[i].length == 0) {
                this.navBarItems[this.index].pathNameNodes.splice(i, 1);
            }
        }
    }

    private setPathUrls(sectionPathUrl: string) {
        alert('setPaths');
        var pathNodes: string[];
        pathNodes = this.navBarItems[this.index].sectionItem.pathUrl.split(this.PATH_DELIM);
        var sectionName: string;
        if (this.navBarItems[this.index].section != null) {
            sectionName = this.navBarItems[this.index].section.name;
        }
            
        var i: number;
        for (i = 0; i < pathNodes.length; i++) {
            if (pathNodes[i] != null) {
                if (pathNodes[i].length == 0) {
                    pathNodes.splice(i, 1);
                }
            }
        }

        this.navBarItems[this.index].pathUrls = [];
        var currentPathUrl: string = "";
        for (i = 0; i < pathNodes.length; i++) {
            if (i > 0) {
                currentPathUrl = currentPathUrl + this.PATH_DELIM;
            }
            currentPathUrl = currentPathUrl + pathNodes[i];
            var newCurrentPathUrl: string = this.fullPathUrl(currentPathUrl);

            this.navBarItems[this.index].pathUrls.push(newCurrentPathUrl);
        }
    }

    public setSectionItems(sectionItems: SectionItem[]) {
        alert('setSectionItems');
        if (sectionItems) {
            var i: number;
            for (i = 0; i < sectionItems.length; i++) {
                //sectionItems[i].fullpath = this.pathWithAlias(sectionItems[i].path, sectionItems[i].alias);

                if (sectionItems[i].section != this.navBarItems[this.index].section.name) {
                    sectionItems.splice(i, 1);
                }
            }

            this.navBarItems[this.index].sectionItems = sectionItems;

            if (sectionItems.length > 0) {
                this.navBarItems[this.index].showDropdown = true;
            } else {
                this.navBarItems[this.index].showDropdown = false;
            }
        }

        this.doNext();
    }

    private doNext() {
        alert('doNext');
        this.index = this.index + 1;
        this.setPathUrl();
    }

    private pathWithAlias(pathUrl: string, alias: string): string {
        alert('pathWithAlias');
        var pathUrlWithAlias: string = pathUrl;
        if (pathUrlWithAlias) {
            pathUrlWithAlias = pathUrlWithAlias + this.PATH_DELIM;
        }
        pathUrlWithAlias = pathUrlWithAlias + alias;
        return this.fullPathUrl(pathUrlWithAlias);
    }    

    private fullPathUrl(localPathUrl: string): string {
        alert('fullPathUrl');
        var fullPathUrl: string = "";
        for (var i: number = 0; i < this.navBarItems.length; i++) {
            var pathUrlToAdd: string = "";

            if ((i != this.index) && (this.index < this.navBarItems.length)) {
                pathUrlToAdd = this.pathUrlSegmentByType(this.navBarItems[i].section.name);
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

    private pathUrlSegmentByType(inputType: string): string {
        alert('pathUrlSegmentByType');
        if (this.inputPathUrl) {
            var pathUrls: string[] = this.inputPathUrl.split(this.SECTION_DELIM);
            for (var i: number = 0; i < pathUrls.length; i++) {
                var pathUrl = pathUrls[i];
                var type = pathUrl.split(this.TYPE_DELIM)[0];
                if (type == inputType) {
                    return pathUrl;
                }
            }
        }

        return "";
    }

    public addSectionItem(index: number, sectionItem: SectionItem) {
        alert('addSectionItem');
        //sectionItem.fullpath = this.pathWithAlias(sectionItem.path, sectionItem.alias);
        this.navBarItems[index].sectionItems.push(sectionItem);
        alert('+1!');
        this.navBarItems[index].showDropdown = true;
    }

}
