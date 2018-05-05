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
        public AppDbContext DbContext { get; set; }

        public ContentItemRepository(AppDbContext dbContext)
        {
            this.DbContext = dbContext;
        }

        public async Task<ContentItem> Get(int id)
        {
            var items = from i in this.DbContext.ContentItems
                where i.Id == id
                select i;

            var item = await items.FirstAsync();

            return item;
        }

        public async Task<ContentItem> GetByTypeAndAlias(string type, string alias)
        {
            var items = from i in this.DbContext.ContentItems
                where (i.Type == type && i.Alias == alias)
                select i;

            var item = await items.FirstAsync();

            return item;
        }

        public async Task<List<ContentItem>> GetAllByParentId(string id)
        {
            int idInt = 0;
            int.TryParse(id, out idInt);

            var items = from i in this.DbContext.ContentItems
                where i.ParentId == idInt
                select i;     

            return await items.ToListAsync();       
        }

        public async Task<List<ContentItem>> GetAllByCreatedBy(string type, string createdBy)
        {
            var items = from i in this.DbContext.ContentItems
                where i.CreatedBy == createdBy
                select i;

            if (!string.IsNullOrEmpty(type))
            {
                items = items.Where(item => item.Type == type);
            }

            return await items.ToListAsync();       
        }

        public async Task<List<ContentItem>> GetAllByTypeAndSections(string type, string[] sections)
        {
            var items = from item in this.DbContext.ContentItems
                select item;
            
            if (!string.IsNullOrEmpty(type))
            {
                items = items.Where(item => item.Type == type);
            }

            for (int i = 0; i < sections.Length; i++)
            {
                if (!string.IsNullOrEmpty(sections[i]))
                {
                    var section = sections[i];
                    items = items.Where(item => item.Sections.Contains(section));
                }
            }

            return await items.ToListAsync();
        }

        public async Task<List<ContentItem>> GetAllWithTextSearch(string type, string nameSearch,
            string contentSearch,
            string attribute01Search,
            string attribute02Search,
            string attribute03Search,
            string attribute04Search,
            string attribute05Search,
            string attribute06Search,
            string attribute07Search,
            string attribute08Search,
            string attribute09Search,
            string attribute10Search,
            string attribute11Search,
            string attribute12Search,
            string attribute13Search,
            string attribute14Search,
            string attribute15Search,
            string attribute16Search,
            string attribute17Search,
            string attribute18Search,
            string attribute19Search,
            string attribute20Search
            )
        {
            var items = from item in this.DbContext.ContentItems
                select item;
            
            if (!string.IsNullOrEmpty(nameSearch))
            {
                items = items.Where(item => item.Name.Contains(nameSearch));
            }

            if (!string.IsNullOrEmpty(contentSearch))
            {
                items = items.Where(item => item.Content.Contains(contentSearch));
            }

            if (!string.IsNullOrEmpty(attribute01Search))
            {
                items = items.Where(item => item.Attribute01.Contains(attribute01Search));
            }

            if (!string.IsNullOrEmpty(attribute02Search))
            {
                items = items.Where(item => item.Attribute02.Contains(attribute02Search));
            }

            if (!string.IsNullOrEmpty(attribute03Search))
            {
                items = items.Where(item => item.Attribute03.Contains(attribute03Search));
            }

            if (!string.IsNullOrEmpty(attribute04Search))
            {
                items = items.Where(item => item.Attribute04.Contains(attribute04Search));
            }

            if (!string.IsNullOrEmpty(attribute05Search))
            {
                items = items.Where(item => item.Attribute05.Contains(attribute05Search));
            }

            if (!string.IsNullOrEmpty(attribute06Search))
            {
                items = items.Where(item => item.Attribute06.Contains(attribute06Search));
            }

            if (!string.IsNullOrEmpty(attribute07Search))
            {
                items = items.Where(item => item.Attribute07.Contains(attribute07Search));
            }

            if (!string.IsNullOrEmpty(attribute08Search))
            {
                items = items.Where(item => item.Attribute08.Contains(attribute08Search));
            }

            if (!string.IsNullOrEmpty(attribute09Search))
            {
                items = items.Where(item => item.Attribute09.Contains(attribute09Search));
            }

            if (!string.IsNullOrEmpty(attribute10Search))
            {
                items = items.Where(item => item.Attribute10.Contains(attribute10Search));
            }

            if (!string.IsNullOrEmpty(attribute11Search))
            {
                items = items.Where(item => item.Attribute11.Contains(attribute11Search));
            }

            if (!string.IsNullOrEmpty(attribute12Search))
            {
                items = items.Where(item => item.Attribute12.Contains(attribute12Search));
            }

            if (!string.IsNullOrEmpty(attribute13Search))
            {
                items = items.Where(item => item.Attribute13.Contains(attribute13Search));
            }

            if (!string.IsNullOrEmpty(attribute14Search))
            {
                items = items.Where(item => item.Attribute14.Contains(attribute14Search));
            }

            if (!string.IsNullOrEmpty(attribute15Search))
            {
                items = items.Where(item => item.Attribute15.Contains(attribute15Search));
            }

            if (!string.IsNullOrEmpty(attribute16Search))
            {
                items = items.Where(item => item.Attribute16.Contains(attribute16Search));
            }

            if (!string.IsNullOrEmpty(attribute17Search))
            {
                items = items.Where(item => item.Attribute17.Contains(attribute17Search));
            }

            if (!string.IsNullOrEmpty(attribute18Search))
            {
                items = items.Where(item => item.Attribute18.Contains(attribute18Search));
            }

            if (!string.IsNullOrEmpty(attribute19Search))
            {
                items = items.Where(item => item.Attribute19.Contains(attribute19Search));
            }

            if (!string.IsNullOrEmpty(attribute20Search))
            {
                items = items.Where(item => item.Attribute20.Contains(attribute20Search));
            }

            return await items.ToListAsync();
        }

        // Returns no. of objects saved, ie., 1
        public async Task<ContentItem> Add(ContentItem item)
        {
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

        public async Task<int> Update(ContentItem item)
        {
            var updateItem = await this.Get(item.Id);
            updateItem.Name = item.Name;
            updateItem.Content = item.Content;
            updateItem.Sections = item.Sections;
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
            
            return await this.DbContext.SaveChangesAsync();
        }

        public async Task<int> Delete(int id)
        {
            var item = await this.Get(id);
            this.DbContext.Remove(item);
            return await this.DbContext.SaveChangesAsync();
        }
    }
}