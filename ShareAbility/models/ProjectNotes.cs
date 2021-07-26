using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenGuitars.models
{
    public class ProjectNotes
    { 
        public int id { get; set; }
        public string content { get; set; }
        public int projectId { get; set; }
        public int userProfileId { get; set; }

    }
}
