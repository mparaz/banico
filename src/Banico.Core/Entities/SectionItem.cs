using System;
using System.ComponentModel.DataAnnotations;

namespace Banico.Core.Entities
{
    public class SectionItem : Item
    {
        public int ParentId { get; set; }

        public string Section { get; set; }
        public string Path { get; set; }
        public string Breadcrumb { get; set; }

        public string Alias { get; set; }
        public string Description { get; set; }
    }
}