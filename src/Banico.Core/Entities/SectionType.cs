using System;
using System.ComponentModel.DataAnnotations;

namespace Banico.Core.Entities
{
    public class SectionType : Item
    {
        public string Modules { get; set; }
    }
}