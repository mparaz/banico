using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq.Expressions;
using System;
using Banico.Core.Entities;

namespace Banico.Core.Repositories
{
    public interface ISectionItemRepository
    {
        void ParsePath(
            string inputPath, 
            out string[] sections, 
            out string[] pathUrls, 
            out string[] aliases);
        Task<List<SectionItem>> Get(
            Guid? id,
            string section,
            string pathUrl,
            string alias,
            string name,
            Guid? parentId,
            bool isRoot);
        Task<SectionItem> Add(SectionItem section);
        Task<SectionItem> Update(SectionItem section);
        Task<SectionItem> Delete(Guid id);
    }
}