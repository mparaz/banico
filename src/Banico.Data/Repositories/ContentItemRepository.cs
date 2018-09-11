using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq.Expressions;
using System;
using Banico.Core.Entities;
using Banico.Core.Repositories;

namespace Banico.Data.Repositories
{
    public class ContentItemRepository : IContentItemRepository
    {
        private const char PATH_DELIM = '_';
        private const char TYPE_DELIM = '~';
        private const char SECTION_DELIM = '*';

        public AppDbContext DbContext { get; set; }

        public ContentItemRepository(AppDbContext dbContext)
        {
            this.DbContext = dbContext;
        }

        public async Task<List<ContentItem>> Get(
            Guid? id,
            string name,
            string alias,
            string module,
            Guid? parentId,
            string createdBy,
            string sectionItems,
            string content,
            string attribute01,
            string attribute02,
            string attribute03,
            string attribute04,
            string attribute05,
            string attribute06,
            string attribute07,
            string attribute08,
            string attribute09,
            string attribute10,
            string attribute11,
            string attribute12,
            string attribute13,
            string attribute14,
            string attribute15,
            string attribute16,
            string attribute17,
            string attribute18,
            string attribute19,
            string attribute20
        ) {
            var contentItems = from c in this.DbContext.ContentItems
                where 
                    (c.Id == id || id == null) &&
                    (c.Module == module || string.IsNullOrEmpty(module)) && 
                    (c.Alias == alias || string.IsNullOrEmpty(alias)) && 
                    (c.ParentId == parentId || parentId == null) &&
                    (c.Name == name || string.IsNullOrEmpty(name)) && 
                    (c.CreatedBy == createdBy || string.IsNullOrEmpty(createdBy))
                select c;

            var sectionItemsArray = sectionItems.Split(SECTION_DELIM);
            for (int i = 0; i < sectionItemsArray.Length; i++)
            {
                if (!string.IsNullOrEmpty(sectionItemsArray[i]))
                {
                    var sectionItem = sectionItemsArray[i];
                    contentItems = contentItems.Where(item => item.SectionItems.Contains(sectionItem));
                }
            }

            if (!string.IsNullOrEmpty(name))
            {
                contentItems = contentItems.Where(item => item.Name.Contains(name));
            }

            if (!string.IsNullOrEmpty(content))
            {
                contentItems = contentItems.Where(item => item.Content.Contains(content));
            }

            if (!string.IsNullOrEmpty(attribute01))
            {
                contentItems = contentItems.Where(item => item.Attribute01.Contains(attribute01));
            }

            if (!string.IsNullOrEmpty(attribute02))
            {
                contentItems = contentItems.Where(item => item.Attribute02.Contains(attribute02));
            }

            if (!string.IsNullOrEmpty(attribute03))
            {
                contentItems = contentItems.Where(item => item.Attribute03.Contains(attribute03));
            }

            if (!string.IsNullOrEmpty(attribute04))
            {
                contentItems = contentItems.Where(item => item.Attribute04.Contains(attribute04));
            }

            if (!string.IsNullOrEmpty(attribute05))
            {
                contentItems = contentItems.Where(item => item.Attribute05.Contains(attribute05));
            }

            if (!string.IsNullOrEmpty(attribute06))
            {
                contentItems = contentItems.Where(item => item.Attribute06.Contains(attribute06));
            }

            if (!string.IsNullOrEmpty(attribute07))
            {
                contentItems = contentItems.Where(item => item.Attribute07.Contains(attribute07));
            }

            if (!string.IsNullOrEmpty(attribute08))
            {
                contentItems = contentItems.Where(item => item.Attribute08.Contains(attribute08));
            }

            if (!string.IsNullOrEmpty(attribute09))
            {
                contentItems = contentItems.Where(item => item.Attribute09.Contains(attribute09));
            }

            if (!string.IsNullOrEmpty(attribute10))
            {
                contentItems = contentItems.Where(item => item.Attribute10.Contains(attribute10));
            }

            if (!string.IsNullOrEmpty(attribute11))
            {
                contentItems = contentItems.Where(item => item.Attribute11.Contains(attribute11));
            }

            if (!string.IsNullOrEmpty(attribute12))
            {
                contentItems = contentItems.Where(item => item.Attribute12.Contains(attribute12));
            }

            if (!string.IsNullOrEmpty(attribute13))
            {
                contentItems = contentItems.Where(item => item.Attribute13.Contains(attribute13));
            }

            if (!string.IsNullOrEmpty(attribute14))
            {
                contentItems = contentItems.Where(item => item.Attribute14.Contains(attribute14));
            }

            if (!string.IsNullOrEmpty(attribute15))
            {
                contentItems = contentItems.Where(item => item.Attribute15.Contains(attribute15));
            }

            if (!string.IsNullOrEmpty(attribute16))
            {
                contentItems = contentItems.Where(item => item.Attribute16.Contains(attribute16));
            }

            if (!string.IsNullOrEmpty(attribute17))
            {
                contentItems = contentItems.Where(item => item.Attribute17.Contains(attribute17));
            }

            if (!string.IsNullOrEmpty(attribute18))
            {
                contentItems = contentItems.Where(item => item.Attribute18.Contains(attribute18));
            }

            if (!string.IsNullOrEmpty(attribute19))
            {
                contentItems = contentItems.Where(item => item.Attribute19.Contains(attribute19));
            }

            if (!string.IsNullOrEmpty(attribute20))
            {
                contentItems = contentItems.Where(item => item.Attribute20.Contains(attribute20));
            }

            return await contentItems.ToListAsync();
        }

        // Returns no. of objects saved, ie., 1
        public async Task<ContentItem> Add(ContentItem item)
        {
            item.Id = Guid.NewGuid();
            item.CreatedDate = DateTimeOffset.Now;
            item.LastUpdate = DateTimeOffset.Now;
            this.DbContext.ContentItems.Add(item);
            var result = await this.DbContext.SaveChangesAsync();

            if (result > 0)
            {
                return item;
            }

            return new ContentItem();
        }

        public async Task<ContentItem> Update(ContentItem item)
        {
            var updateItem = (await this.Get(item.Id, "", "", "", null, "", "", "", "", "", "",
            "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""))
                .FirstOrDefault();
            updateItem.LastUpdate = DateTimeOffset.Now;
            updateItem.Name = item.Name;
            updateItem.Content = item.Content;
            updateItem.Alias = item.Alias;
            updateItem.SectionItems = item.SectionItems;
            updateItem.Attribute01 = item.Attribute01;
            updateItem.Attribute02 = item.Attribute02;
            updateItem.Attribute03 = item.Attribute03;
            updateItem.Attribute04 = item.Attribute04;
            updateItem.Attribute05 = item.Attribute05;
            updateItem.Attribute06 = item.Attribute06;
            updateItem.Attribute07 = item.Attribute07;
            updateItem.Attribute08 = item.Attribute08;
            updateItem.Attribute09 = item.Attribute09;
            updateItem.Attribute10 = item.Attribute10;
            updateItem.Attribute11 = item.Attribute11;
            updateItem.Attribute12 = item.Attribute12;
            updateItem.Attribute13 = item.Attribute13;
            updateItem.Attribute14 = item.Attribute14;
            updateItem.Attribute15 = item.Attribute15;
            updateItem.Attribute16 = item.Attribute16;
            updateItem.Attribute17 = item.Attribute17;
            updateItem.Attribute18 = item.Attribute18;
            updateItem.Attribute19 = item.Attribute19;
            updateItem.Attribute20 = item.Attribute20;
            updateItem.LastUpdate = DateTimeOffset.Now;
            var result = await this.DbContext.SaveChangesAsync();

            if (result > 0)
            {
                return item;
            }

            return new ContentItem();
        }

        public async Task<ContentItem> Delete(Guid id)
        {
            var item = (await this.Get(id, "", "", "", null, "", "", "", "", "", "",
            "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""))
                .FirstOrDefault();
            this.DbContext.Remove(item);
            var result = await this.DbContext.SaveChangesAsync();

            if (result > 0)
            {
                return item;
            }

            return new ContentItem();
        }
    }
}