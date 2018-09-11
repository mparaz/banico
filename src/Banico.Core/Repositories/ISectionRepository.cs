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
        Task<List<Section>> Get(
            string id,
            string module,
            string name);
        Task<Section> Add(Section section);
        Task<Section> Delete(string name);
    }
}