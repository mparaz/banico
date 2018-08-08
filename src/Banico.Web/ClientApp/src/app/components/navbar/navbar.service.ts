import { Injectable, Inject } from '@angular/core';
import { NavBarItem } from '../../entities/navbaritem';
import { SectionItem } from '../../entities/sectionitem';
import { Section } from '../../entities/section';
import { SectionService } from '../section/services/section.service';

@Injectable()
export class NavBarService {
    public isAdmin: boolean;
    public navBarItems: NavBarItem[];
    public pathRoot: string;
    private inputPath: string;
    private index: number;

    public readonly PATH_DELIM: string = '_';
    public readonly TYPE_DELIM: string = '~';
    public readonly SECTION_DELIM: string = '*';

    public constructor(
        @Inject(SectionService) private sectionService: SectionService
    ) {
    }

    public initialize(isAdmin: boolean, module: string, inputPath: string, adminSection: string, pathRoot: string) {
        this.isAdmin = isAdmin;
        this.inputPath = inputPath;
        this.pathRoot = pathRoot;
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
        for (var i: number = 0; i < sections.length; i++) {
            var navBarItem = new NavBarItem();
            navBarItem.showDropdown = false;
            navBarItem.section = sections[i];
            navBarItem.sectionItem = new SectionItem();

            this.navBarItems.push(navBarItem);
        }

        this.index = 0;
        this.setPath();
    }

    public setPath() {
        if (this.index < this.navBarItems.length) {
            this.navBarItems[this.index].homePath = this.fullPath("");
            var sectionName: string = this.navBarItems[this.index].section.name;
            var sectionPath: string = this.pathSegmentByType(sectionName);

            if (!sectionPath) {
                // root level section items
                this.sectionService.GetSectionItems(0, sectionName, '', '', '', 0, false)
                    .subscribe(sections => this.setSectionItems(sections));
            } else {
                this.sectionService.GetSectionItems(0, '', sectionPath, '', '', 0, false)
                        .subscribe(section => this.setSectionItem(section[0]));
            }
        }
    }

    private getIndex(typeName: string) {
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
        this.navBarItems[this.index].sectionItem = sectionItem;
        this.setSection(sectionItem.section);
        this.setBreadcrumbNodes();
        var sectionPath: string = sectionItem.path;
        if (sectionPath) {
            sectionPath = sectionPath + this.PATH_DELIM;
        }
        sectionPath = sectionPath + sectionItem.alias;
        this.setPaths(sectionPath);
        if (!sectionPath) {
            this.sectionService.GetSectionItems(0, sectionItem.section, '', '', '', 0, false)
                .subscribe(sections => this.setSectionItems(sections));
        }
        if (sectionPath) {
            this.sectionService.GetSectionItems(0, '', 
                sectionItem.section + this.TYPE_DELIM + sectionPath,
                '', '', 0, false)
                .subscribe(sections => this.setSectionItems(sections));
        }
    }

    public setSection(sectionName: string) {
        if (sectionName) {
            var section = new Section();
            section.name = sectionName;
            this.navBarItems[this.index].section = section;
        }
    }

    private setBreadcrumbNodes() {
        if ((this.navBarItems[this.index].sectionItem.breadcrumb == null) || 
            (this.navBarItems[this.index].sectionItem.breadcrumb == "")) {
            this.navBarItems[this.index].breadcrumbNodes = [];
        }
        else {
           this.navBarItems[this.index].breadcrumbNodes = this.navBarItems[this.index].sectionItem.breadcrumb.split(this.PATH_DELIM);
        }

        var i: number;
        for (i = 0; i < (this.navBarItems[this.index].breadcrumbNodes.length); i++) {
            if (this.navBarItems[this.index].breadcrumbNodes[i].length == 0) {
                this.navBarItems[this.index].breadcrumbNodes.splice(i, 1);
            }
        }
    }

    private setPaths(sectionPath: string) {
        var pathNodes: string[];
        pathNodes = this.navBarItems[this.index].sectionItem.path.split(this.PATH_DELIM);
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

        this.navBarItems[this.index].paths = [];
        var currentPath: string = "";
        for (i = 0; i < pathNodes.length; i++) {
            if (i > 0) {
                currentPath = currentPath + this.PATH_DELIM;
            }
            currentPath = currentPath + pathNodes[i];
            var newCurrentPath: string = this.fullPath(currentPath);

            this.navBarItems[this.index].paths.push(newCurrentPath);
        }
    }

    public setSectionItems(sectionItems: SectionItem[]) {
        if (sectionItems) {
            var i: number;
            for (i = 0; i < sectionItems.length; i++) {
                sectionItems[i].fullpath = this.pathWithAlias(sectionItems[i].path, sectionItems[i].alias);

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
        this.index = this.index + 1;
        this.setPath();
    }

    private pathWithAlias(path: string, alias: string): string {
        var pathWithAlias: string = path;
        if (pathWithAlias) {
            pathWithAlias = pathWithAlias + this.PATH_DELIM;
        }
        pathWithAlias = pathWithAlias + alias;
        return this.fullPath(pathWithAlias);
    }    

    private fullPath(localPath: string): string {
        var fullPath: string = "";
        for (var i: number = 0; i < this.navBarItems.length; i++) {
            var pathToAdd: string = "";

            if ((i != this.index) && (this.index < this.navBarItems.length)) {
                pathToAdd = this.pathSegmentByType(this.navBarItems[i].section.name);
            } else {
                if (localPath) {
                    pathToAdd = this.navBarItems[i].section.name + this.TYPE_DELIM + localPath;
                }
            }

            if (pathToAdd) {
                if (fullPath) {
                    fullPath = fullPath + this.SECTION_DELIM;
                }
                fullPath = fullPath + pathToAdd;
            }
        }

        return fullPath;
    }

    private pathSegmentByType(inputType: string): string {
        if (this.inputPath) {
            var paths: string[] = this.inputPath.split(this.SECTION_DELIM);
            for (var i: number = 0; i < paths.length; i++) {
                var path = paths[i];
                var type = path.split(this.TYPE_DELIM)[0];
                if (type == inputType) {
                    return path;
                }
            }
        }

        return "";
    }

    public addSectionItem(index: number, sectionItem: SectionItem) {
        sectionItem.fullpath = this.pathWithAlias(sectionItem.path, sectionItem.alias);
        this.navBarItems[index].sectionItems.push(sectionItem);
        this.navBarItems[index].showDropdown = true;
    }

}
