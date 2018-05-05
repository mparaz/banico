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
    public class SectionTypeRepository : ISectionTypeRepository
    {
        public AppDbContext DbContext { get; set; }

        public SectionTypeRepository(AppDbContext dbContext)
        {
            this.DbContext = dbContext;
        }

        public async Task<List<SectionType>> GetAll(string module)
        {
            var st = from sectionType in this.DbContext.SectionTypes
                where (sectionType.Modules.Contains(module) || 
                    string.IsNullOrEmpty(sectionType.Modules) ||
                    string.IsNullOrEmpty(module))
                select sectionType;
 
            return await st.ToListAsync<SectionType>();
        }

        public async Task<SectionType> GetByName(string name)
        {
            var st = from sectionType in this.DbContext.SectionTypes
                where sectionType.Name == name
                select sectionType;
 
            return await st.FirstOrDefaultAsync();
        }

        public async Task<SectionType> Add(SectionType sectionType)
        {
            sectionType.CreatedDate = DateTimeOffset.Now;
            this.DbContext.SectionTypes.Add(sectionType);
            var result = await this.DbContext.SaveChangesAsync();

            if (result > 0)
            {
                return sectionType;
            }

            return new SectionType();
        }

        public async Task<int> Delete(string name)
        {
            var st = await this.GetByName(name);
            this.DbContext.Remove(st);
            return await this.DbContext.SaveChangesAsync();
        }
    }
}