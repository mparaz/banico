import { ContentItem } from '../../../entities/contentitem';

export class Page {
  id: string;
  title: string;
  content: string;
  htmlContent: string;
  createdDate: string;
  lastUpdate: string;
  alias: string;

  constructor(private contentItem: ContentItem) {
    if ((contentItem) && (contentItem.module == 'page')) {
      this.id = contentItem.id;
      this.title = contentItem.name;
      this.content = contentItem.content;
      this.htmlContent = contentItem.htmlContent;
      this.createdDate = contentItem.createdDate;
      this.lastUpdate = contentItem.lastUpdate;
      this.alias = contentItem.alias;
    }
  }

  public ToContentItem(): ContentItem {
    let output: ContentItem = new ContentItem();

    output.module = "page";
    output.id = this.id;
    output.name = this.title;
    output.content = this.content;
    output.createdDate = this.createdDate;
    output.lastUpdate = this.lastUpdate;
    output.alias = this.alias;

    return output;
  }
}