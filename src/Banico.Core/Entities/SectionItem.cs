using System;
using System.ComponentModel.DataAnnotations;

namespace Banico.Core.Entities
{
    public class SectionItem : HierarchicalItem
    {
        public string Section { get; set; }
        public string PathUrl { get; set; }
        public string PathName { get; set; }

        public string Alias { get; set; }
        public string Description { get; set; }
    }
}