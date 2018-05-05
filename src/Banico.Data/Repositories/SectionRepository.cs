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

        private const char PATH_DELIM = '_';
        private const char TYPE_DELIM = '~';
        private const char SECTION_DELIM = '*';

        public SectionRepository(AppDbContext dbContext)
        {
            this.DbContext = dbContext;
        }

        public void ParsePath(string inputPath, out string[] types, out string[] paths, out string[] aliases)
        {
            List<string> typeList = new List<string>();
            List<string> pathList = new List<string>();
            List<string> aliasList = new List<string>();

            if (!string.IsNullOrEmpty(inputPath))
            {
                string[] sectionItems = inputPath.Split(SECTION_DELIM);

                foreach (string sectionItem in sectionItems)
                {
                    string[] typePathItems = sectionItem.Split(TYPE_DELIM);

                    typeList.Add(typePathItems[0]);

                    string[] pathItems = typePathItems[1].Split(PATH_DELIM);

                    aliasList.Add(pathItems[pathItems.Length - 1]);

                    string currentPath = string.Empty;
                    for (int i = 0; i < pathItems.Length - 1; i++)
                    {
                        if (!string.IsNullOrEmpty(currentPath))
                        {
                            currentPath = currentPath + PATH_DELIM;
                        }
                        currentPath = currentPath + pathItems[i];
                    }
                    pathList.Add(currentPath);
                }
            }

            types = typeList.ToArray();
            paths = pathList.ToArray();
            aliases = aliasList.ToArray();
        }

        public async Task<Section> Get(int id)
        {
            var sections = from s in this.DbContext.Sections
                where s.Id == id
                select s;

            return await sections.FirstOrDefaultAsync();
        }

        public async Task<Section> GetByTypePathAndAlias(string type, string path, string alias) 
        {
            var sections = from s in this.DbContext.Sections
                where (s.Type == type) && (s.Path == path) && (s.Alias == alias)
                select s;

            return await sections.FirstOrDefaultAsync();
        }

        public async Task<List<Section>> GetAllByTypeAndPath(string type, string path) 
        {
            var sections = from s in this.DbContext.Sections
                where (s.Type == type) && (s.Path == path)
                select s;

            return await sections.ToListAsync();
        }

        public async Task<Section> GetByNameAndParentId(string name, string id)
        {
            int idInt = 0;
            int.TryParse(id, out idInt);

            var sections = from s in this.DbContext.Sections
                where s.Name == name && s.ParentId == idInt
                select s;     

            return await sections.FirstOrDefaultAsync();       
        }

        public async Task<List<Section>> GetRootByType(string sectionType)
        {
            var sections = from s in this.DbContext.Sections
                where (s.Type == sectionType) && (s.ParentId == 0) 
                select s;

            return await sections.ToListAsync();
        }

        public async Task<List<Section>> GetByParentId(string id)
        {
            int idInt = 0;
            int.TryParse(id, out idInt);

            var sections = from s in this.DbContext.Sections
                where s.ParentId == idInt
                select s;     

            return await sections.ToListAsync();       
        }

        public async Task<List<Section>> GetByType(string sectionType)
        {
            var sections = from section in this.DbContext.Sections
                where section.Type == sectionType
                select section;

            return await sections.ToListAsync<Section>();
        }

        public async Task<Section> Add(Section section)
        {
            section.CreatedDate = DateTimeOffset.Now;
            this.DbContext.Sections.Add(section);
            var result = await this.DbContext.SaveChangesAsync();

            if (result > 0)
            {
                return section;
            }

            return new Section();
        }

        // Update(item, i => i.Title)
        // Returns no. of objects saved
        public async Task<int> Update(Section section)
        {
            var storedSection = await this.Get(section.Id);

            storedSection.LastUpdate = DateTimeOffset.Now;

            storedSection.Name = section.Name;
            storedSection.Alias = section.Alias;
            storedSection.Description = section.Description;
            
            return await this.DbContext.SaveChangesAsync();
        }

        public async Task<int> Delete(int id)
        {
            var section = await this.Get(id);
            this.DbContext.Remove(section);
            return await this.DbContext.SaveChangesAsync();
        }
    }
}