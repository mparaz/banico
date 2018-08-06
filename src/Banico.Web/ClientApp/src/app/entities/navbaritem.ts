import { Section } from './section';
import { SectionItem } from './sectionitem';

export class NavBarItem {
    section: Section;
    sectionItem: SectionItem;
    sectionItems: SectionItem[];
    homePath: string;
    paths: string[];
    breadcrumbNodes: string[];
    showDropdown: boolean;
}