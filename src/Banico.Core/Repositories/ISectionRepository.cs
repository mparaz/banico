using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq.Expressions;
using System;
using Banico.Core.Entities;

namespace Banico.Core.Repositories
{
    public interface ISectionRepository
    {
        void ParsePath(string inputPath, out string[] types, out string[] paths, out string[] aliases);
        Task<Section> Get(int id);
        Task<Section> GetByTypePathAndAlias(string type, string path, string alias);
        Task<List<Section>> GetAllByTypeAndPath(string type, string path);
        Task<Section> GetByNameAndParentId(string name, string id);
        Task<List<Section>> GetRootByType(string sectionType);
        Task<List<Section>> GetByParentId(string id);
        Task<List<Section>> GetByType(string sectionType);
        Task<Section> Add(Section section);
        Task<int> Update(Section section);
        Task<int> Delete(int id);
    }
}