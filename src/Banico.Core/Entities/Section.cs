using System;
using System.ComponentModel.DataAnnotations;

namespace Banico.Core.Entities
{
    public class Section : Item
    {
        public string Modules { get; set; }
    }
}