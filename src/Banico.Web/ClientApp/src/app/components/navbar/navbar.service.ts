import { Injectable, Inject } from '@angular/core';
import { NavBarItem } from '../../entities/navbaritem';
import { Section } from '../../entities/section';
import { SectionType } from '../../entities/sectiontype';
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

    public initialize(isAdmin: boolean, module: string, inputPath: string, adminSectionType: string, pathRoot: string) {
        this.isAdmin = isAdmin;
        this.inputPath = inputPath;
        this.pathRoot = pathRoot;
        this.navBarItems = new Array<NavBarItem>();

        if (isAdmin) {
            var sectionType = new SectionType();
            if (adminSectionType) {
                sectionType.name = adminSectionType;
            }

            var sectionTypes = new Array<SectionType>();
            sectionTypes.push(sectionType);
            this.initializeSectionTypes(sectionTypes);
        } else {
            this.sectionService.GetSectionTypes(module)
                .subscribe(sectionTypes => this.initializeSectionTypes(sectionTypes));
        }
    }

    private initializeSectionTypes(sectionTypes: SectionType[]) {
        for (var i: number = 0; i < sectionTypes.length; i++) {
            var navBarItem = new NavBarItem();
            navBarItem.showDropdown = false;
            navBarItem.sectionType = sectionTypes[i];
            navBarItem.section = new Section();

            this.navBarItems.push(navBarItem);
        }

        this.index = 0;
        this.setPath();
    }

    public setPath() {
        if (this.index < this.navBarItems.length) {
            this.navBarItems[this.index].homePath = this.fullPath("");
            var typeName: string = this.navBarItems[this.index].sectionType.name;
            var sectionPath: string = this.pathSegmentByType(typeName);

            if (!sectionPath) {
                this.sectionService.GetRootSectionsBySectionType(typeName)
                    .subscribe(sections => this.setSections(sections));
            } else {
                this.sectionService.GetSectionByPath(sectionPath)
                        .subscribe(section => this.setSection(section));
            }
        }
    }

    private getIndex(typeName: string) {
        var index: number = -1;
        for (var i: number = 0; i < this.navBarItems.length; i++) {
            if ((this.navBarItems[i].sectionType.name == typeName) ||
                (!this.navBarItems[i].sectionType.name)) {
                    if (index == -1) {
                        index = i;
                    }
                }
        }

        return index;
    }

    public setSection(section: Section) {
        this.navBarItems[this.index].section = section;
        this.setSectionType(section.type);
        this.setBreadcrumbNodes();
        var sectionPath: string = section.path;
        if (sectionPath) {
            sectionPath = sectionPath + this.PATH_DELIM;
        }
        sectionPath = sectionPath + section.alias;
        this.setPaths(sectionPath);
        if (!sectionPath) {
            this.sectionService.GetRootSectionsBySectionType(section.type)
                .subscribe(sections => this.setSections(sections));
        }
        if (sectionPath) {
            this.sectionService.GetSectionsByPath(section.type + this.TYPE_DELIM + sectionPath)
                .subscribe(sections => this.setSections(sections));
        }
    }

    public setSectionType(sectionTypeName: string) {
        if (sectionTypeName) {
            var sectionType = new SectionType();
            sectionType.name = sectionTypeName;
            this.navBarItems[this.index].sectionType = sectionType;
        }
    }

    private setBreadcrumbNodes() {
        if ((this.navBarItems[this.index].section.breadcrumb == null) || 
            (this.navBarItems[this.index].section.breadcrumb == "")) {
            this.navBarItems[this.index].breadcrumbNodes = [];
        }
        else {
           this.navBarItems[this.index].breadcrumbNodes = this.navBarItems[this.index].section.breadcrumb.split(this.PATH_DELIM);
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
        pathNodes = this.navBarItems[this.index].section.path.split(this.PATH_DELIM);
        var sectionTypeName: string;
        if (this.navBarItems[this.index].sectionType != null) {
            sectionTypeName = this.navBarItems[this.index].sectionType.name;
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

    public setSections(sections: Section[]) {
        if (sections) {
            var i: number;
            for (i = 0; i < sections.length; i++) {
                sections[i].fullpath = this.pathWithAlias(sections[i].path, sections[i].alias);

                if (sections[i].type != this.navBarItems[this.index].sectionType.name) {
                    sections.splice(i, 1);
                }
            }

            this.navBarItems[this.index].sections = sections;

            if (sections.length > 0) {
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
                pathToAdd = this.pathSegmentByType(this.navBarItems[i].sectionType.name);
            } else {
                if (localPath) {
                    pathToAdd = this.navBarItems[i].sectionType.name + this.TYPE_DELIM + localPath;
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

    public addSection(index: number, section: Section) {
        section.fullpath = this.pathWithAlias(section.path, section.alias);
        this.navBarItems[index].sections.push(section);
        this.navBarItems[index].showDropdown = true;
    }

}
