using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Banico.Services
{
    public class UpdateResponse
    {
        public int Value { get; set; }

        public UpdateResponse(int value)
        {
            this.Value = value;
        }
    }
}
