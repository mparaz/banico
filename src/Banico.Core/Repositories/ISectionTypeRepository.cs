using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq.Expressions;
using System;
using Banico.Core.Entities;

namespace Banico.Core.Repositories
{
    public interface ISectionTypeRepository
    {
        Task<List<SectionType>> GetAll(string module);
        Task<SectionType> GetByName(string name);
        Task<SectionType> Add(SectionType sectionType);
        Task<int> Delete(string name);
    }
}