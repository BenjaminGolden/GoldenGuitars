using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenGuitars.models
{
    public class SoldProjects
    {
        public int id { get; set; }
        public int projectId { get; set; }
        public string clientName { get; set; }
        public string clientEmail { get; set; }
    }
}
