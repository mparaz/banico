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
            out string[] paths, 
            out string[] aliases);
        Task<List<SectionItem>> Get(
            int id,
            string section,
            string path,
            string alias,
            string name,
            int parentId,
            bool isRoot);
        Task<SectionItem> Add(SectionItem section);
        Task<int> Update(SectionItem section);
        Task<int> Delete(int id);
    }
}