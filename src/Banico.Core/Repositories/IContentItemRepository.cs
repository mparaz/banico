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
        Task<List<ContentItem>> Get(
            string id,
            string name,
            string alias,
            string module,
            string parentId,
            string createdBy,
            string sectionItems,
            string content,
            string attribute01,
            string attribute02,
            string attribute03,
            string attribute04,
            string attribute05,
            string attribute06,
            string attribute07,
            string attribute08,
            string attribute09,
            string attribute10,
            string attribute11,
            string attribute12,
            string attribute13,
            string attribute14,
            string attribute15,
            string attribute16,
            string attribute17,
            string attribute18,
            string attribute19,
            string attribute20
        );
        Task<ContentItem> Add(ContentItem item);
        Task<ContentItem> Update(ContentItem item);
        Task<ContentItem> Delete(string id);
    }
}