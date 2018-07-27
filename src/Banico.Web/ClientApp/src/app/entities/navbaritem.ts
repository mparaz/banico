import { SectionType } from './sectiontype';
import { Section } from './section';

export class NavBarItem {
    sectionType: SectionType;
    section: Section;
    sections: Section[];
    homePath: string;
    paths: string[];
    breadcrumbNodes: string[];
    showDropdown: boolean;
}