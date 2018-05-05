using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq.Expressions;
using System;
using Banico.Core.Entities;

namespace Banico.Core.Repositories
{
    public interface IContentItemRepository
    {
        Task<ContentItem> Get(int id);
        Task<ContentItem> GetByTypeAndAlias(string type, string alias);
        Task<List<ContentItem>> GetAllByParentId(string id);
        Task<List<ContentItem>> GetAllByCreatedBy(string type, string createdBy);
        Task<List<ContentItem>> GetAllByTypeAndSections(string type, string[] sections);
        Task<List<ContentItem>> GetAllWithTextSearch(string type, string titleSearch,
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
            );
        Task<ContentItem> Add(ContentItem item);
        Task<int> Update(ContentItem item);
        Task<int> Delete(int id);
    }
}