import { ContentItem } from '../../../entities/contentitem';
import { Qa } from './qa';

export class Faq {
  id: string;
  title: string;
  content: string;
  qas: Qa[];
  alias: string;
  lastUpdate: string;

  constructor(private contentItem: ContentItem) {
    if ((contentItem) && (contentItem.module == 'faq')) {
      this.id = contentItem.id;
      this.title = contentItem.name;
      this.content = contentItem.content;
      this.alias = contentItem.alias;
      this.lastUpdate = contentItem.lastUpdate;
    }
  }

  public ToContentItem(): ContentItem {
    let output: ContentItem = new ContentItem();

    output.module = 'faq';
    output.id = this.id;
    output.name = this.title;
    output.content = this.content;
    output.alias = this.alias;
    
    return output;
  }
}