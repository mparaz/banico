import { ContentItem } from '../../../entities/contentitem';
import { Field } from './field';

export class Contact {
  id: string;
  title: string;
  content: string;
  subject: string;
  fields: Field[];
  alias: string;
  recipientName: string;
  recipientEmail: string;
  senderName: string;
  senderEmail: string;
  lastUpdate: string;

  constructor(private contentItem: ContentItem) {
    if ((contentItem) && (contentItem.module == 'contact')) {
      this.id = contentItem.id;
      this.title = contentItem.name;
      this.content = contentItem.content;
      this.subject = contentItem.attribute01;
      this.recipientName = contentItem.attribute02;
      this.recipientEmail = contentItem.attribute03;      
      this.lastUpdate = contentItem.lastUpdate;
      this.alias = contentItem.alias;
    }
  }

  public ToContentItem(): ContentItem {
    let output: ContentItem = new ContentItem();

    output.module = 'contact';
    output.id = this.id;
    output.name = this.title;
    output.content = this.content;
    output.attribute01 = this.subject;
    output.attribute02 = this.recipientName;
    output.attribute03 = this.recipientEmail;
    output.lastUpdate = this.lastUpdate;
    output.alias = this.alias;

    return output;
  }
}