using System;
using System.ComponentModel.DataAnnotations;

namespace Banico.Core.Entities
{
    public class Item
    {
        [Key]
        public int Id { get; set; }

        public string CreatedBy { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
        public DateTimeOffset LastUpdate { get; set;}

        public string Tenant { get; set; }
        public string Name { get; set; }
   }
}