import { ContentItem } from "../../../entities/contentitem";

export class DirectoryItem {
  id: string;
  name: string;
  description: string;
  snippet: string;
  htmlDescription: string;
  address: string;
  phone: string;
  website: string;
  email: string;
  sectionItems: string;
  sectionOrderKey: string;

  constructor(private contentItem: ContentItem) {
    if ((contentItem) && (contentItem.module == 'directory')) {
      this.id = contentItem.id;
      this.name = contentItem.name;
      this.description = contentItem.content;
      this.htmlDescription = contentItem.htmlContent;
      this.address = contentItem.attribute01;
      this.phone = contentItem.attribute02;
      this.website = contentItem.attribute03;
      this.email = contentItem.attribute04;
      this.sectionItems = contentItem.sectionItems;
      this.sectionOrderKey = contentItem.attribute05;
    }
  }

  public ToContentItem(): ContentItem {
    let output: ContentItem = new ContentItem();

    output.module = "directory";
    output.id = this.id;
    output.name = this.name;
    output.content = this.description;
    output.attribute01 = this.address;
    output.attribute02 = this.phone;
    output.attribute03 = this.website;
    output.attribute04 = this.email;
    
    return output;
  }
}