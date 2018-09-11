using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.RegularExpressions;
using Markdig;

namespace Banico.Core.Entities
{
    public class ContentItem : Item
    {
        public string Alias { get; set; }
        public string Module { get; private set; }

        public Guid ParentId { get; set; }
        public string SectionItems { get; set; }

        [NotMapped]
        public List<SectionItem> SectionItemList { get; set; }

        public string Content { get; set; }

        // Attributes
        public string Attribute01 { get; set; }
        public string Attribute02 { get; set; }
        public string Attribute03 { get; set; }
        public string Attribute04 { get; set; }
        public string Attribute05 { get; set; }
        public string Attribute06 { get; set; }
        public string Attribute07 { get; set; }
        public string Attribute08 { get; set; }
        public string Attribute09 { get; set; }
        public string Attribute10 { get; set; }
        public string Attribute11 { get; set; }
        public string Attribute12 { get; set; }
        public string Attribute13 { get; set; }
        public string Attribute14 { get; set; }
        public string Attribute15 { get; set; }
        public string Attribute16 { get; set; }
        public string Attribute17 { get; set; }
        public string Attribute18 { get; set; }
        public string Attribute19 { get; set; }
        public string Attribute20 { get; set; }

        public string Snippet
        {
            get
            {
                // strip newline
                string output = this.Content;
                
                if (!String.IsNullOrEmpty(this.Content))
                {
                    output = Regex.Replace(output, @"\t|\n|\r", " ");
                
                    // strip tags
                    output = Markdown.ToHtml(output);
                    output = Regex.Replace(output, @"<[^>]+>|&nbsp;", "").Trim();

                    // strip extra whitespace
                    output = Regex.Replace(output, @"\s{2,}", " ");
                    
                    if (this.Content.Length > 140)
                    {
                        output = output.Truncate(140);
                        output = output + " ...";
                    }
                }

                return output;
            }
        }

        public string HtmlContent
        {
            get
            {
                string output = String.Empty;
                
                if (!String.IsNullOrEmpty(this.Content))
                {
                    output = Markdown.ToHtml(this.Content);

                    //var sanitizer = new HtmlSanitizer();
                    //output = sanitizer.Sanitize(output, "");
                }
                
                return output;
            }
        }
        
        public ContentItem()
        {

        }
        
        public ContentItem(string module)
        {
            this.Module = module;
        }

        public ContentItem Clone()
        {
            ContentItem newItem = new ContentItem(this.Module);
            newItem.Clone(this);
            return newItem;
        }

        public void Clone(ContentItem item)
        {
            this.Module = item.Module;
            this.Tenant = item.Tenant;
            this.Id = item.Id;
            this.ParentId = item.ParentId;
            this.SectionItems = item.SectionItems;
            this.Module = item.Module;

            this.CreatedDate = item.CreatedDate;
            this.LastUpdate = item.LastUpdate;
            this.CreatedBy = item.CreatedBy;
            
            this.Name = item.Name;
            this.Content = item.Content;

            this.Attribute01 = item.Attribute01;
            this.Attribute02 = item.Attribute02;
            this.Attribute03 = item.Attribute03;
            this.Attribute04 = item.Attribute04;
            this.Attribute05 = item.Attribute05;
            this.Attribute06 = item.Attribute06;
            this.Attribute07 = item.Attribute07;
            this.Attribute08 = item.Attribute08;
            this.Attribute09 = item.Attribute09;
            this.Attribute10 = item.Attribute10;
            this.Attribute11 = item.Attribute11;
            this.Attribute12 = item.Attribute12;
            this.Attribute13 = item.Attribute13;
            this.Attribute14 = item.Attribute14;
            this.Attribute15 = item.Attribute15;
            this.Attribute16 = item.Attribute16;
            this.Attribute17 = item.Attribute17;
            this.Attribute18 = item.Attribute18;
            this.Attribute19 = item.Attribute19;
            this.Attribute20 = item.Attribute20;
        }
    }
}

public static class StringExt
{
    public static string Truncate(this string value, int maxLength)
    {
        if (string.IsNullOrEmpty(value)) return value;
        return value.Length <= maxLength ? value : value.Substring(0, maxLength); 
    }
}