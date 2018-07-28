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
        void ParsePath(string inputPath, out string[] types, out string[] paths, out string[] aliases);
        Task<SectionItem> Get(int id);
        Task<SectionItem> GetByTypePathAndAlias(string type, string path, string alias);
        Task<List<SectionItem>> GetAllByTypeAndPath(string type, string path);
        Task<SectionItem> GetByNameAndParentId(string name, string id);
        Task<List<SectionItem>> GetRootByType(string section);
        Task<List<SectionItem>> GetByParentId(string id);
        Task<List<SectionItem>> GetByType(string section);
        Task<SectionItem> Add(SectionItem section);
        Task<int> Update(SectionItem section);
        Task<int> Delete(int id);
    }
}