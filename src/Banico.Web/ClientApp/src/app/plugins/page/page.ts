import { ContentItem } from '../../entities/contentitem';

export class Page {
  id: string;
  title: string;
  content: string;
  htmlContent: string;
  createdDate: string;
  lastUpdate: string;
  alias: string;

  constructor(private contentItem: ContentItem) {
    if (contentItem) {
      this.id = contentItem.id;
      this.title = contentItem.name;
      this.content = contentItem.content;
      this.createdDate = contentItem.createdDate;
      this.lastUpdate = contentItem.lastUpdate;
      this.alias = contentItem.alias;
    }
  }
}