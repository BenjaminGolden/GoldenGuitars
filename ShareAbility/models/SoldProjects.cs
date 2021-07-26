using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenGuitars.models
{
    public class SoldProjects
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public string ClientName { get; set; }
        public string ClientEmail { get; set; }
    }
}
