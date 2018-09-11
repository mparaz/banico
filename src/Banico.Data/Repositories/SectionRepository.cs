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
    public class SectionRepository : ISectionRepository
    {
        public AppDbContext DbContext { get; set; }

        public SectionRepository(AppDbContext dbContext)
        {
            this.DbContext = dbContext;
        }

        public async Task<List<Section>> Get(
            string id,
            string module,
            string name)
        {
            var sections = from section in this.DbContext.Sections
                where 
                    (section.Id == Guid.Parse(id) || 
                        id == string.Empty) &&
                    (section.Modules.Contains(module) || 
                        string.IsNullOrEmpty(section.Modules) ||
                        string.IsNullOrEmpty(module)) &&
                    (section.Name == name ||
                        string.IsNullOrEmpty(name))
                select section;
 
            return await sections.ToListAsync<Section>();
        }

        public async Task<Section> Add(Section section)
        {
            section.Id = Guid.NewGuid();
            section.CreatedDate = DateTimeOffset.Now;
            this.DbContext.Sections.Add(section);
            var result = await this.DbContext.SaveChangesAsync();

            if (result > 0)
            {
                return section;
            }

            return new Section();
        }

        public async Task<Section> Delete(string name)
        {
            var section = (await this.Get(string.Empty, string.Empty, name))
                .FirstOrDefault();
            this.DbContext.Remove(section);
            var result = await this.DbContext.SaveChangesAsync();

            if (result > 0)
            {
                return section;
            }

            return new Section();
        }
    }
}